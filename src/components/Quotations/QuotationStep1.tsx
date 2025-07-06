import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Plus, Trash2, Search, User, Building, MapPin, Phone, Mail, Package, Calculator, Eye, EyeOff, ChevronDown, ChevronUp, Loader, TrendingUp, Weight, Box, DollarSign } from 'lucide-react';
import { Quotation, QuotationCustomer, QuotationProduct } from '../../types';
import { supabase } from '../../lib/supabase';
import { supabaseAdmin } from '../../lib/supabaseAdmin';
import { useDebounce } from '../../hooks/useDebounce';
import CascadingProductSelector from '../Products/CascadingProductSelector';
import { useAuth } from '../../hooks/useAuth';

interface QuotationStep1Props {
  quotation: Partial<Quotation>;
  onNext: (data: Partial<Quotation>) => void;
  onCancel: () => void;
}

const QuotationStep1: React.FC<QuotationStep1Props> = ({ quotation, onNext, onCancel }) => {
  const { user, session } = useAuth();
  console.log('Current user:', user);
  console.log('Current session:', session);
  const [customers, setCustomers] = useState<QuotationCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [productSearch, setProductSearch] = useState('');
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [filteredDesignNames, setFilteredDesignNames] = useState<string[]>([]);
  const [selectedProductIndex, setSelectedProductIndex] = useState(-1);
  const [selectedDesignNameForGuidedSelection, setSelectedDesignNameForGuidedSelection] = useState<string | null>(null);
  const [isColumnVisibilityExpanded, setIsColumnVisibilityExpanded] = useState(false);
  
  // Settings from Settings page (hardcoded for now)
  const [settings] = useState({
    companyDiscount: 5, // Default company discount percentage
    freightPerSqft: 2.5, // Default freight cost per sqft
  });
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Debounce search term to avoid excessive API calls
  const debouncedSearchTerm = useDebounce(productSearch, 300);

  const [formData, setFormData] = useState({
    customer_id: quotation?.customer_id || '',
    status: quotation?.status || 'draft',
    is_area_wise: quotation?.is_area_wise !== undefined ? quotation.is_area_wise : true,
    rooms: quotation?.rooms && quotation.rooms.length > 0 ? quotation.rooms : [
      {
        id: '',
        quotation_id: '',
        room_name: quotation?.is_area_wise !== false ? 'Living Room' : 'Products',
        room_total: 0,
        room_margin_amount: 0,
        room_margin_percentage: 0,
        sort_order: 0,
        items: [] // Always start with completely empty items array
      }
    ],
    // Column visibility settings
    sqft_in_box_type: quotation?.sqft_in_box_type || 'billed',
    show_sqft_in_box: quotation?.show_sqft_in_box || false,
    show_sqft_needed: quotation?.show_sqft_needed || false,
    show_box_needed: quotation?.show_box_needed !== undefined ? quotation.show_box_needed : true, // Always visible by default
    show_price_per_sqft: quotation?.show_price_per_sqft || false,
    show_price_per_box: quotation?.show_price_per_box || false,
    show_amount: quotation?.show_amount || false,
    show_margin: quotation?.show_margin || false,
  });

  useEffect(() => {
    loadInitialData();
  }, []);

  // Handle product search with debouncing
  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      searchDesignNames(debouncedSearchTerm);
    } else {
      setFilteredDesignNames([]);
      setShowProductDropdown(false);
    }
  }, [debouncedSearchTerm]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowProductDropdown(false);
        setSelectedProductIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update room names when quotation type changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      rooms: prev.rooms.map((room, index) => ({
        ...room,
        room_name: prev.is_area_wise 
          ? (index === 0 ? 'Living Room' : `Room ${index + 1}`)
          : (index === 0 ? 'Products' : `Section ${index + 1}`)
      }))
    }));
  }, [formData.is_area_wise]);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      // Load customers
      const { data: customersData, error: customersError } = await supabase
        .from('customers')
        .select('*')
        .order('name');

      if (customersError) throw customersError;
      setCustomers(customersData || []);

    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const searchDesignNames = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredDesignNames([]);
      return;
    }

    setSearchLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('name')
        .eq('is_archived', false)
        .ilike('name', `%${searchTerm}%`)
        .order('name')
        .limit(100);

      if (error) throw error;

      // Get unique design names
      const uniqueDesignNames = [...new Set(data.map(product => product.name))];
      setFilteredDesignNames(uniqueDesignNames);
      setShowProductDropdown(true);
      setSelectedProductIndex(-1);
    } catch (error) {
      console.error('Error searching design names:', error);
      setFilteredDesignNames([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setProductSearch(value);
    
    if (value.trim()) {
      setShowProductDropdown(true);
    } else {
      setShowProductDropdown(false);
      setFilteredDesignNames([]);
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showProductDropdown || filteredDesignNames.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedProductIndex(prev => 
          prev < filteredDesignNames.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedProductIndex(prev => 
          prev > 0 ? prev - 1 : filteredDesignNames.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedProductIndex >= 0 && selectedProductIndex < filteredDesignNames.length) {
          handleDesignNameSelect(filteredDesignNames[selectedProductIndex]);
        }
        break;
      case 'Escape':
        setShowProductDropdown(false);
        setSelectedProductIndex(-1);
        searchInputRef.current?.blur();
        break;
    }
  };

  const handleDesignNameSelect = (designName: string) => {
    setSelectedDesignNameForGuidedSelection(designName);
    setProductSearch('');
    setShowProductDropdown(false);
    setFilteredDesignNames([]);
    setSelectedProductIndex(-1);
  };

  const handleResetInitialSelection = () => {
    setSelectedDesignNameForGuidedSelection(null);
  };

  const calculateQuantityFromSqft = (sqftNeeded: number, sqftInBox: number): number => {
    if (sqftInBox <= 0) return 1;
    
    const x = sqftNeeded / sqftInBox;
    const fractionalPart = x - Math.floor(x);
    
    if (fractionalPart < 0.1) {
      return Math.floor(x);
    } else {
      return Math.floor(x) + 1;
    }
  };

  const calculatePricePerSqft = (mrpPerSqft: number, discount: number): number => {
    return mrpPerSqft * (1 - discount / 100);
  };

  const calculatePricePerBox = (pricePerSqft: number, sqftInBox: number): number => {
    return pricePerSqft * sqftInBox;
  };

  // Enhanced margin calculation function
  const calculateItemMargin = (item: any): { marginAmount: number; marginPercentage: number } => {
    if (!item.product) return { marginAmount: 0, marginPercentage: 0 };

    const product = item.product;
    const quantity = item.quantity_boxes;
    const sellingPricePerBox = item.mrp_per_box;
    const totalSellingPrice = quantity * sellingPricePerBox;

    // Calculate cost breakdown per sqft
    const exFactoryPerSqft = product.ex_factory_price;
    const exFactoryAfterCompanyDiscount = exFactoryPerSqft * (1 - settings.companyDiscount / 100);
    const insuranceCostPerSqft = exFactoryAfterCompanyDiscount * (product.insurance_percentage / 100);
    const baseForGst = exFactoryAfterCompanyDiscount + insuranceCostPerSqft;
    const gstCostPerSqft = baseForGst * (product.gst_percentage / 100);
    const freightCostPerSqft = settings.freightPerSqft;
    
    const totalCostPerSqft = exFactoryAfterCompanyDiscount + insuranceCostPerSqft + gstCostPerSqft + freightCostPerSqft;
    
    // Calculate cost per box
    const sqftInBox = formData.sqft_in_box_type === 'actual' 
      ? product.actual_sqft_per_box 
      : product.billed_sqft_per_box;
    
    const costPerBox = totalCostPerSqft * sqftInBox;
    const totalCostPrice = quantity * costPerBox;
    
    const marginAmount = totalSellingPrice - totalCostPrice;
    const marginPercentage = totalSellingPrice > 0 ? (marginAmount / totalSellingPrice) * 100 : 0;

    return { marginAmount, marginPercentage };
  };

  const handleProductSelect = (product: QuotationProduct) => {
    // Add product to the most recent room
    const roomIndex = formData.rooms.length - 1;
    
    const sqftInBox = formData.sqft_in_box_type === 'actual' 
      ? product.actual_sqft_per_box 
      : product.billed_sqft_per_box;
    
    const defaultDiscount = 45; // Default discount percentage
    const pricePerSqft = calculatePricePerSqft(product.mrp_per_sqft, defaultDiscount);
    const pricePerBox = calculatePricePerBox(pricePerSqft, sqftInBox);
    
    const newItem = {
      id: '',
      room_id: '',
      product_id: product.id,
      product: product,
      quantity_boxes: 1,
      rate_per_sqft: pricePerSqft,
      mrp_per_box: pricePerBox,
      amount: pricePerBox,
      margin_amount: 0,
      margin_percentage: 0,
      sort_order: formData.rooms[roomIndex]?.items.length || 0,
      sqft_needed: sqftInBox, // Default to one box worth
      box_needed: 0, // Add missing required field
      discount_percentage: defaultDiscount,
      price_per_sqft_override: undefined,
      price_per_box_override: undefined,
    };

    // Calculate margin for the new item
    const margin = calculateItemMargin(newItem);
    newItem.margin_amount = margin.marginAmount;
    newItem.margin_percentage = margin.marginPercentage;

    const updatedRooms = [...formData.rooms];
    if (updatedRooms[roomIndex]) {
      updatedRooms[roomIndex] = {
        ...updatedRooms[roomIndex],
        items: [...updatedRooms[roomIndex].items, newItem]
      };
    }

    setFormData(prev => ({ ...prev, rooms: recalculateRoomTotals(updatedRooms) }));
    
    // Reset the guided selection to allow selecting another product
    setSelectedDesignNameForGuidedSelection(null);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleQuotationTypeChange = (isAreaWise: boolean) => {
    setFormData(prev => ({
      ...prev,
      is_area_wise: isAreaWise,
      rooms: prev.rooms.map((room, index) => ({
        ...room,
        room_name: isAreaWise 
          ? (index === 0 ? 'Living Room' : `Room ${index + 1}`)
          : (index === 0 ? 'Products' : `Section ${index + 1}`)
      }))
    }));
  };

  const addRoom = () => {
    const newRoom = {
      id: '',
      quotation_id: '',
      room_name: formData.is_area_wise 
        ? `Room ${formData.rooms.length + 1}` 
        : `Section ${formData.rooms.length + 1}`,
      room_total: 0,
      room_margin_amount: 0,
      room_margin_percentage: 0,
      sort_order: formData.rooms.length,
      items: [] // Always start with empty items array
    };
    setFormData(prev => ({ ...prev, rooms: [...prev.rooms, newRoom] }));
  };

  const removeRoom = (roomIndex: number) => {
    if (formData.rooms.length > 1) {
      const updatedRooms = formData.rooms.filter((_, index) => index !== roomIndex);
      setFormData(prev => ({ ...prev, rooms: updatedRooms }));
    }
  };

  const updateRoomName = (roomIndex: number, name: string) => {
    const updatedRooms = [...formData.rooms];
    updatedRooms[roomIndex] = { ...updatedRooms[roomIndex], room_name: name };
    setFormData(prev => ({ ...prev, rooms: updatedRooms }));
  };

  const removeItem = (roomIndex: number, itemIndex: number) => {
    const updatedRooms = [...formData.rooms];
    updatedRooms[roomIndex] = {
      ...updatedRooms[roomIndex],
      items: updatedRooms[roomIndex].items.filter((_, index) => index !== itemIndex)
    };
    setFormData(prev => ({ ...prev, rooms: updatedRooms }));
  };

  const updateItemQuantity = (roomIndex: number, itemIndex: number, quantity: number) => {
    const updatedRooms = [...formData.rooms];
    const item = updatedRooms[roomIndex].items[itemIndex];
    
    const newQuantity = Math.max(1, Math.floor(quantity));
    const newAmount = newQuantity * item.mrp_per_box;
    
    updatedRooms[roomIndex].items[itemIndex] = {
      ...item,
      quantity_boxes: newQuantity,
      amount: newAmount,
      box_needed: item.box_needed ?? 0
    };

    // Recalculate margin
    const margin = calculateItemMargin(updatedRooms[roomIndex].items[itemIndex]);
    updatedRooms[roomIndex].items[itemIndex].margin_amount = margin.marginAmount;
    updatedRooms[roomIndex].items[itemIndex].margin_percentage = margin.marginPercentage;
    
    setFormData(prev => ({ ...prev, rooms: recalculateRoomTotals(updatedRooms) }));
  };

  const updateItemSqftNeeded = (roomIndex: number, itemIndex: number, sqftNeeded: number) => {
    const updatedRooms = [...formData.rooms];
    const item = updatedRooms[roomIndex].items[itemIndex];
    
    if (!item.product) return;
    
    const sqftInBox = formData.sqft_in_box_type === 'actual' 
      ? item.product.actual_sqft_per_box 
      : item.product.billed_sqft_per_box;
    
    const calculatedQuantity = calculateQuantityFromSqft(sqftNeeded, sqftInBox);
    const newAmount = calculatedQuantity * item.mrp_per_box;
    
    updatedRooms[roomIndex].items[itemIndex] = {
      ...item,
      sqft_needed: sqftNeeded,
      quantity_boxes: calculatedQuantity,
      amount: newAmount,
      box_needed: item.box_needed ?? 0
    };

    // Recalculate margin
    const margin = calculateItemMargin(updatedRooms[roomIndex].items[itemIndex]);
    updatedRooms[roomIndex].items[itemIndex].margin_amount = margin.marginAmount;
    updatedRooms[roomIndex].items[itemIndex].margin_percentage = margin.marginPercentage;
    
    setFormData(prev => ({ ...prev, rooms: recalculateRoomTotals(updatedRooms) }));
  };

  const updateItemDiscount = (roomIndex: number, itemIndex: number, discount: number) => {
    const updatedRooms = [...formData.rooms];
    const item = updatedRooms[roomIndex].items[itemIndex];
    
    if (!item.product) return;
    
    const sqftInBox = formData.sqft_in_box_type === 'actual' 
      ? item.product.actual_sqft_per_box 
      : item.product.billed_sqft_per_box;
    
    const newPricePerSqft = calculatePricePerSqft(item.product.mrp_per_sqft, discount);
    const newPricePerBox = calculatePricePerBox(newPricePerSqft, sqftInBox);
    const newAmount = item.quantity_boxes * newPricePerBox;
    
    updatedRooms[roomIndex].items[itemIndex] = {
      ...item,
      discount_percentage: discount,
      rate_per_sqft: newPricePerSqft,
      mrp_per_box: newPricePerBox,
      amount: newAmount,
      box_needed: item.box_needed ?? 0
    };

    // Recalculate margin
    const margin = calculateItemMargin(updatedRooms[roomIndex].items[itemIndex]);
    updatedRooms[roomIndex].items[itemIndex].margin_amount = margin.marginAmount;
    updatedRooms[roomIndex].items[itemIndex].margin_percentage = margin.marginPercentage;
    
    setFormData(prev => ({ ...prev, rooms: recalculateRoomTotals(updatedRooms) }));
  };

  const calculateTotals = () => {
    let totalAmount = 0;
    let totalMarginAmount = 0;
    let totalProducts = 0;
    let totalBoxes = 0;
    let totalWeight = 0;

    formData.rooms.forEach(room => {
      room.items.forEach(item => {
        totalAmount += item.amount || 0;
        totalMarginAmount += item.margin_amount || 0;
        totalProducts += 1;
        totalBoxes += item.quantity_boxes || 0;
        
        // Calculate weight (weight per box * quantity)
        if (item.product) {
          totalWeight += (item.product.weight || 0) * (item.quantity_boxes || 0);
        }
      });
    });

    const totalMarginPercentage = totalAmount > 0 ? (totalMarginAmount / totalAmount) * 100 : 0;

    return {
      total_amount: totalAmount,
      total_margin_amount: totalMarginAmount,
      total_margin_percentage: totalMarginPercentage,
      total_products: totalProducts,
      total_boxes: totalBoxes,
      total_weight: totalWeight
    };
  };

  // Recalculate room totals
  const recalculateRoomTotals = (rooms: any[]) => {
    return rooms.map(room => ({
      ...room,
      room_total: room.items.reduce((sum: number, item: any) => sum + (item.amount || 0), 0)
    }));
  };

  const handleNext = () => {
    const roomsWithTotals = recalculateRoomTotals(formData.rooms);
    const totals = calculateTotals();
    const selectedCustomer = customers.find(c => c.id === formData.customer_id);
    onNext({ ...formData, rooms: roomsWithTotals, ...totals, customer: selectedCustomer });
  };

  const getVisibleColumnsPreview = () => {
    const columns = [];
    columns.push('Name', 'Size', 'Surface'); // Always visible
    if (formData.show_sqft_in_box) columns.push(`SQFT in Box (${formData.sqft_in_box_type})`);
    if (formData.show_sqft_needed) columns.push('SQFT Needed');
    if (formData.show_box_needed) columns.push('Quantity');
    if (formData.show_price_per_sqft) columns.push('Price/SQFT');
    if (formData.show_price_per_box) columns.push('Price/Box');
    if (formData.show_amount) columns.push('Amount');
    if (formData.show_margin) columns.push('Margin');
    return columns;
  };

  const getActiveColumnsCount = () => {
    let count = 3; // Always visible: Name, Size, Surface
    if (formData.show_sqft_in_box) count++;
    if (formData.show_sqft_needed) count++;
    if (formData.show_box_needed) count++;
    if (formData.show_price_per_sqft) count++;
    if (formData.show_price_per_box) count++;
    if (formData.show_amount) count++;
    if (formData.show_margin) count++;
    return count;
  };

  // Move item up/down within a room
  const moveItemInRoom = (roomIdx: number, itemIdx: number, direction: number) => {
    const updatedRooms = [...formData.rooms];
    const items = [...updatedRooms[roomIdx].items];
    const newIndex = itemIdx + direction;
    if (newIndex < 0 || newIndex >= items.length) return;
    [items[itemIdx], items[newIndex]] = [items[newIndex], items[itemIdx]];
    updatedRooms[roomIdx].items = items;
    setFormData(prev => ({ ...prev, rooms: recalculateRoomTotals(updatedRooms) }));
  };

  // Move item to another room
  const moveItemToRoom = (fromRoomIdx: number, itemIdx: number, toRoomIdx: number) => {
    if (fromRoomIdx === toRoomIdx) return;
    const updatedRooms = [...formData.rooms];
    const [item] = updatedRooms[fromRoomIdx].items.splice(itemIdx, 1);
    updatedRooms[toRoomIdx].items.push(item);
    setFormData(prev => ({ ...prev, rooms: recalculateRoomTotals(updatedRooms) }));
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Loading customers and products...</p>
      </div>
    );
  }

  const totals = calculateTotals();

  return (
    <div className="space-y-8">
      {/* Customer Selection */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center space-x-2">
          <User className="w-5 h-5" />
          <span>Select Customer</span>
        </h3>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <select
            value={formData.customer_id}
            onChange={(e) => handleInputChange('customer_id', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select a customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name} {customer.email && `(${customer.email})`}
              </option>
            ))}
          </select>
          
          {formData.customer_id && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              {(() => {
                const selectedCustomer = customers.find(c => c.id === formData.customer_id);
                return selectedCustomer ? (
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Building className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">{selectedCustomer.name}</span>
                      </div>
                      {selectedCustomer.email && (
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-blue-600" />
                          <span>{selectedCustomer.email}</span>
                        </div>
                      )}
                      {selectedCustomer.phone && (
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-blue-600" />
                          <span>{selectedCustomer.phone}</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      {selectedCustomer.gst_number && (
                        <div>
                          <span className="font-medium text-blue-800">GST:</span> {selectedCustomer.gst_number}
                        </div>
                      )}
                      {selectedCustomer.site_address && (
                        <div className="flex items-start space-x-2">
                          <MapPin className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{selectedCustomer.site_address}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : null;
              })()}
            </div>
          )}
        </div>
      </div>

      {/* Quotation Type */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4">Quotation Organization</h3>
      
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
            formData.is_area_wise 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}>
            <input
              type="radio"
              id="area-wise"
              name="quotation_type"
              checked={formData.is_area_wise}
              onChange={() => handleQuotationTypeChange(true)}
              className="sr-only"
            />
            <label htmlFor="area-wise" className="cursor-pointer">
              <div className="flex items-center space-x-3">
                <Building className="w-6 h-6 text-blue-600" />
                <div>
                  <div className="font-medium text-gray-900">Area-wise Organization</div>
                  <div className="text-sm text-gray-500">Organize products by rooms/areas (Living Room, Kitchen, etc.)</div>
                </div>
              </div>
            </label>
          </div>

          <div className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
            !formData.is_area_wise 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}>
            <input
              type="radio"
              id="general-list"
              name="quotation_type"
              checked={!formData.is_area_wise}
              onChange={() => handleQuotationTypeChange(false)}
              className="sr-only"
            />
            <label htmlFor="general-list" className="cursor-pointer">
              <div className="flex items-center space-x-3">
                <Package className="w-6 h-6 text-green-600" />
                <div>
                  <div className="font-medium text-gray-900">General Product List</div>
                  <div className="text-sm text-gray-500">Simple list of all products without room categorization</div>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Column Visibility Settings - Collapsible */}
      <div>
        <button
          onClick={() => setIsColumnVisibilityExpanded(!isColumnVisibilityExpanded)}
          className="w-full flex items-center justify-between text-lg font-medium text-gray-800 mb-4 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          <div className="flex items-center space-x-2">
            <Eye className="w-5 h-5" />
            <span>Column Visibility Settings</span>
            <span className="text-sm font-normal text-gray-500">
              ({getActiveColumnsCount()} columns active)
            </span>
          </div>
          {isColumnVisibilityExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </button>
        
        {isColumnVisibilityExpanded && (
          <div className="bg-white border border-gray-200 rounded-lg p-6 border-t-0 rounded-t-none">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {/* SQFT in Box Type Selection */}
              <div className="col-span-full mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SQFT in Box Type
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="sqft_in_box_type"
                      value="actual"
                      checked={formData.sqft_in_box_type === 'actual'}
                      onChange={(e) => handleInputChange('sqft_in_box_type', e.target.value)}
                      className="mr-2"
                    />
                    Actual SQFT
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="sqft_in_box_type"
                      value="billed"
                      checked={formData.sqft_in_box_type === 'billed'}
                      onChange={(e) => handleInputChange('sqft_in_box_type', e.target.value)}
                      className="mr-2"
                    />
                    Billed SQFT
                  </label>
                </div>
              </div>

              {/* Column Visibility Checkboxes */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="show_sqft_in_box"
                  checked={formData.show_sqft_in_box}
                  onChange={(e) => handleInputChange('show_sqft_in_box', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="show_sqft_in_box" className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  {formData.show_sqft_in_box ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  <span>SQFT in Box</span>
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="show_sqft_needed"
                  checked={formData.show_sqft_needed}
                  onChange={(e) => handleInputChange('show_sqft_needed', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="show_sqft_needed" className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  {formData.show_sqft_needed ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  <span>SQFT Needed</span>
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="show_box_needed"
                  checked={formData.show_box_needed}
                  onChange={(e) => handleInputChange('show_box_needed', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="show_box_needed" className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  {formData.show_box_needed ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  <span>Quantity</span>
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="show_price_per_sqft"
                  checked={formData.show_price_per_sqft}
                  onChange={(e) => handleInputChange('show_price_per_sqft', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="show_price_per_sqft" className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  {formData.show_price_per_sqft ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  <span>Price per SQFT</span>
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="show_price_per_box"
                  checked={formData.show_price_per_box}
                  onChange={(e) => handleInputChange('show_price_per_box', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="show_price_per_box" className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  {formData.show_price_per_box ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  <span>Price per Box</span>
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="show_amount"
                  checked={formData.show_amount}
                  onChange={(e) => handleInputChange('show_amount', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="show_amount" className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  {formData.show_amount ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  <span>Amount</span>
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="show_margin"
                  checked={formData.show_margin}
                  onChange={(e) => handleInputChange('show_margin', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="show_margin" className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  {formData.show_margin ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  <span>Margin</span>
                </label>
              </div>
            </div>

            {/* Live Preview */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-2">Column Preview</h4>
              <div className="flex flex-wrap gap-2">
                {getVisibleColumnsPreview().map((column, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    {column}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Products Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center space-x-2">
          <Package className="w-5 h-5" />
          <span>Add Products to {formData.is_area_wise ? 'Rooms' : 'Quotation'}</span>
        </h3>

        {/* Product Selection Interface */}
        <div className="mb-6 space-y-4">
          {selectedDesignNameForGuidedSelection ? (
            /* Show Cascading Selector with pre-selected design name */
            <CascadingProductSelector 
              onProductSelect={handleProductSelect}
              initialDesignName={selectedDesignNameForGuidedSelection}
              onResetInitialSelection={handleResetInitialSelection}
              className="bg-white border border-gray-200 rounded-lg p-6"
            />
          ) : (
            /* Show Product Search Input */
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search for a product to get started..."
                  value={productSearch}
                  onChange={handleSearchInputChange}
                  onKeyDown={handleSearchKeyDown}
                  onFocus={() => {
                    if (productSearch.trim() && filteredDesignNames.length > 0) {
                      setShowProductDropdown(true);
                    }
                  }}
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
                {searchLoading && (
                  <Loader className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 animate-spin" />
                )}
                
                {/* Autocomplete Dropdown */}
                {showProductDropdown && (
                  <div 
                    ref={dropdownRef}
                    className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto"
                  >
                    {searchLoading ? (
                      <div className="p-4 text-center">
                        <Loader className="w-5 h-5 animate-spin mx-auto mb-2 text-blue-600" />
                        <span className="text-sm text-gray-600">Searching products...</span>
                      </div>
                    ) : filteredDesignNames.length > 0 ? (
                      <div className="py-2">
                        {filteredDesignNames.map((designName, index) => (
                          <div
                            key={designName}
                            className={`px-4 py-3 cursor-pointer transition-colors duration-150 ${
                              index === selectedProductIndex 
                                ? 'bg-blue-50 border-l-4 border-blue-500' 
                                : 'hover:bg-gray-50'
                            }`}
                            onClick={() => handleDesignNameSelect(designName)}
                            onMouseEnter={() => setSelectedProductIndex(index)}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-gray-900">
                                  {designName}
                                </div>
                                <div className="text-sm text-gray-600">
                                  Click to see available sizes and surfaces
                                </div>
                              </div>
                              <div className="text-blue-600">
                                <ArrowRight className="w-4 h-4" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : productSearch.trim() && !searchLoading ? (
                      <div className="p-4 text-center text-gray-500">
                        <Package className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <div>No products found for "{productSearch}"</div>
                        <div className="text-sm mt-1">Try a different search term</div>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
              
              <p className="text-sm text-gray-500 mt-2">
                Start typing to search for products by name. Select a product to see available sizes and surfaces.
              </p>
            </div>
          )}
        </div>

        {/* Rooms/Products Display */}
        <div className="space-y-6">
          {formData.rooms.map((room, roomIndex) => (
            <div key={roomIndex} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {formData.is_area_wise ? (
                    <input
                      type="text"
                      value={room.room_name}
                      onChange={(e) => updateRoomName(roomIndex, e.target.value)}
                      className="text-lg font-medium bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
                    />
                  ) : (
                    <h4 className="text-lg font-medium text-gray-800">{room.room_name}</h4>
                  )}
                </div>
                
                {formData.is_area_wise && formData.rooms.length > 1 && (
                  <button
                    onClick={() => removeRoom(roomIndex)}
                    className="text-red-600 hover:text-red-800 transition-colors duration-150"
                    title="Remove Room"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Only show table if there are items */}
              {room.items.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Surface</th>
                        {formData.show_sqft_in_box && (
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            SQFT in Box ({formData.sqft_in_box_type})
                          </th>
                        )}
                        {formData.show_sqft_needed && (
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SQFT Needed</th>
                        )}
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount (%)</th>
                        {formData.show_price_per_sqft && (
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price/SQFT</th>
                        )}
                        {formData.show_price_per_box && (
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price/Box</th>
                        )}
                        {formData.show_amount && (
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        )}
                        {formData.show_margin && (
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Margin</th>
                        )}
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {room.items.map((item, itemIndex) => (
                        <tr key={itemIndex} className="hover:bg-gray-50">
                          <td className="px-4 py-2 text-sm text-gray-900">{item.product?.name || item.name}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{item.product?.size}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{item.product?.surface || '-'}</td>
                          {formData.show_sqft_in_box && (
                            <td className="px-4 py-2 text-sm text-gray-900">
                              {formData.sqft_in_box_type === 'actual' 
                                ? item.product?.actual_sqft_per_box.toFixed(2)
                                : item.product?.billed_sqft_per_box.toFixed(2)
                              }
                            </td>
                          )}
                          {formData.show_sqft_needed && (
                            <td className="px-4 py-2">
                              <input
                                type="number"
                                value={item.sqft_needed}
                                onChange={(e) => updateItemSqftNeeded(roomIndex, itemIndex, parseFloat(e.target.value) || 0)}
                                className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                min="0"
                                step="0.01"
                              />
                            </td>
                          )}
                          <td className="px-4 py-2">
                            <input
                              type="number"
                              value={item.quantity_boxes}
                              onChange={(e) => updateItemQuantity(roomIndex, itemIndex, parseFloat(e.target.value) || 1)}
                              className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              min="1"
                              step="1"
                            />
                          </td>
                          <td className="px-4 py-2">
                            <input
                              type="number"
                              value={item.discount_percentage}
                              onChange={(e) => updateItemDiscount(roomIndex, itemIndex, parseFloat(e.target.value) || 0)}
                              className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              min="0"
                              max="100"
                              step="0.1"
                            />
                          </td>
                          {formData.show_price_per_sqft && (
                            <td className="px-4 py-2 text-sm text-gray-900">₹{item.rate_per_sqft.toFixed(2)}</td>
                          )}
                          {formData.show_price_per_box && (
                            <td className="px-4 py-2 text-sm text-gray-900">₹{item.mrp_per_box.toFixed(2)}</td>
                          )}
                          {formData.show_amount && (
                            <td className="px-4 py-2 text-sm text-gray-900">₹{item.amount.toFixed(2)}</td>
                          )}
                          {formData.show_margin && (
                            <td className="px-4 py-2 text-sm text-gray-900">
                              <div className="text-xs">
                                <div>₹{item.margin_amount.toFixed(2)}</div>
                                <div className="text-gray-500">({item.margin_percentage.toFixed(1)}%)</div>
                              </div>
                            </td>
                          )}
                          <td className="px-4 py-2 flex items-center gap-2">
                            {/* Reorder buttons */}
                            <button
                              onClick={() => moveItemInRoom(roomIndex, itemIndex, -1)}
                              disabled={itemIndex === 0}
                              className="text-gray-500 hover:text-blue-600 disabled:opacity-30"
                              title="Move Up"
                            >
                              <ChevronUp className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => moveItemInRoom(roomIndex, itemIndex, 1)}
                              disabled={itemIndex === room.items.length - 1}
                              className="text-gray-500 hover:text-blue-600 disabled:opacity-30"
                              title="Move Down"
                            >
                              <ChevronDown className="w-4 h-4" />
                            </button>
                            {/* Move to another room */}
                            <select
                              value={roomIndex}
                              onChange={e => moveItemToRoom(roomIndex, itemIndex, parseInt(e.target.value))}
                              className="ml-2 border rounded px-1 py-0.5 text-xs"
                              title="Move to Room"
                            >
                              {formData.rooms.map((r, idx) => (
                                <option key={idx} value={idx}>{r.room_name}</option>
                              ))}
                            </select>
                            {/* Remove button */}
                            <button
                              onClick={() => removeItem(roomIndex, itemIndex)}
                              className="text-red-600 hover:text-red-800 transition-colors duration-150 ml-2"
                              title="Remove Item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                /* Empty state - no table shown */
                <div className="text-center py-8 text-gray-500">
                  <Package className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p>No products added to this {formData.is_area_wise ? 'room' : 'quotation'} yet.</p>
                  <p className="text-sm mt-1">Use the search above to add products.</p>
                </div>
              )}
            </div>
          ))}

          {formData.is_area_wise && (
            <button
              onClick={addRoom}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <Plus className="w-6 h-6 mx-auto mb-2" />
              <span>Add Another Room</span>
            </button>
          )}
        </div>
      </div>

      {/* Enhanced Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
        <h4 className="font-medium text-blue-800 mb-6 flex items-center space-x-2">
          <Calculator className="w-5 h-5" />
          <span>Quotation Summary</span>
        </h4>
        
        <div className="grid md:grid-cols-5 gap-6">
          <div className="text-center">
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <Package className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-800">
                {totals.total_products}
              </div>
              <div className="text-sm text-blue-600">Total Products</div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <Box className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-800">
                {totals.total_boxes}
              </div>
              <div className="text-sm text-green-600">Total Boxes</div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <Weight className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-800">
                {totals.total_weight.toFixed(1)} kg
              </div>
              <div className="text-sm text-purple-600">Total Weight</div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <DollarSign className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-800">
                ₹{totals.total_amount.toFixed(2)}
              </div>
              <div className="text-sm text-orange-600">Total Amount</div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <TrendingUp className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-emerald-800">
                ₹{totals.total_margin_amount.toFixed(2)}
              </div>
              <div className="text-sm text-emerald-600">
                Profit ({totals.total_margin_percentage.toFixed(1)}%)
              </div>
            </div>
          </div>
        </div>

        {/* Additional Summary Info */}
        <div className="mt-6 pt-6 border-t border-blue-200">
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h5 className="font-medium text-blue-800 mb-2">Cost Breakdown</h5>
              <div className="space-y-1 text-blue-700">
                <div className="flex justify-between">
                  <span>Total Selling Price:</span>
                  <span>₹{totals.total_amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Cost Price:</span>
                  <span>₹{(totals.total_amount - totals.total_margin_amount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium border-t border-blue-200 pt-1">
                  <span>Net Profit:</span>
                  <span>₹{totals.total_margin_amount.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="font-medium text-blue-800 mb-2">Settings Applied</h5>
              <div className="space-y-1 text-blue-700">
                <div className="flex justify-between">
                  <span>Company Discount:</span>
                  <span>{settings.companyDiscount}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Freight per SQFT:</span>
                  <span>₹{settings.freightPerSqft}</span>
                </div>
                <div className="flex justify-between">
                  <span>SQFT Type:</span>
                  <span className="capitalize">{formData.sqft_in_box_type}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between pt-6 border-t border-gray-200">
        <button
          onClick={onCancel}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          Cancel
        </button>
        
        <button
          onClick={handleNext}
          className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <span>Next: Export Settings</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default QuotationStep1;