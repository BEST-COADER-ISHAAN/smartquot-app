import React, { useState } from 'react';
import { Upload, Download, FileSpreadsheet, AlertCircle, CheckCircle, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';

interface ExcelImporterProps {
  onImportComplete: () => void;
  onClose: () => void;
}

interface ProductRow {
  design_name: string;
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

const ExcelImporter: React.FC<ExcelImporterProps> = ({ onImportComplete, onClose }) => {
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{
    success: number;
    errors: string[];
    imported: ProductRow[];
  } | null>(null);

  const downloadTemplate = () => {
    const csvContent = `design_name,size,collection,surface,ex_factory_price,mrp_per_sqft,mrp_per_box,gst_percentage,insurance_percentage,actual_sqft_per_box,billed_sqft_per_box,weight,freight
SPACERA LUMINERA,600X1200,SPACERA,LUMINERA,285.00,475.00,342.00,18.00,0.50,0.72,0.72,25.50,15.00
ELEGANZA MARBLE,600X1200,ELEGANZA,MARBLE,320.00,520.00,374.40,18.00,0.50,0.72,0.72,26.00,16.50
NATURA WOOD,200X1200,NATURA,WOOD,180.00,350.00,84.00,18.00,0.50,0.24,0.24,8.50,8.00
PREMIUM STONE,800X1600,PREMIUM,STONE,450.00,750.00,960.00,18.00,0.50,1.28,1.28,42.00,25.00`;

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

  const parseCSV = (text: string): ProductRow[] => {
    const lines = text.split('\n').filter(line => line.trim());
    if (lines.length === 0) return [];
    
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    
    return lines.slice(1).map((line, index) => {
      const values = line.split(',').map(v => v.trim());
      const row: any = {};
      
      headers.forEach((header, i) => {
        const value = values[i] || '';
        
        // Convert numeric fields with better error handling
        if (['ex_factory_price', 'mrp_per_sqft', 'mrp_per_box', 'gst_percentage', 'insurance_percentage', 'actual_sqft_per_box', 'billed_sqft_per_box', 'weight', 'freight'].includes(header)) {
          const numValue = parseFloat(value.replace(/[^\d.-]/g, ''));
          row[header] = isNaN(numValue) ? 0 : numValue;
        } else {
          row[header] = value;
        }
      });
      
      return row;
    }).filter(row => row.design_name && row.size); // Filter out empty rows
  };

  const validateRow = (row: ProductRow, index: number): string[] => {
    const errors: string[] = [];
    
    if (!row.design_name || row.design_name.trim() === '') {
      errors.push(`Row ${index + 2}: Design name is required`);
    }
    
    if (!row.size || row.size.trim() === '') {
      errors.push(`Row ${index + 2}: Size is required`);
    }
    
    // Validate numeric ranges to prevent overflow
    if (row.ex_factory_price < 0 || row.ex_factory_price > 999999999.99) {
      errors.push(`Row ${index + 2}: Ex-factory price must be between 0 and 999,999,999.99`);
    }
    
    if (row.mrp_per_sqft < 0 || row.mrp_per_sqft > 999999999.99) {
      errors.push(`Row ${index + 2}: MRP per sqft must be between 0 and 999,999,999.99`);
    }
    
    if (row.mrp_per_box < 0 || row.mrp_per_box > 999999999.99) {
      errors.push(`Row ${index + 2}: MRP per box must be between 0 and 999,999,999.99`);
    }
    
    if (row.gst_percentage < 0 || row.gst_percentage > 999.999) {
      errors.push(`Row ${index + 2}: GST percentage must be between 0 and 999.999`);
    }
    
    if (row.insurance_percentage < 0 || row.insurance_percentage > 999.999) {
      errors.push(`Row ${index + 2}: Insurance percentage must be between 0 and 999.999`);
    }
    
    if (row.actual_sqft_per_box <= 0 || row.actual_sqft_per_box > 999999.9999) {
      errors.push(`Row ${index + 2}: Actual sqft per box must be between 0.0001 and 999,999.9999`);
    }
    
    if (row.billed_sqft_per_box <= 0 || row.billed_sqft_per_box > 999999.9999) {
      errors.push(`Row ${index + 2}: Billed sqft per box must be between 0.0001 and 999,999.9999`);
    }

    if (row.weight < 0 || row.weight > 999999.99) {
      errors.push(`Row ${index + 2}: Weight must be between 0 and 999,999.99 kg`);
    }

    if (row.freight < 0 || row.freight > 999999999.99) {
      errors.push(`Row ${index + 2}: Freight must be between 0 and 999,999,999.99`);
    }
    
    return errors;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    // Check file type
    const fileType = selectedFile.name.split('.').pop()?.toLowerCase();
    if (!['csv', 'txt'].includes(fileType || '')) {
      alert('Please upload a CSV file. You can export your Excel file as CSV.');
      return;
    }

    setFile(selectedFile);
    setResults(null); // Clear previous results
  };

  const processImport = async () => {
    if (!file || !user) return;

    setLoading(true);
    setResults(null);

    try {
      const text = await file.text();
      const rows = parseCSV(text);
      
      if (rows.length === 0) {
        setResults({
          success: 0,
          errors: ['No valid data found in the CSV file. Please check the format and try again.'],
          imported: []
        });
        setLoading(false);
        return;
      }
      
      const errors: string[] = [];
      const validRows: ProductRow[] = [];

      // Validate all rows
      rows.forEach((row, index) => {
        const rowErrors = validateRow(row, index);
        errors.push(...rowErrors);
        
        if (rowErrors.length === 0) {
          validRows.push(row);
        }
      });

      if (errors.length > 0 && validRows.length === 0) {
        setResults({ success: 0, errors, imported: [] });
        setLoading(false);
        return;
      }

      // Get Auth0 user ID
      const auth0UserId = user?.sub || user?.id;
      if (!auth0UserId) {
        setResults({
          success: 0,
          errors: ['User authentication error: Unable to get user ID'],
          imported: []
        });
        setLoading(false);
        return;
      }

      // Set Auth0 user context for RLS policies
      try {
        const { error: contextError } = await supabase.rpc('set_auth0_user_context', { 
          auth0_user_id: auth0UserId 
        });
        
        if (contextError) {
          console.warn('Warning: Could not set Auth0 user context:', contextError);
          // Continue anyway - the trigger should handle this
        }
      } catch (contextError) {
        console.warn('Warning: Could not set Auth0 user context:', contextError);
        // Continue anyway - the trigger should handle this
      }

      // Import valid rows in smaller batches to avoid timeout
      const batchSize = 50;
      let totalImported = 0;
      const importedProducts: ProductRow[] = [];

      for (let i = 0; i < validRows.length; i += batchSize) {
        const batch = validRows.slice(i, i + batchSize);
        const productsToInsert = batch.map(row => ({
          design_name: row.design_name.trim(),
          size: row.size.trim(),
          collection: row.collection?.trim() || null,
          surface: row.surface?.trim() || null,
          ex_factory_price: Number(row.ex_factory_price.toFixed(2)),
          mrp_per_sqft: Number(row.mrp_per_sqft.toFixed(2)),
          mrp_per_box: Number(row.mrp_per_box.toFixed(2)),
          gst_percentage: Number(row.gst_percentage.toFixed(3)),
          insurance_percentage: Number(row.insurance_percentage.toFixed(3)),
          actual_sqft_per_box: Number(row.actual_sqft_per_box.toFixed(4)),
          billed_sqft_per_box: Number(row.billed_sqft_per_box.toFixed(4)),
          weight: Number(row.weight.toFixed(2)),
          freight: Number(row.freight.toFixed(2)),
          is_archived: false,
          created_by: auth0UserId  // Explicitly set created_by
        }));

        const { data, error } = await supabase
          .from('products')
          .insert(productsToInsert)
          .select();

        if (error) {
          console.error('Import error:', error);
          errors.push(`Batch ${Math.floor(i / batchSize) + 1} error: ${error.message}`);
          break;
        } else {
          totalImported += data?.length || 0;
          importedProducts.push(...batch);
        }
      }

      setResults({
        success: totalImported,
        errors,
        imported: importedProducts
      });
      
      if (totalImported > 0) {
        onImportComplete();
      }
    } catch (error) {
      console.error('Import process error:', error);
      setResults({
        success: 0,
        errors: [`File processing error: ${error instanceof Error ? error.message : 'Unknown error'}`],
        imported: []
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 rounded-full p-2">
                <FileSpreadsheet className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Import Products from Excel</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-800 mb-2">📋 Import Instructions</h3>
            <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
              <li>Download the CSV template below to see the required format</li>
              <li>Export your Excel file as CSV format (File → Save As → CSV)</li>
              <li>Ensure your CSV has the exact column headers as shown in the template</li>
              <li>Upload your CSV file and click "Import Products"</li>
            </ol>
          </div>

          {/* Required Fields Info */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-medium text-yellow-800 mb-2">⚠️ Required Fields</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
              <div>
                <p><strong>Required:</strong></p>
                <ul className="list-disc list-inside space-y-1">
                  <li>design_name</li>
                  <li>size</li>
                  <li>actual_sqft_per_box</li>
                  <li>billed_sqft_per_box</li>
                </ul>
              </div>
              <div>
                <p><strong>Optional (will default to 0):</strong></p>
                <ul className="list-disc list-inside space-y-1">
                  <li>collection, surface</li>
                  <li>ex_factory_price, mrp_per_sqft, mrp_per_box</li>
                  <li>gst_percentage, insurance_percentage</li>
                  <li>weight, freight</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Template Download */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-800">📥 Download CSV Template</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Use this template to format your product data correctly (now includes weight and freight)
                </p>
              </div>
              <button
                onClick={downloadTemplate}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                <Download className="w-4 h-4" />
                <span>Download Template</span>
              </button>
            </div>
          </div>

          {/* File Upload */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-800 mb-3">📤 Upload CSV File</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors duration-200">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <div className="space-y-2">
                <p className="text-gray-600">Choose your CSV file to upload</p>
                <p className="text-xs text-gray-500">Supports CSV files up to 10MB</p>
                <input
                  type="file"
                  accept=".csv,.txt"
                  onChange={handleFileUpload}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>
            
            {file && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Selected file:</strong> {file.name} ({(file.size / 1024).toFixed(1)} KB)
                </p>
              </div>
            )}
          </div>

          {/* Import Button */}
          {file && (
            <div className="flex justify-end">
              <button
                onClick={processImport}
                disabled={loading}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Upload className="w-5 h-5" />
                )}
                <span>{loading ? 'Processing...' : 'Import Products'}</span>
              </button>
            </div>
          )}

          {/* Results */}
          {results && (
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-800 mb-3">📊 Import Results</h3>
              
              {results.success > 0 && (
                <div className="flex items-center space-x-2 text-green-700 bg-green-50 p-3 rounded-lg mb-3">
                  <CheckCircle className="w-5 h-5" />
                  <span>✅ Successfully imported {results.success} products</span>
                </div>
              )}

              {results.errors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                  <div className="flex items-center space-x-2 text-red-700 mb-2">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-medium">❌ Errors found:</span>
                  </div>
                  <div className="max-h-32 overflow-y-auto">
                    <ul className="text-sm text-red-600 space-y-1 list-disc list-inside">
                      {results.errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {results.imported.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-700 mb-2">📦 Imported Products Preview:</h4>
                  <div className="max-h-48 overflow-y-auto border border-gray-200 rounded">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 sticky top-0">
                        <tr>
                          <th className="px-3 py-2 text-left">Design Name</th>
                          <th className="px-3 py-2 text-left">Size</th>
                          <th className="px-3 py-2 text-left">Collection</th>
                          <th className="px-3 py-2 text-left">MRP/sqft</th>
                          <th className="px-3 py-2 text-left">Weight</th>
                          <th className="px-3 py-2 text-left">Freight</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {results.imported.slice(0, 10).map((product, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-3 py-2">{product.design_name}</td>
                            <td className="px-3 py-2">{product.size}</td>
                            <td className="px-3 py-2">{product.collection || '-'}</td>
                            <td className="px-3 py-2">₹{product.mrp_per_sqft.toFixed(2)}</td>
                            <td className="px-3 py-2">{product.weight.toFixed(2)} kg</td>
                            <td className="px-3 py-2">₹{product.freight.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {results.imported.length > 10 && (
                      <div className="p-2 text-center text-gray-500 text-xs bg-gray-50">
                        ... and {results.imported.length - 10} more products
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExcelImporter;