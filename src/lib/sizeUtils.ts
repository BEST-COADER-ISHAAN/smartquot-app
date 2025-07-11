// Size formatting utilities
import { supabase } from './supabase';

export interface SizeFormat {
  id?: string;
  original_size: string;
  mm_format: string;
  inch_format: string;
  feet_format: string;
  custom_format: string;
}

let cachedSizeFormats: SizeFormat[] | null = null;

export async function getSizeFormats(): Promise<SizeFormat[]> {
  if (cachedSizeFormats) return cachedSizeFormats;
  // Get the current user directly from supabase.auth
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id;
  if (!userId) return [];
  const { data, error } = await supabase
    .from('size_format_mappings')
    .select('*')
    .eq('user_id', userId);
  if (error) {
    return [];
  }
  // Map to expected format
  cachedSizeFormats = (data || []).map((f: any) => ({
    id: `format_${f.size}`,
    original_size: f.size,
    mm_format: f.mm_format,
    inch_format: f.inch_format,
    feet_format: f.feet_format,
    custom_format: f.custom_format,
  }));
  return cachedSizeFormats;
}

export function clearSizeFormatsCache() {
  cachedSizeFormats = null;
}

// getPreferredSizeUnit removed; pass preferredUnit as parameter

// Convert mm dimensions to inches
export const convertMmToInch = (size: string): string => {
  const parts = size.split('X');
  if (parts.length >= 2) {
    const width = parseFloat(parts[0]);
    const height = parseFloat(parts[1]);
    const thickness = parts[2] ? parseFloat(parts[2]) : 0;
    
    if (!isNaN(width) && !isNaN(height)) {
      const widthInch = (width / 25.4).toFixed(1);
      const heightInch = (height / 25.4).toFixed(1);
      const thicknessInch = thickness > 0 ? (thickness / 25.4).toFixed(2) : '';
      
      return `${widthInch}"X${heightInch}"${thicknessInch ? `X${thicknessInch}"` : ''}`;
    }
  }
  return size;
};

// Convert mm dimensions to feet
export const convertMmToFeet = (size: string): string => {
  const parts = size.split('X');
  if (parts.length >= 2) {
    const width = parseFloat(parts[0]);
    const height = parseFloat(parts[1]);
    const thickness = parts[2] ? parseFloat(parts[2]) : 0;
    
    if (!isNaN(width) && !isNaN(height)) {
      const widthFeet = (width / 304.8).toFixed(2);
      const heightFeet = (height / 304.8).toFixed(2);
      const thicknessInch = thickness > 0 ? (thickness / 25.8).toFixed(2) : '';
      
      return `${widthFeet}'X${heightFeet}'${thicknessInch ? `X${thicknessInch}"` : ''}`;
    }
  }
  return size;
};

// Format size based on preferred unit (async)
export async function formatSize(originalSize: string, preferredUnit: 'inches' | 'mm' | 'feet' | 'custom'): Promise<string> {
  const sizeFormats = await getSizeFormats();
  // Find matching format for this size
  const matchingFormat = sizeFormats.find(format => format.original_size === originalSize);
  if (matchingFormat) {
    switch (preferredUnit) {
      case 'mm':
        return matchingFormat.mm_format;
      case 'inches':
        return matchingFormat.inch_format;
      case 'feet':
        return matchingFormat.feet_format;
      case 'custom':
        return matchingFormat.custom_format;
      default:
        return originalSize;
    }
  }
  // If no matching format found, convert on-the-fly
  switch (preferredUnit) {
    case 'inches':
      return convertMmToInch(originalSize);
    case 'feet':
      return convertMmToFeet(originalSize);
    case 'mm':
    default:
      return originalSize;
  }
}

// Format size for display with unit labels (async)
export async function formatSizeForDisplay(size: string | null | undefined, preferredUnit: 'inches' | 'mm' | 'feet' | 'custom'): Promise<string> {
  if (!size || typeof size !== 'string') return '';
  const formatted = await formatSize(size, preferredUnit);
  if (!formatted || typeof formatted !== 'string') return '';
  switch (preferredUnit) {
    case 'inches':
      return formatted.replace(/X/g, ' × ');
    case 'feet':
      return formatted.replace(/X/g, ' × ');
    case 'mm':
      return formatted.replace(/X/g, ' × ') + ' mm';
    case 'custom':
      return formatted.replace(/X/g, ' × ');
    default:
      return formatted.replace(/X/g, ' × ');
  }
} 