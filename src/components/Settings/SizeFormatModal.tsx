import React, { useState, useEffect } from 'react';
import { X, Save, Ruler, Settings } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { getSizeFormatMappings, upsertSizeFormatMapping } from '../../lib/api';

interface SizeFormatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

interface SizeFormat {
  id: string;
  original_size: string;
  mm_format: string;
  inch_format: string;
  feet_format: string;
  custom_format: string;
}

const SizeFormatModal: React.FC<SizeFormatModalProps> = ({ isOpen, onClose, onSave }) => {
  const [sizeFormats, setSizeFormats] = useState<SizeFormat[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (isOpen && user) {
      loadSizeFormats();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, user]);

  const loadSizeFormats = async () => {
    if (!user) return;
    setLoading(true);
    try {
      let formats = await getSizeFormatMappings(user.id);
      // If no formats in Supabase, migrate from localStorage if present
      if (formats.length === 0) {
        const savedFormats = JSON.parse(localStorage.getItem('size_formats') || '[]');
        for (const f of savedFormats) {
          await upsertSizeFormatMapping(
            user.id,
            f.original_size,
            f.mm_format || f.original_size,
            f.inch_format || f.original_size,
            f.feet_format || f.original_size,
            f.custom_format || f.original_size
          );
        }
        localStorage.removeItem('size_formats');
        formats = await getSizeFormatMappings(user.id);
      }
      // If still empty, load unique sizes from products and create default formats
      if (formats.length === 0) {
        const { data: products, error } = await (await import('../../lib/supabase')).supabase
          .from('products')
          .select('size')
          .eq('is_archived', false)
          .order('size');
        if (error) throw error;
        const uniqueSizes = [...new Set(products.map((p: any) => p.size))];
        for (const size of uniqueSizes) {
          await upsertSizeFormatMapping(user.id, size, size, size, size, size);
        }
        formats = await getSizeFormatMappings(user.id);
      }
      // Map to UI format
      setSizeFormats(formats.map((f: any) => ({
        id: `format_${f.size}`,
        original_size: f.size,
        mm_format: f.mm_format,
        inch_format: f.inch_format,
        feet_format: f.feet_format,
        custom_format: f.custom_format,
      })));
    } catch (error) {
      console.error('Error loading size formats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormatChange = (formatId: string, field: keyof SizeFormat, value: string) => {
    setSizeFormats(prev => 
      prev.map(format => 
        format.id === formatId 
          ? { ...format, [field]: value }
          : format
      )
    );
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      for (const format of sizeFormats) {
        await upsertSizeFormatMapping(
          user.id,
          format.original_size,
          format.mm_format,
          format.inch_format,
          format.feet_format,
          format.custom_format
        );
      }
      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving size formats:', error);
      alert('Failed to save size formats. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const filteredFormats = sizeFormats.filter(format =>
    format.original_size.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 lg:p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[95vh] lg:max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 rounded-full p-2">
              <Ruler className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg lg:text-xl font-semibold text-gray-800">Size Format Mapping</h2>
              <p className="text-xs lg:text-sm text-gray-600">Configure how sizes are displayed across different units</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5 lg:w-6 lg:h-6" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 lg:p-6 border-b border-gray-200 flex-shrink-0">
          <div className="relative">
            <Settings className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 lg:w-5 lg:h-5" />
            <input
              type="text"
              placeholder="Search sizes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {loading ? (
            <div className="p-4 lg:p-6 text-center">
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-600 text-sm">Loading size formats...</p>
            </div>
          ) : (
            <div className="p-4 lg:p-6">
              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium text-gray-700">Size (Database)</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-700">MM Format</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-700">Inch Format</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-700">Feet Format</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-700">Custom Format</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFormats.map((format) => (
                      <tr key={format.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">
                          {format.original_size}
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={format.mm_format || ""}
                            onChange={(e) => handleFormatChange(format.id, 'mm_format', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="MM format"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={format.inch_format || ""}
                            onChange={(e) => handleFormatChange(format.id, 'inch_format', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Inch format"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={format.feet_format || ""}
                            onChange={(e) => handleFormatChange(format.id, 'feet_format', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Feet format"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={format.custom_format || ""}
                            onChange={(e) => handleFormatChange(format.id, 'custom_format', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Custom format"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards View */}
              <div className="lg:hidden space-y-3">
                {filteredFormats.map((format) => (
                  <div key={format.id} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="mb-3">
                      <span className="font-medium text-gray-900">{format.original_size}</span>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <span className="text-gray-600 text-xs">MM:</span>
                        <input
                          type="text"
                          value={format.mm_format || ""}
                          onChange={(e) => handleFormatChange(format.id, 'mm_format', e.target.value)}
                          className="ml-2 px-2 py-1 border border-gray-300 rounded text-xs w-full mt-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="MM format"
                        />
                      </div>
                      <div>
                        <span className="text-gray-600 text-xs">Inch:</span>
                        <input
                          type="text"
                          value={format.inch_format || ""}
                          onChange={(e) => handleFormatChange(format.id, 'inch_format', e.target.value)}
                          className="ml-2 px-2 py-1 border border-gray-300 rounded text-xs w-full mt-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Inch format"
                        />
                      </div>
                      <div>
                        <span className="text-gray-600 text-xs">Feet:</span>
                        <input
                          type="text"
                          value={format.feet_format || ""}
                          onChange={(e) => handleFormatChange(format.id, 'feet_format', e.target.value)}
                          className="ml-2 px-2 py-1 border border-gray-300 rounded text-xs w-full mt-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Feet format"
                        />
                      </div>
                      <div>
                        <span className="text-gray-600 text-xs">Custom:</span>
                        <input
                          type="text"
                          value={format.custom_format || ""}
                          onChange={(e) => handleFormatChange(format.id, 'custom_format', e.target.value)}
                          className="ml-2 px-2 py-1 border border-gray-300 rounded text-xs w-full mt-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Custom format"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredFormats.length === 0 && (
                <div className="text-center py-8 text-gray-500 text-sm">
                  No sizes found matching your search.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 lg:p-6 border-t border-gray-200 flex-shrink-0">
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 flex items-center space-x-2"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Formats</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeFormatModal; 