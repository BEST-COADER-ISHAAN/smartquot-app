import React, { useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Quotation } from '../../types';
import QuotationStep1 from './QuotationStep1';
import QuotationStep2 from './QuotationStep2';
import QuotationStep3 from './QuotationStep3';

interface QuotationWizardProps {
  quotation?: Quotation;
  onSave: (quotation: Quotation) => void;
  onCancel: () => void;
  viewMode?: 'edit' | 'view';
}

const QuotationWizard: React.FC<QuotationWizardProps> = ({ quotation, onSave, onCancel, viewMode = 'edit' }) => {
  // If viewMode is 'view' and we have a quotation, start at step 3 (success page)
  const initialStep = viewMode === 'view' && quotation ? 3 : 1;
  
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [quotationData, setQuotationData] = useState<Partial<Quotation>>(
    quotation || {
      customer_id: '',
      status: 'draft',
      is_area_wise: true,
      include_images: false,
      export_type: 'pdf',
      pdf_template: '',
      link_template: '',
      terms_conditions: '',
      notes: '',
      rooms: [
        {
          id: '',
          quotation_id: '',
          room_name: 'Living Room',
          room_total: 0,
          room_margin_amount: 0,
          room_margin_percentage: 0,
          sort_order: 0,
          items: [] // Changed from having a blank item to empty array
        }
      ]
    }
  );

  const steps = [
    { number: 1, title: 'Customer & Products', description: 'Select customer and add products' },
    { number: 2, title: 'Export Settings', description: 'Configure export options and notes' },
    { number: 3, title: 'Review & Complete', description: 'Review and finalize quotation' }
  ];

  const handleNext = (data: Partial<Quotation>) => {
    setQuotationData(prev => ({ ...prev, ...data }));
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleFinish = (finalQuotation: Quotation) => {
    onSave(finalQuotation);
  };

  const renderStepIndicator = () => {
    // Don't show step indicator when viewing existing quotation
    if (viewMode === 'view' && quotation) {
      return null;
    }

    return (
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                currentStep >= step.number
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'border-gray-300 text-gray-500'
              }`}>
                {currentStep > step.number ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <span className="font-semibold">{step.number}</span>
                )}
              </div>
              <div className="ml-4 min-w-0 flex-1">
                <p className={`text-sm font-medium ${
                  currentStep >= step.number ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {step.title}
                </p>
                <p className="text-xs text-gray-500">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${
                  currentStep > step.number ? 'bg-blue-600' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <QuotationStep1
            quotation={quotationData}
            onNext={handleNext}
            onCancel={onCancel}
          />
        );
      case 2:
        return (
          <QuotationStep2
            quotation={quotationData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <QuotationStep3
            quotation={quotationData}
            onFinish={handleFinish}
            onBack={viewMode === 'view' ? undefined : handleBack}
            isViewMode={viewMode === 'view'}
            existingQuotation={quotation}
          />
        );
      default:
        return null;
    }
  };

  const getPageTitle = () => {
    if (viewMode === 'view' && quotation) {
      return `Quotation ${quotation.quotation_number}`;
    }
    return quotation ? 'Edit Quotation' : 'Create New Quotation';
  };

  const getPageDescription = () => {
    if (viewMode === 'view' && quotation) {
      return 'View quotation details and manage actions';
    }
    return `Step ${currentStep} of ${steps.length}: ${steps[currentStep - 1]?.title}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {currentStep > 1 && viewMode !== 'view' && (
              <button
                onClick={handleBack}
                className="p-2 rounded-lg hover:bg-white transition-colors duration-200"
                title="Go back"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
            )}
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {getPageTitle()}
              </h2>
              <p className="text-gray-600 mt-1">
                {getPageDescription()}
              </p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            {viewMode === 'view' ? 'Back to List' : 'Cancel'}
          </button>
        </div>
        
        {renderStepIndicator()}
      </div>

      <div className="p-6">
        {renderCurrentStep()}
      </div>
    </div>
  );
};

export default QuotationWizard;