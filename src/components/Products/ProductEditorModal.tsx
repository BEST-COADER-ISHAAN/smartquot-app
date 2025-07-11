import React, { useState, useEffect } from 'react';
import { X, Save, Package, IndianRupee, Layers, Ruler, Image, Weight, Truck, Percent, Box } from 'lucide-react';
import { QuotationProduct } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../lib/api';
import { getImageUrl, getFilenameFromUrl } from '../../lib/storage';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';

interface ProductEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product?: QuotationProduct) => void;
  product?: QuotationProduct;
}

const ProductEditorModal: React.FC<ProductEditorModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  product 
}) => {
  const { user, session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: product?.name || '',
    size: product?.size || '',
    collection: product?.collection || '',
    surface: product?.surface || '',
    ex_factory_price: product?.ex_factory_price || 0,
    mrp_per_sqft: product?.mrp_per_sqft || 0,
    mrp_per_box: product?.mrp_per_box || 0,
    gst_percentage: product?.gst_percentage || 18,
    insurance_percentage: product?.insurance_percentage || 0.5,
    actual_sqft_per_box: product?.actual_sqft_per_box || 1,
    billed_sqft_per_box: product?.billed_sqft_per_box || 1,
    weight: product?.weight || 0,
    freight: product?.freight || 0,
    image_filename: product?.image_url ? getFilenameFromUrl(product.image_url) : '',
  });

  // Reset form when modal opens/closes or product changes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: product?.name || '',
        size: product?.size || '',
        collection: product?.collection || '',
        surface: product?.surface || '',
        ex_factory_price: product?.ex_factory_price || 0,
        mrp_per_sqft: product?.mrp_per_sqft || 0,
        mrp_per_box: product?.mrp_per_box || 0,
        gst_percentage: product?.gst_percentage || 18,
        insurance_percentage: product?.insurance_percentage || 0.5,
        actual_sqft_per_box: product?.actual_sqft_per_box || 1,
        billed_sqft_per_box: product?.billed_sqft_per_box || 1,
        weight: product?.weight || 0,
        freight: product?.freight || 0,
        image_filename: product?.image_url ? getFilenameFromUrl(product.image_url) : '',
      });
      setError(null);
    }
  }, [isOpen, product]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateMRPPerBox = () => {
    return formData.mrp_per_sqft * formData.billed_sqft_per_box;
  };

  const handleSave = async () => {
    if (!user) {
      alert('You must be logged in to save a product.');
      return;
    }
    if (!formData.name.trim()) {
      setError('Product name (Design Name) is required.');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const token = session?.access_token;
      
      // Construct image URL if filename is provided
      let imageUrlToSave: string | null = null;
      if (formData.image_filename && formData.image_filename.trim()) {
        imageUrlToSave = getImageUrl(formData.image_filename.trim());
      }

      const productData = {
        name: formData.name,
        size: formData.size,
        collection: formData.collection || null,
        surface: formData.surface || null,
        ex_factory_price: formData.ex_factory_price,
        mrp_per_sqft: formData.mrp_per_sqft,
        mrp_per_box: calculateMRPPerBox(),
        gst_percentage: formData.gst_percentage,
        insurance_percentage: formData.insurance_percentage,
        actual_sqft_per_box: formData.actual_sqft_per_box,
        billed_sqft_per_box: formData.billed_sqft_per_box,
        weight: formData.weight,
        freight: formData.freight,
        image_url: imageUrlToSave,
        created_by: user.id,
      };

      const response = await api.saveProduct(productData, product?.id, token);
        
      if (!response.success) {
        throw new Error(response.error || 'Failed to save product');
      }

      onSave(response.data);
      onClose();
    } catch (error) {
      console.error('Error saving product:', error);
      setError(error instanceof Error ? error.message : 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {product ? 'Edit Product' : 'Add New Product'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Basic Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Design Name *
              </label>
              <div className="relative">
                <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter design name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Size *
              </label>
              <div className="relative">
                <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={formData.size}
                  onChange={(e) => handleInputChange('size', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 600X1200"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Collection
              </label>
              <div className="relative">
                <Layers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={formData.collection}
                  onChange={(e) => handleInputChange('collection', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter collection name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Surface
              </label>
              <input
                type="text"
                value={formData.surface}
                onChange={(e) => handleInputChange('surface', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter surface type"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image Filename
              </label>
              <div className="relative">
                <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={formData.image_filename}
                  onChange={(e) => handleInputChange('image_filename', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., product-name.jpg"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Enter the filename of the image uploaded to Supabase Storage
              </p>
            </div>
          </div>

          {/* Image Preview */}
          {formData.image_filename && (
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Image Preview</h3>
              <div className="flex items-center space-x-4">
                <img
                  src={getImageUrl(formData.image_filename)}
                  alt="Product preview"
                  className="w-16 h-16 object-cover rounded border"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="text-sm text-gray-600">
                  <p>Filename: {formData.image_filename}</p>
                  <p>URL: {getImageUrl(formData.image_filename)}</p>
                </div>
              </div>
            </div>
          )}

          {/* Pricing Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-800 border-b border-gray-200 pb-2">
              Pricing Information
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ex-Factory Price (₹)
                </label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    value={formData.ex_factory_price}
                    onChange={(e) => handleInputChange('ex_factory_price', parseFloat(e.target.value) || 0)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  MRP per Sqft (₹)
                </label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    value={formData.mrp_per_sqft}
                    onChange={(e) => handleInputChange('mrp_per_sqft', parseFloat(e.target.value) || 0)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  MRP per Box (₹)
                </label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    value={calculateMRPPerBox()}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    readOnly
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Auto-calculated: MRP per Sqft × Billed Sqft per Box
                </p>
              </div>
            </div>
          </div>

          {/* Box Specifications */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-800 border-b border-gray-200 pb-2">
              Box Specifications
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Actual Sqft per Box
                </label>
                <div className="relative">
                  <Box className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    value={formData.actual_sqft_per_box}
                    onChange={(e) => handleInputChange('actual_sqft_per_box', parseFloat(e.target.value) || 0)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="1.00"
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Billed Sqft per Box
                </label>
                <div className="relative">
                  <Box className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    value={formData.billed_sqft_per_box}
                    onChange={(e) => handleInputChange('billed_sqft_per_box', parseFloat(e.target.value) || 0)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="1.00"
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight (kg)
                </label>
                <div className="relative">
                  <Weight className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || 0)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Additional Settings */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-800 border-b border-gray-200 pb-2">
              Additional Settings
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GST Percentage (%)
                </label>
                <div className="relative">
                  <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    value={formData.gst_percentage}
                    onChange={(e) => handleInputChange('gst_percentage', parseFloat(e.target.value) || 0)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="18"
                    step="0.1"
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Insurance Percentage (%)
                </label>
                <div className="relative">
                  <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    value={formData.insurance_percentage}
                    onChange={(e) => handleInputChange('insurance_percentage', parseFloat(e.target.value) || 0)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.5"
                    step="0.1"
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Freight (₹)
                </label>
                <div className="relative">
                  <Truck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    value={formData.freight}
                    onChange={(e) => handleInputChange('freight', parseFloat(e.target.value) || 0)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading || !formData.name.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Product
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductEditorModal; 