-- Create sample products for testing
-- Replace 'google-oauth2|100263779248465767642' with your actual Auth0 user ID

INSERT INTO products (
  design_name,
  collection,
  size,
  mrp_per_box,
  rate_per_sqft,
  freight,
  billed_sqft_per_box,
  is_archived,
  created_by
) VALUES 
  ('Marble Elegance', 'Premium Collection', '24" x 48"', 2500.00, 45.00, 150.00, 8.00, false, 'google-oauth2|100263779248465767642'),
  ('Wood Grain Classic', 'Natural Series', '12" x 24"', 1200.00, 35.00, 100.00, 2.00, false, 'google-oauth2|100263779248465767642'),
  ('Modern Concrete', 'Urban Collection', '48" x 48"', 3200.00, 55.00, 200.00, 16.00, false, 'google-oauth2|100263779248465767642'),
  ('Stone Texture Pro', 'Professional Series', '36" x 36"', 2800.00, 50.00, 180.00, 9.00, false, 'google-oauth2|100263779248465767642'),
  ('Ceramic Deluxe', 'Luxury Collection', '18" x 18"', 800.00, 30.00, 80.00, 2.25, false, 'google-oauth2|100263779248465767642'),
  ('Granite Premium', 'Premium Collection', '60" x 60"', 4500.00, 65.00, 250.00, 25.00, false, 'google-oauth2|100263779248465767642'),
  ('Quartz Modern', 'Contemporary Series', '30" x 30"', 2200.00, 40.00, 120.00, 6.25, false, 'google-oauth2|100263779248465767642'),
  ('Slate Natural', 'Natural Series', '16" x 16"', 600.00, 25.00, 60.00, 1.78, false, 'google-oauth2|100263779248465767642'),
  ('Porcelain Elite', 'Elite Collection', '40" x 40"', 3000.00, 52.00, 160.00, 11.11, false, 'google-oauth2|100263779248465767642'),
  ('Travertine Classic', 'Classic Series', '20" x 20"', 900.00, 32.00, 90.00, 2.78, false, 'google-oauth2|100263779248465767642');

-- Verify the products were created
SELECT 
  design_name,
  collection,
  size,
  mrp_per_box,
  created_by
FROM products 
ORDER BY created_at DESC
LIMIT 10;
