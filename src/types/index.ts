export interface Quote {
  id: string;
  customer: string;
  date: string;
  amount: number;
  margin: number;
  status: 'draft' | 'sent' | 'approved' | 'rejected';
}

export interface Product {
  id: string;
  name: string;
  price: number;
  unitsSold: number;
  revenue: number;
  category: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  totalQuotes: number;
  totalValue: number;
}

export interface MarginData {
  month: string;
  margin: number;
  revenue: number;
}

// New types for the quotation system
export interface QuotationCustomer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  gst_number?: string;
  site_address?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface QuotationProduct {
  id: string;
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
  is_archived: boolean;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface QuotationRoomItem {
  id: string;
  room_id: string;
  product_id: string;
  product?: QuotationProduct;
  quantity_boxes: number;
  rate_per_sqft: number;
  mrp_per_box: number;
  amount: number;
  margin_amount: number;
  margin_percentage: number;
  sort_order: number;
  // Enhanced fields (no longer include column visibility controls)
  sqft_needed: number;
  box_needed: number;
  discount_percentage: number;
  price_per_sqft_override?: number;
  price_per_box_override?: number;
}

export interface QuotationRoom {
  id: string;
  quotation_id: string;
  room_name: string;
  room_total: number;
  room_margin_amount: number;
  room_margin_percentage: number;
  sort_order: number;
  items: QuotationRoomItem[];
}

export interface Quotation {
  id: string;
  quotation_number: string;
  customer_id?: string;
  customer?: QuotationCustomer;
  status: 'draft' | 'sent' | 'approved' | 'rejected';
  total_amount: number;
  total_margin_amount: number;
  total_margin_percentage: number;
  terms_conditions?: string;
  notes?: string;
  include_images?: boolean;
  export_type?: 'pdf' | 'link' | 'both';
  pdf_template?: string;
  link_template?: string;
  is_area_wise?: boolean;
  created_at: string;
  updated_at: string;
  rooms: QuotationRoom[];
  // Global column visibility controls (moved from individual items)
  sqft_in_box_type: 'actual' | 'billed';
  show_sqft_in_box: boolean;
  show_sqft_needed: boolean;
  show_box_needed: boolean;
  show_price_per_sqft: boolean;
  show_price_per_box: boolean;
  show_amount: boolean;
  show_margin: boolean;
}