import React, { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, 
  Ruler, 
  Truck, 
  FileText, 
  Palette, 
  Save,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import FreightEditorModal from '../components/Settings/FreightEditorModal';
import ThemeSelector from '../components/Settings/ThemeSelector';
import { useTheme } from '../hooks/useTheme';

const Settings: React.FC = () => {
  // State for different settings
  const [preferredSizeUnit, setPreferredSizeUnit] = useState<'inches' | 'mm'>('inches');
  const [showFreightEditor, setShowFreightEditor] = useState(false);
  const [termsAndConditions, setTermsAndConditions] = useState('');
  const [savedMessage, setSavedMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const { theme, setThemeById } = useTheme();

  // Load settings from localStorage on component mount
  useEffect(() => {
    const loadSettings = () => {
      const savedUnit = localStorage.getItem('preferred_size_unit') as 'inches' | 'mm';
      if (savedUnit) setPreferredSizeUnit(savedUnit);

      const savedTerms = localStorage.getItem('terms_and_conditions');
      if (savedTerms) setTermsAndConditions(savedTerms);
    };

    loadSettings();
  }, []);

  // Save settings to localStorage
  const saveSettings = async () => {
    setSaving(true);
    try {
      localStorage.setItem('preferred_size_unit', preferredSizeUnit);
      localStorage.setItem('terms_and_conditions', termsAndConditions);

      setSavedMessage('Settings saved successfully!');
      setTimeout(() => setSavedMessage(null), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
      setSavedMessage('Error saving settings. Please try again.');
      setTimeout(() => setSavedMessage(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleFreightSave = () => {
    setSavedMessage('Freight settings updated successfully!');
    setTimeout(() => setSavedMessage(null), 3000);
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm lg:text-base text-gray-600 mt-1">Configure application settings and preferences</p>
      </div>

      {/* Success/Error Message */}
      {savedMessage && (
        <div className={`p-4 rounded-lg flex items-center space-x-2 ${
          savedMessage.includes('Error') 
            ? 'bg-red-50 border border-red-200 text-red-700' 
            : 'bg-green-50 border border-green-200 text-green-700'
        }`}>
          {savedMessage.includes('Error') ? (
            <AlertCircle className="w-5 h-5" />
          ) : (
            <CheckCircle className="w-5 h-5" />
          )}
          <span className="text-sm">{savedMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Preferred Size Unit */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
          <div className="flex items-center space-x-3 mb-4 lg:mb-6">
            <div className="bg-blue-100 rounded-full p-2">
              <Ruler className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-lg lg:text-xl font-semibold text-gray-800">Preferred Size Unit</h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-gray-600 text-sm">
              Choose your preferred unit for displaying product sizes throughout the application.
            </p>
            
            <div className="space-y-3">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="sizeUnit"
                  value="inches"
                  checked={preferredSizeUnit === 'inches'}
                  onChange={(e) => setPreferredSizeUnit(e.target.value as 'inches' | 'mm')}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 mt-0.5"
                />
                <div>
                  <div className="font-medium text-gray-900 text-sm lg:text-base">Inches</div>
                  <div className="text-xs lg:text-sm text-gray-500">Display sizes in inches (e.g., 24" x 48")</div>
                </div>
              </label>
              
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="sizeUnit"
                  value="mm"
                  checked={preferredSizeUnit === 'mm'}
                  onChange={(e) => setPreferredSizeUnit(e.target.value as 'inches' | 'mm')}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 mt-0.5"
                />
                <div>
                  <div className="font-medium text-gray-900 text-sm lg:text-base">Millimeters</div>
                  <div className="text-xs lg:text-sm text-gray-500">Display sizes in millimeters (e.g., 600mm x 1200mm)</div>
                </div>
              </label>
            </div>
          </div>
        </div>



        {/* Freight Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
          <div className="flex items-center space-x-3 mb-4 lg:mb-6">
            <div className="bg-green-100 rounded-full p-2">
              <Truck className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-lg lg:text-xl font-semibold text-gray-800">Freight Settings</h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-gray-600 text-sm">
              Manage freight costs and billed square footage for all product sizes in your inventory.
            </p>
            
            <button
              onClick={() => setShowFreightEditor(true)}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center space-x-2 text-sm"
            >
              <Truck className="w-4 h-4 lg:w-5 lg:h-5" />
              <span>Edit Freight & Billed SQFT</span>
            </button>
            
            <div className="text-xs text-gray-500 text-center">
              Opens a modal with all product sizes and their current freight settings
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6 lg:col-span-2">
          <div className="flex items-center space-x-3 mb-4 lg:mb-6">
            <div className="bg-purple-100 rounded-full p-2">
              <FileText className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-lg lg:text-xl font-semibold text-gray-800">Default Terms and Conditions</h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-gray-600 text-sm">
              Set default terms and conditions that will be automatically included in all new quotations.
            </p>
            
            <textarea
              value={termsAndConditions}
              onChange={(e) => setTermsAndConditions(e.target.value)}
              placeholder="Enter your default terms and conditions here..."
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-vertical text-sm"
            />
            
            <div className="text-xs text-gray-500">
              These terms will be automatically added to new quotations. You can still edit them per quotation if needed.
            </div>
          </div>
        </div>

        {/* Theme Selection */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6 lg:col-span-2">
          <ThemeSelector 
            selectedTheme={theme.id} 
            onThemeChange={setThemeById} 
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-center lg:justify-end">
        <button
          onClick={saveSettings}
          disabled={saving}
          className="w-full lg:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm"
        >
          {saving ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4 lg:w-5 lg:h-5" />
              <span>Save All Settings</span>
            </>
          )}
        </button>
      </div>

      {/* Freight Editor Modal */}
      <FreightEditorModal
        isOpen={showFreightEditor}
        onClose={() => setShowFreightEditor(false)}
        onSave={handleFreightSave}
      />
    </div>
  );
};

export default Settings;