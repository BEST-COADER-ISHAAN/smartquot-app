import { supabase } from './supabase';

// Configuration for Supabase Storage
const STORAGE_BUCKET = 'product-images';

// Get the Supabase project URL from environment variables
const getSupabaseUrl = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  if (!url) {
    throw new Error('VITE_SUPABASE_URL environment variable is not set');
  }
  return url;
};

// Construct the full image URL from filename
export const getImageUrl = (filename: string): string => {
  if (!filename) return '';
  
  const supabaseUrl = getSupabaseUrl();
  return `${supabaseUrl}/storage/v1/object/public/${STORAGE_BUCKET}/${filename}`;
};

// Extract filename from full image URL
export const getFilenameFromUrl = (url: string): string => {
  if (!url) return '';
  
  const parts = url.split('/');
  return parts[parts.length - 1] || '';
};

// Check if image exists (optional - for validation)
export const checkImageExists = async (filename: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .list('', {
        search: filename
      });
    
    if (error) return false;
    return data?.some(file => file.name === filename) || false;
  } catch {
    return false;
  }
};

// Upload image to Supabase Storage
export const uploadImage = async (file: File, filename: string): Promise<string | null> => {
  try {
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(filename, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      console.error('Upload error:', error);
      return null;
    }

    return getImageUrl(filename);
  } catch (error) {
    console.error('Upload failed:', error);
    return null;
  }
};

// Delete image from Supabase Storage
export const deleteImage = async (filename: string): Promise<boolean> => {
  try {
    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .remove([filename]);

    return !error;
  } catch {
    return false;
  }
};