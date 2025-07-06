// Script to update the customer name from "PDF Minimal" to a proper name
// This script uses the Supabase client to update the customer record

const { createClient } = require('@supabase/supabase-js');

// You'll need to replace these with your actual Supabase credentials
const supabaseUrl = process.env.SUPABASE_URL || 'your-supabase-url';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'your-supabase-anon-key';

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateCustomer() {
  try {
    const { data, error } = await supabase
      .from('customers')
      .update({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+91-9876543210',
        site_address: '123 Main Street, City, State 12345',
        updated_at: new Date().toISOString()
      })
      .eq('id', 'd0895e7b-2b46-4d58-bb95-7d78b76cf8a2')
      .select();

    if (error) {
      console.error('Error updating customer:', error);
      return;
    }

    console.log('Customer updated successfully:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

updateCustomer(); 