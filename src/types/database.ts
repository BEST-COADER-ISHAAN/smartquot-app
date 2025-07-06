export interface Database {
  public: {
    Tables: {
      customers: {
        Row: {
          id: string;
          name: string;
          email: string | null;
          phone: string | null;
          gst_number: string | null;
          site_address: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
          created_by: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          email?: string | null;
          phone?: string | null;
          gst_number?: string | null;
          site_address?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
          created_by?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string | null;
          phone?: string | null;
          gst_number?: string | null;
          site_address?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
          created_by?: string | null;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          size: string;
          collection: string | null;
          surface: string | null;
          ex_factory_price: number;
          mrp_per_sqft: number;
          mrp_per_box: number;
          gst_percentage: number | null;
          insurance_percentage: number | null;
          actual_sqft_per_box: number;
          billed_sqft_per_box: number;
          weight: number;
          freight: number;
          is_archived: boolean | null;
          image_url: string | null;
          created_at: string;
          updated_at: string;
          created_by: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          size: string;
          collection?: string | null;
          surface?: string | null;
          ex_factory_price?: number;
          mrp_per_sqft?: number;
          mrp_per_box?: number;
          gst_percentage?: number | null;
          insurance_percentage?: number | null;
          actual_sqft_per_box?: number;
          billed_sqft_per_box?: number;
          weight?: number;
          freight?: number;
          is_archived?: boolean | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
          created_by?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          size?: string;
          collection?: string | null;
          surface?: string | null;
          ex_factory_price?: number;
          mrp_per_sqft?: number;
          mrp_per_box?: number;
          gst_percentage?: number | null;
          insurance_percentage?: number | null;
          actual_sqft_per_box?: number;
          billed_sqft_per_box?: number;
          weight?: number;
          freight?: number;
          is_archived?: boolean | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
          created_by?: string | null;
        };
      };
      quotations: {
        Row: {
          id: string;
          quotation_number: string;
          customer_id: string | null;
          status: 'draft' | 'sent' | 'approved' | 'rejected' | null;
          total_amount: number | null;
          total_margin_amount: number | null;
          total_margin_percentage: number | null;
          terms_conditions: string | null;
          notes: string | null;
          include_images: boolean | null;
          export_type: string | null;
          pdf_template: string | null;
          link_template: string | null;
          is_area_wise: boolean | null;
          created_at: string;
          updated_at: string;
          created_by: string | null;
          // Global column visibility controls (moved from quotation_room_items)
          sqft_in_box_type: string | null;
          show_sqft_in_box: boolean | null;
          show_sqft_needed: boolean | null;
          show_box_needed: boolean | null;
          show_price_per_sqft: boolean | null;
          show_price_per_box: boolean | null;
          show_amount: boolean | null;
          show_margin: boolean | null;
        };
        Insert: {
          id?: string;
          quotation_number?: string;
          customer_id?: string | null;
          status?: 'draft' | 'sent' | 'approved' | 'rejected' | null;
          total_amount?: number | null;
          total_margin_amount?: number | null;
          total_margin_percentage?: number | null;
          terms_conditions?: string | null;
          notes?: string | null;
          include_images?: boolean | null;
          export_type?: string | null;
          pdf_template?: string | null;
          link_template?: string | null;
          is_area_wise?: boolean | null;
          created_at?: string;
          updated_at?: string;
          created_by?: string | null;
          // Global column visibility controls
          sqft_in_box_type?: string | null;
          show_sqft_in_box?: boolean | null;
          show_sqft_needed?: boolean | null;
          show_box_needed?: boolean | null;
          show_price_per_sqft?: boolean | null;
          show_price_per_box?: boolean | null;
          show_amount?: boolean | null;
          show_margin?: boolean | null;
        };
        Update: {
          id?: string;
          quotation_number?: string;
          customer_id?: string | null;
          status?: 'draft' | 'sent' | 'approved' | 'rejected' | null;
          total_amount?: number | null;
          total_margin_amount?: number | null;
          total_margin_percentage?: number | null;
          terms_conditions?: string | null;
          notes?: string | null;
          include_images?: boolean | null;
          export_type?: string | null;
          pdf_template?: string | null;
          link_template?: string | null;
          is_area_wise?: boolean | null;
          created_at?: string;
          updated_at?: string;
          created_by?: string | null;
          // Global column visibility controls
          sqft_in_box_type?: string | null;
          show_sqft_in_box?: boolean | null;
          show_sqft_needed?: boolean | null;
          show_box_needed?: boolean | null;
          show_price_per_sqft?: boolean | null;
          show_price_per_box?: boolean | null;
          show_amount?: boolean | null;
          show_margin?: boolean | null;
        };
      };
      quotation_rooms: {
        Row: {
          id: string;
          quotation_id: string | null;
          room_name: string;
          room_total: number | null;
          room_margin_amount: number | null;
          room_margin_percentage: number | null;
          sort_order: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          quotation_id?: string | null;
          room_name: string;
          room_total?: number | null;
          room_margin_amount?: number | null;
          room_margin_percentage?: number | null;
          sort_order?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          quotation_id?: string | null;
          room_name?: string;
          room_total?: number | null;
          room_margin_amount?: number | null;
          room_margin_percentage?: number | null;
          sort_order?: number | null;
          created_at?: string;
        };
      };
      quotation_room_items: {
        Row: {
          id: string;
          room_id: string | null;
          product_id: string | null;
          quantity_boxes: number;
          rate_per_sqft: number;
          mrp_per_box: number;
          amount: number | null;
          margin_amount: number | null;
          margin_percentage: number | null;
          sort_order: number | null;
          created_at: string;
          // Enhanced fields (column visibility controls removed)
          sqft_needed: number;
          box_needed: number;
          discount_percentage: number;
          price_per_sqft_override: number | null;
          price_per_box_override: number | null;
        };
        Insert: {
          id?: string;
          room_id?: string | null;
          product_id?: string | null;
          quantity_boxes?: number;
          rate_per_sqft?: number;
          mrp_per_box?: number;
          amount?: number | null;
          margin_amount?: number | null;
          margin_percentage?: number | null;
          sort_order?: number | null;
          created_at?: string;
          // Enhanced fields
          sqft_needed?: number;
          box_needed?: number;
          discount_percentage?: number;
          price_per_sqft_override?: number | null;
          price_per_box_override?: number | null;
        };
        Update: {
          id?: string;
          room_id?: string | null;
          product_id?: string | null;
          quantity_boxes?: number;
          rate_per_sqft?: number;
          mrp_per_box?: number;
          amount?: number | null;
          margin_amount?: number | null;
          margin_percentage?: number | null;
          sort_order?: number | null;
          created_at?: string;
          // Enhanced fields
          sqft_needed?: number;
          box_needed?: number;
          discount_percentage?: number;
          price_per_sqft_override?: number | null;
          price_per_box_override?: number | null;
        };
      };
    };
  };
}