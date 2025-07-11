import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, FileText, Link, Image, MessageSquare, Eye, RotateCcw } from 'lucide-react';
import { Quotation } from '../../types';

interface QuotationStep2Props {
  quotation: Partial<Quotation>;
  onNext: (data: Partial<Quotation>) => void;
  onBack: () => void;
}

const QuotationStep2: React.FC<QuotationStep2Props> = ({ quotation, onNext, onBack }) => {
  const [formData, setFormData] = useState({
    export_type: quotation?.export_type || 'pdf',
    pdf_template: quotation?.pdf_template || 'standard',
    link_template: quotation?.link_template || 'modern',
    terms_conditions: quotation?.terms_conditions || '',
    notes: quotation?.notes || '',
    include_images: quotation?.include_images || false,
  });

  // TODO: Replace with Supabase-based terms_and_conditions fetch
  const defaultTerms = '';

  const handleResetToDefaults = () => {
    try {
      const defaultTerms = localStorage.getItem('terms_and_conditions') || '';
      setFormData(prev => ({
        ...prev,
        terms_conditions: defaultTerms
      }));
    } catch (error) {
      console.error('Error resetting to default terms:', error);
    }
  };

  const handleNext = () => {
    onNext(formData);
  };

  const pdfTemplates = [
    { id: 'standard', name: 'Standard Template', description: 'Clean and professional layout' },
    { id: 'modern', name: 'Modern Template', description: 'Contemporary design with colors' },
    { id: 'minimal', name: 'Minimal Template', description: 'Simple and elegant layout' },
    { id: 'detailed', name: 'Detailed Template', description: 'Comprehensive with all product details' }
  ];

  const linkTemplates = [
    { id: 'modern', name: 'Modern Web View', description: 'Interactive web-based quotation' },
    { id: 'mobile', name: 'Mobile Optimized', description: 'Perfect for mobile viewing' },
    { id: 'print', name: 'Print Friendly', description: 'Optimized for printing from web' }
  ];

  return (
    <div className="space-y-6">
      {/* Export Type Selection */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center space-x-2">
          <FileText className="w-5 h-5" />
          <span>Export Options</span>
        </h3>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
            formData.export_type === 'pdf' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}>
            <input
              type="radio"
              id="export-pdf"
              name="export_type"
              value="pdf"
              checked={formData.export_type === 'pdf'}
              onChange={(e) => setFormData({ ...formData, export_type: e.target.value as any })}
              className="sr-only"
            />
            <label htmlFor="export-pdf" className="cursor-pointer">
              <div className="flex items-center space-x-3">
                <FileText className="w-6 h-6 text-blue-600" />
                <div>
                  <div className="font-medium text-gray-900">PDF Only</div>
                  <div className="text-sm text-gray-500">Generate downloadable PDF</div>
                </div>
              </div>
            </label>
          </div>

          <div className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
            formData.export_type === 'link' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}>
            <input
              type="radio"
              id="export-link"
              name="export_type"
              value="link"
              checked={formData.export_type === 'link'}
              onChange={(e) => setFormData({ ...formData, export_type: e.target.value as any })}
              className="sr-only"
            />
            <label htmlFor="export-link" className="cursor-pointer">
              <div className="flex items-center space-x-3">
                <Link className="w-6 h-6 text-green-600" />
                <div>
                  <div className="font-medium text-gray-900">Link Only</div>
                  <div className="text-sm text-gray-500">Share via web link</div>
                </div>
              </div>
            </label>
          </div>

          <div className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
            formData.export_type === 'both' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}>
            <input
              type="radio"
              id="export-both"
              name="export_type"
              value="both"
              checked={formData.export_type === 'both'}
              onChange={(e) => setFormData({ ...formData, export_type: e.target.value as any })}
              className="sr-only"
            />
            <label htmlFor="export-both" className="cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <Link className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Both</div>
                  <div className="text-sm text-gray-500">PDF + Web link</div>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Template Selection */}
      {(formData.export_type === 'pdf' || formData.export_type === 'both') && (
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">PDF Template</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {pdfTemplates.map((template) => (
              <div
                key={template.id}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                  formData.pdf_template === template.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setFormData({ ...formData, pdf_template: template.id })}
              >
                <div className="flex items-start space-x-3">
                  <input
                    type="radio"
                    name="pdf_template"
                    value={template.id}
                    checked={formData.pdf_template === template.id}
                    onChange={() => setFormData({ ...formData, pdf_template: template.id })}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{template.name}</div>
                    <div className="text-sm text-gray-500">{template.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(formData.export_type === 'link' || formData.export_type === 'both') && (
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Link Template</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {linkTemplates.map((template) => (
              <div
                key={template.id}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                  formData.link_template === template.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setFormData({ ...formData, link_template: template.id })}
              >
                <div className="flex items-start space-x-3">
                  <input
                    type="radio"
                    name="link_template"
                    value={template.id}
                    checked={formData.link_template === template.id}
                    onChange={() => setFormData({ ...formData, link_template: template.id })}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{template.name}</div>
                    <div className="text-sm text-gray-500">{template.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Include Images Option */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="include-images"
            checked={formData.include_images}
            onChange={(e) => setFormData({ ...formData, include_images: e.target.checked })}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="include-images" className="flex items-center space-x-2 text-sm font-medium text-gray-800">
            <Image className="w-4 h-4" />
            <span>Include product images in quotation</span>
          </label>
        </div>
        <p className="text-xs text-gray-600 mt-1 ml-7">
          Product images will be displayed alongside product details (if available)
        </p>
      </div>

      {/* Notes and Terms */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>Terms & Conditions (shown to customer)</span>
              </label>
              {formData.terms_conditions === localStorage.getItem('terms_and_conditions') && formData.terms_conditions && (
                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                  Default
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={handleResetToDefaults}
              className="flex items-center space-x-1 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors duration-200"
              title="Reset to default terms from settings"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset to Default</span>
            </button>
          </div>
          <textarea
            value={formData.terms_conditions}
            onChange={(e) => setFormData({ ...formData, terms_conditions: e.target.value })}
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter terms and conditions that will be visible to the customer..."
          />
          <div className="flex items-center justify-between mt-1">
            <p className="text-xs text-gray-500">
              These will appear in the final quotation document/link
            </p>
            {formData.terms_conditions && (
              <p className="text-xs text-blue-600">
                {formData.terms_conditions.split('\n').filter(line => line.trim()).length} lines
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
            <MessageSquare className="w-4 h-4" />
            <span>Internal Comments (not shown to customer)</span>
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Internal notes and comments for your reference..."
          />
          <p className="text-xs text-gray-500 mt-1">
            These are for internal use only and won't be visible to customers
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-800 mb-2">Export Summary</h4>
        <div className="text-sm text-blue-700 space-y-1">
          <p>• Export as: <strong>{formData.export_type.toUpperCase()}</strong></p>
          {(formData.export_type === 'pdf' || formData.export_type === 'both') && (
            <p>• PDF Template: <strong>{pdfTemplates.find(t => t.id === formData.pdf_template)?.name}</strong></p>
          )}
          {(formData.export_type === 'link' || formData.export_type === 'both') && (
            <p>• Link Template: <strong>{linkTemplates.find(t => t.id === formData.link_template)?.name}</strong></p>
          )}
          <p>• Include Images: <strong>{formData.include_images ? 'Yes' : 'No'}</strong></p>
          <p>• Terms & Conditions: <strong>
            {formData.terms_conditions ? 
              (formData.terms_conditions === localStorage.getItem('terms_and_conditions') ? 'Default' : 'Custom') 
              : 'None'
            }
          </strong></p>
          <p>• Internal Notes: <strong>{formData.notes ? 'Added' : 'None'}</strong></p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between pt-6 border-t border-gray-200">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back: Customer & Products</span>
        </button>
        
        <button
          onClick={handleNext}
          className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <span>Next: Review & Complete</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default QuotationStep2;