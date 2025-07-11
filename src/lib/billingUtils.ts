import { supabase } from './supabase';
// Utility functions for handling billing types (per sqft vs per piece)

export type BillingType = 'per_sqft' | 'per_piece';

// Get billing type for a specific size from Supabase
export const getBillingTypeForSize = async (userId: string, size: string): Promise<BillingType> => {
  try {
    if (!userId) return 'per_sqft';
    const { data, error } = await supabase
      .from('billing_types')
      .select('billing_type')
      .eq('user_id', userId)
      .eq('size', size)
      .single();
    if (error || !data || !data.billing_type) return 'per_sqft';
    return data.billing_type as BillingType;
  } catch (error) {
    return 'per_sqft';
  }
};

// Get all billing types mapping
export function getBillingTypeMap(): Record<string, string> {
  // return JSON.parse(localStorage.getItem('billing_types') || '{}');
  return {};
}

// Format display text based on billing type
export const formatBillingDisplay = (value: number, billingType: BillingType, unit?: string): string => {
  if (billingType === 'per_piece') {
    return `${value} ${unit || 'Pcs'}`;
  }
  return `${value} ${unit || 'sqft'}`;
};

// Format price display based on billing type
export const formatPriceDisplay = (price: number, billingType: BillingType): string => {
  if (billingType === 'per_piece') {
    return `₹${price.toFixed(2)}/Pcs`;
  }
  return `₹${price.toFixed(2)}/sqft`;
};

// Calculate pieces in box for per_piece billing
export const calculatePiecesInBox = (actualSqftPerBox: number, billedSqftPerBox: number, billingType: BillingType): number => {
  if (billingType === 'per_piece') {
    // For per piece billing, we need to calculate how many pieces fit in a box
    // This is a simplified calculation - you might need to adjust based on your specific requirements
    return Math.round(billedSqftPerBox); // Assuming 1 piece = 1 sqft for now
  }
  return 0; // Not applicable for per_sqft billing
};

// Get the appropriate sqft value based on billing type
export const getSqftValue = (actualSqft: number, billedSqft: number, billingType: BillingType, sqftType: 'actual' | 'billed'): number => {
  if (billingType === 'per_piece') {
    // For per piece billing, return pieces instead of sqft
    const sqftValue = sqftType === 'actual' ? actualSqft : billedSqft;
    return calculatePiecesInBox(actualSqft, billedSqft, billingType);
  }
  // For per_sqft billing, return the appropriate sqft value
  return sqftType === 'actual' ? actualSqft : billedSqft;
};

// Get the appropriate price value based on billing type
export const getPriceValue = (pricePerSqft: number, pricePerBox: number, billingType: BillingType): number => {
  if (billingType === 'per_piece') {
    // For per piece billing, we need to calculate price per piece
    // This is a simplified calculation - you might need to adjust based on your specific requirements
    return pricePerSqft; // Assuming price per piece = price per sqft for now
  }
  return pricePerSqft;
};

// Get the appropriate freight value based on billing type
export const getFreightValue = (freightPerSqft: number, billingType: BillingType): number => {
  if (billingType === 'per_piece') {
    // For per piece billing, freight per piece
    return freightPerSqft; // Assuming freight per piece = freight per sqft for now
  }
  return freightPerSqft;
};

// Get column header text based on billing type
export const getColumnHeader = (baseHeader: string, billingType: BillingType): string => {
  if (billingType === 'per_piece') {
    const headerMap: Record<string, string> = {
      'SQFT in Box': 'Pieces in Box',
      'Price per sqft': 'Price per Piece',
      'MRP per sqft': 'MRP per Piece',
      'Ex-Factory Price per sqft': 'Ex-Factory Price per Piece',
      'Freight per sqft': 'Freight per Piece'
    };
    return headerMap[baseHeader] || baseHeader;
  }
  return baseHeader;
};

// Get unit text based on billing type
export const getUnitText = (billingType: BillingType): string => {
  return billingType === 'per_piece' ? 'Pcs' : 'sqft';
};

// Remove or update isPerPieceBilling to be async and accept userId
export const isPerPieceBilling = async (userId: string, size: string): Promise<boolean> => {
  return (await getBillingTypeForSize(userId, size)) === 'per_piece';
}; 