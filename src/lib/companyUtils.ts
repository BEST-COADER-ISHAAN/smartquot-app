import { supabase } from './supabase';
import { getUserSettings } from './api';

export interface CompanyDetails {
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  gstNo: string;
  logo: string;
}

export interface CompanyDetailsPreferences {
  includeCompanyName: boolean;
  includeAddress: boolean;
  includePhone: boolean;
  includeEmail: boolean;
  includeGst: boolean;
  includeLogo: boolean;
}

export interface QuotationCompanyDetails {
  companyName?: string;
  companyAddress?: string;
  companyPhone?: string;
  companyEmail?: string;
  gstNo?: string;
  logo?: string;
}

// Helper to get current user ID (async)
async function getCurrentUserIdAsync() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user?.id || null;
  } catch (error) {
    return null;
  }
}

// Async: Get company details from Supabase user_settings
export async function getCompanyDetailsAsync() {
  const userId = await getCurrentUserIdAsync();
  if (!userId) {
    // fallback to localStorage or defaults
    return {
      companyName: localStorage.getItem('company_name') || 'Your Company Name',
      companyAddress: localStorage.getItem('company_address') || 'Your Company Address',
      companyPhone: localStorage.getItem('company_phone') || '+91-0000000000',
      companyEmail: localStorage.getItem('company_email') || 'info@yourcompany.com',
      gstNo: localStorage.getItem('gst_no') || '',
      logo: localStorage.getItem('logo') || '',
    };
  }
  const settings = await getUserSettings(userId);
  return {
    companyName: settings?.company_name || 'Your Company Name',
    companyAddress: settings?.company_address || 'Your Company Address',
    companyPhone: settings?.company_phone || '+91-0000000000',
    companyEmail: settings?.company_email || 'info@yourcompany.com',
    gstNo: settings?.gst_no || '',
    logo: settings?.logo || '',
  };
}

// Async: Get company details preferences from Supabase user_settings
export async function getCompanyDetailsPreferencesAsync() {
  const userId = await getCurrentUserIdAsync();
  if (!userId) {
    // fallback to localStorage or defaults
    return {
      includeCompanyName: localStorage.getItem('include_company_name') !== 'false',
      includeAddress: localStorage.getItem('include_address') !== 'false',
      includePhone: localStorage.getItem('include_phone') !== 'false',
      includeEmail: localStorage.getItem('include_email') !== 'false',
      includeGst: localStorage.getItem('include_gst') !== 'false',
      includeLogo: localStorage.getItem('include_logo') !== 'false',
    };
  }
  const settings = await getUserSettings(userId);
  return {
    includeCompanyName: settings?.include_company_name !== false,
    includeAddress: settings?.include_address !== false,
    includePhone: settings?.include_phone !== false,
    includeEmail: settings?.include_email !== false,
    includeGst: settings?.include_gst !== false,
    includeLogo: settings?.include_logo !== false,
  };
}

// Synchronous fallback for legacy code (returns defaults)
export function getCompanyDetails() {
  return {
    companyName: 'Your Company Name',
    companyAddress: 'Your Company Address',
    companyPhone: '+91-0000000000',
    companyEmail: 'info@yourcompany.com',
    gstNo: '',
    logo: '',
  };
}

export function getCompanyDetailsPreferences() {
  return {
    includeCompanyName: true,
    includeAddress: true,
    includePhone: true,
    includeEmail: true,
    includeGst: true,
    includeLogo: true,
  };
}

// Get company details for quotation (async, always use current details)
export const getQuotationCompanyDetailsAsync = async (): Promise<QuotationCompanyDetails> => {
  const companyDetails = await getCompanyDetailsAsync();
  const preferences = await getCompanyDetailsPreferencesAsync();
  const quotationDetails: QuotationCompanyDetails = {};
  if (preferences.includeCompanyName && companyDetails.companyName && companyDetails.companyName.trim() !== '') {
    quotationDetails.companyName = companyDetails.companyName;
  }
  if (preferences.includeAddress && companyDetails.companyAddress && companyDetails.companyAddress.trim() !== '') {
    quotationDetails.companyAddress = companyDetails.companyAddress;
  }
  if (preferences.includePhone && companyDetails.companyPhone && companyDetails.companyPhone.trim() !== '') {
    quotationDetails.companyPhone = companyDetails.companyPhone;
  }
  if (preferences.includeEmail && companyDetails.companyEmail && companyDetails.companyEmail.trim() !== '') {
    quotationDetails.companyEmail = companyDetails.companyEmail;
  }
  if (preferences.includeGst && companyDetails.gstNo && companyDetails.gstNo.trim() !== '') {
    quotationDetails.gstNo = companyDetails.gstNo;
  }
  if (preferences.includeLogo && companyDetails.logo && companyDetails.logo.trim() !== '') {
    quotationDetails.logo = companyDetails.logo;
  }
  return quotationDetails;
};

// Get company details from quotation (async, always use current details)
export const getCompanyDetailsFromQuotationAsync = async (quotation: any): Promise<QuotationCompanyDetails> => {
  return getQuotationCompanyDetailsAsync();
};

// Get the current user's company_slug (async)
export async function getCurrentCompanySlugAsync() {
  const userId = await getCurrentUserIdAsync();
  if (!userId) return null;
  const settings = await getUserSettings(userId);
  return settings?.company_slug || null;
} 