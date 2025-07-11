import React, { useState } from 'react';
import { Upload, Download, FileSpreadsheet, AlertCircle, CheckCircle, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../lib/api';

interface ExcelImporterProps {
  onImportComplete: () => void;
  onClose: () => void;
}

interface ProductRow {
  name: string;
  size: string;
  collection?: string;
  surface?: string;
  ex_factory_price: number;
  mrp_per_sqft: number;
  mrp_per_box: number;
  gst_percentage: number;
  insurance_percentage: number;
  actual_sqft_per_box: number;
  billed_sqft_per_box: number;
  weight: number;
  freight: number;
}

const REQUIRED_FIELDS = ['name', 'size', 'ex_factory_price', 'mrp_per_sqft', 'mrp_per_box', 'gst_percentage', 'insurance_percentage', 'actual_sqft_per_box', 'weight', 'freight'];

const ExcelImporter: React.FC<ExcelImporterProps> = ({ onImportComplete, onClose }) => {
  const { user, session } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [previewRows, setPreviewRows] = useState<ProductRow[]>([]);
  const [validationErrors, setValidationErrors] = useState<string[][]>([]);
  const [importing, setImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importResult, setImportResult] = useState<{ success: number; failed: number; errors: string[] }>({ success: 0, failed: 0, errors: [] });
  const [step, setStep] = useState<'upload' | 'preview' | 'import' | 'done'>('upload');

  // Downloadable CSV template
  const downloadTemplate = () => {
    const csvContent = `design_name,size,collection,surface,ex_factory_price,mrp_per_sqft,mrp_per_box,gst_percentage,insurance_percentage,actual_sqft_per_box,billed_sqft_per_box,weight,freight\nSPACERA LUMINERA,600X1200,SPACERA,Glossy,45,65,120,18,1,15.5,15.5,32,2`;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'products_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Parse CSV text to ProductRow[]
  const parseCSV = (text: string): ProductRow[] => {
    const lines = text.split('\n').filter(line => line.trim());
    if (lines.length === 0) return [];
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    console.log('CSV Headers:', headers);
    console.log('Expected headers:', ['name', 'size', 'collection', 'surface', 'ex_factory_price', 'mrp_per_sqft', 'mrp_per_box', 'gst_percentage', 'insurance_percentage', 'actual_sqft_per_box', 'billed_sqft_per_box', 'weight', 'freight']);
    
    const rows = lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.trim());
      const row: any = {};
      headers.forEach((header, i) => {
        const value = values[i] || '';
        // Map design_name to name
        const mappedHeader = header === 'design_name' ? 'name' : header;
        
        if ([
          'ex_factory_price', 'mrp_per_sqft', 'mrp_per_box', 'gst_percentage',
          'insurance_percentage', 'actual_sqft_per_box', 'billed_sqft_per_box', 'weight', 'freight'
        ].includes(mappedHeader)) {
          const numValue = parseFloat(value.replace(/[^\d.-]/g, ''));
          row[mappedHeader] = isNaN(numValue) ? 0 : numValue;
        } else {
          row[mappedHeader] = value;
        }
      });
      return row;
    }).filter(row => row.name && row.size);
    
    console.log('Parsed rows:', rows.length);
    console.log('First few rows:', rows.slice(0, 3));
    return rows;
  };

  // Validate each row and return array of error arrays
  const validateRows = (rows: ProductRow[]): string[][] => {
    return rows.map((row, idx) => {
      const errors: string[] = [];
      REQUIRED_FIELDS.forEach(field => {
        if (row[field as keyof ProductRow] === undefined || row[field as keyof ProductRow] === '' || row[field as keyof ProductRow] === null) {
          errors.push(`${field} is required`);
        }
      });
      if (row.ex_factory_price < 0) errors.push('ex_factory_price must be >= 0');
      if (row.mrp_per_sqft < 0) errors.push('mrp_per_sqft must be >= 0');
      if (row.mrp_per_box < 0) errors.push('mrp_per_box must be >= 0');
      if (row.gst_percentage < 0) errors.push('gst_percentage must be >= 0');
      if (row.insurance_percentage < 0) errors.push('insurance_percentage must be >= 0');
      if (row.actual_sqft_per_box <= 0) errors.push('actual_sqft_per_box must be > 0');
      // billed_sqft_per_box is optional - only validate if provided and not empty
      if (row.billed_sqft_per_box !== undefined && row.billed_sqft_per_box !== null && row.billed_sqft_per_box !== '' && row.billed_sqft_per_box <= 0) {
        errors.push('billed_sqft_per_box must be > 0');
      }
      if (row.weight < 0) errors.push('weight must be >= 0');
      if (row.freight < 0) errors.push('freight must be >= 0');
      return errors;
    });
  };

  // Handle file upload and preview
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    const text = await selectedFile.text();
    const rows = parseCSV(text);
    setPreviewRows(rows);
    setValidationErrors(validateRows(rows));
    setStep('preview');
  };

  // Import valid rows in batches
  const handleImport = async () => {
    if (!user || !session?.access_token) return;
    setImporting(true);
    setImportProgress(0);
    setImportResult({ success: 0, failed: 0, errors: [] });
    const validRows = previewRows.filter((_, idx) => validationErrors[idx].length === 0)
      .filter(row => row.name && row.name.trim() !== '');
    const batchSize = 50;
    let success = 0;
    let failed = 0;
    let errors: string[] = [];
    for (let i = 0; i < validRows.length; i += batchSize) {
      const batch = validRows.slice(i, i + batchSize).map(row => {
        const { name, ...rest } = row;
        return {
          ...rest,
          name: name,
          billed_sqft_per_box: row.billed_sqft_per_box !== undefined ? row.billed_sqft_per_box : row.actual_sqft_per_box,
          user_id: user.id,
          created_by: user.id,
        };
      });
      console.log('Batch to import:', batch);
      const response = await api.saveProduct(batch, undefined, session.access_token);
      if (response.success) {
        success += batch.length;
      } else {
        failed += batch.length;
        errors.push(response.error || 'Unknown error');
      }
      setImportProgress(Math.round(((i + batch.length) / validRows.length) * 100));
    }
    setImportResult({ success, failed, errors });
    setImporting(false);
    setStep('done');
    onImportComplete();
  };

  // UI rendering
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
        <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700" onClick={onClose}><X /></button>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><FileSpreadsheet /> Import Products from CSV</h2>
        {step === 'upload' && (
          <>
            <div className="mb-4">
              <button onClick={downloadTemplate} className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"><Download /> Download CSV Template</button>
            </div>
            <input type="file" accept=".csv,.txt" onChange={handleFileUpload} className="mb-4" />
            <p className="text-gray-500 text-sm">Upload a CSV file matching the template format.</p>
          </>
        )}
        {step === 'preview' && (
          <>
            <div className="mb-4 flex items-center gap-2">
              <CheckCircle className="text-green-600" />
              <span className="font-semibold">Preview & Validate</span>
            </div>
            <div className="overflow-x-auto max-h-64 border rounded mb-4">
              <table className="min-w-full text-xs">
                <thead>
                  <tr>
                    {Object.keys(previewRows[0] || {}).map((header) => (
                      <th key={header} className="px-2 py-1 bg-gray-100 border-b">{header}</th>
                    ))}
                    <th className="px-2 py-1 bg-gray-100 border-b">Errors</th>
                  </tr>
                </thead>
                <tbody>
                  {previewRows.map((row, idx) => (
                    <tr key={idx} className={validationErrors[idx].length ? 'bg-red-50' : ''}>
                      {Object.values(row).map((val, i) => (
                        <td key={i} className="px-2 py-1 border-b">{val}</td>
                      ))}
                      <td className="px-2 py-1 border-b text-red-600">
                        {validationErrors[idx].length > 0 && (
                          <span className="text-xs">
                            {validationErrors[idx].length} error{validationErrors[idx].length > 1 ? 's' : ''}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Error Summary */}
            {validationErrors.some(e => e.length > 0) && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded">
                <h4 className="font-medium text-red-800 mb-2">Validation Errors Summary</h4>
                <div className="text-xs text-red-700 space-y-1 max-h-32 overflow-y-auto">
                  {(() => {
                    const errorCounts: Record<string, number> = {};
                    validationErrors.forEach(errors => {
                      errors.forEach(error => {
                        errorCounts[error] = (errorCounts[error] || 0) + 1;
                      });
                    });
                    return Object.entries(errorCounts).map(([error, count]) => (
                      <div key={error} className="flex justify-between">
                        <span>{error}</span>
                        <span className="font-medium">{count} row{count > 1 ? 's' : ''}</span>
                      </div>
                    ));
                  })()}
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <button onClick={() => setStep('upload')} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Back</button>
              <button 
                onClick={handleImport} 
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" 
                disabled={importing || previewRows.length === 0 || validationErrors.some(e => e.length > 0)}
              >
                {importing ? 'Importing...' : 'Import Products'}
              </button>
            </div>
            {/* Debug information */}
            <div className="mt-4 p-3 bg-gray-100 rounded text-xs">
              <p><strong>Debug Info:</strong></p>
              <p>Importing: {importing.toString()}</p>
              <p>Preview rows: {previewRows.length}</p>
              <p>Rows with errors: {validationErrors.filter(e => e.length > 0).length}</p>
              <p>Button disabled: {(importing || previewRows.length === 0 || validationErrors.some(e => e.length > 0)).toString()}</p>
              {validationErrors.some(e => e.length > 0) && (
                <div className="mt-2">
                  <p><strong>Validation Errors:</strong></p>
                  {validationErrors.map((errors, idx) => (
                    errors.length > 0 && (
                      <p key={idx} className="text-red-600">Row {idx + 1}: {errors.join(', ')}</p>
                    )
                  ))}
                </div>
              )}
            </div>
          </>
        )}
        {step === 'import' && (
          <div className="text-center py-8">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-700">Importing products... {importProgress}%</p>
          </div>
        )}
        {step === 'done' && (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
            <h3 className="text-xl font-bold mb-2">Import Complete</h3>
            <p className="mb-2">Successfully imported: <span className="font-semibold text-green-700">{importResult.success}</span></p>
            {importResult.failed > 0 && <p className="mb-2 text-red-600">Failed: {importResult.failed}</p>}
            {importResult.errors.length > 0 && (
              <div className="text-left text-xs text-red-600 max-h-32 overflow-y-auto border-t mt-2 pt-2">
                {importResult.errors.map((err, i) => <div key={i}>{err}</div>)}
              </div>
            )}
            <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExcelImporter;