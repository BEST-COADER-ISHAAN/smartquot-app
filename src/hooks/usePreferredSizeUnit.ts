import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '../lib/supabase';

export type PreferredSizeUnit = 'inches' | 'mm' | 'feet' | 'custom';

export const usePreferredSizeUnit = () => {
  const [preferredSizeUnit, setPreferredSizeUnit] = useState<PreferredSizeUnit>('inches');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Load preferred size unit from Supabase or localStorage
  useEffect(() => {
    const loadPreferredSizeUnit = async () => {
      setLoading(true);
      try {
        // Try to load from Supabase user settings if user is available
        if (user && user.id) {
          try {
            const { data, error } = await supabase
              .from('user_settings')
              .select('preferred_size_unit')
              .eq('user_id', user.id)
              .single();
            if (data && data.preferred_size_unit) {
              setPreferredSizeUnit(data.preferred_size_unit as PreferredSizeUnit);
              setLoading(false);
              return;
            }
          } catch (e) { 
          }
        }
        
        // Fallback to localStorage
        const local = localStorage.getItem('preferred_size_unit');
        if (local && ['inches', 'mm', 'feet', 'custom'].includes(local)) {
          setPreferredSizeUnit(local as PreferredSizeUnit);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    loadPreferredSizeUnit();
  }, [user]);

  // Save preferred size unit to Supabase and localStorage
  const updatePreferredSizeUnit = async (newUnit: PreferredSizeUnit) => {
    setPreferredSizeUnit(newUnit);
    
    // Save to localStorage as fallback
    localStorage.setItem('preferred_size_unit', newUnit);
    
    // Save to Supabase if user is available
    if (user && user.id) {
      try {
        await supabase
          .from('user_settings')
          .upsert({
            user_id: user.id,
            preferred_size_unit: newUnit,
          });
      } catch (error) {
      }
    }
  };

  return {
    preferredSizeUnit,
    updatePreferredSizeUnit,
    loading,
  };
}; 