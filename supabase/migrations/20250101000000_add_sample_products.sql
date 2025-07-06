-- Add sample products for testing
INSERT INTO public.products (
    name,
    size,
    surface,
    collection,
    ex_factory_price,
    mrp_per_sqft,
    mrp_per_box,
    gst_percentage,
    insurance_percentage,
    actual_sqft_per_box,
    billed_sqft_per_box,
    weight,
    freight,
    is_archived,
    created_at,
    updated_at
) VALUES 
-- Marble Tiles
('Carrara Marble', '600x600', 'Polished', 'Premium Marble', 120.00, 180.00, 648.00, 18.00, 2.00, 3.60, 3.60, 15.00, 2.50, false, NOW(), NOW()),
('Carrara Marble', '600x600', 'Honed', 'Premium Marble', 110.00, 165.00, 594.00, 18.00, 2.00, 3.60, 3.60, 15.00, 2.50, false, NOW(), NOW()),
('Carrara Marble', '300x600', 'Polished', 'Premium Marble', 65.00, 97.50, 175.50, 18.00, 2.00, 1.80, 1.80, 8.00, 2.50, false, NOW(), NOW()),

-- Porcelain Tiles
('Italian Porcelain', '600x600', 'Glazed', 'Modern Porcelain', 85.00, 127.50, 459.00, 18.00, 2.00, 3.60, 3.60, 12.00, 2.50, false, NOW(), NOW()),
('Italian Porcelain', '600x600', 'Matt', 'Modern Porcelain', 80.00, 120.00, 432.00, 18.00, 2.00, 3.60, 3.60, 12.00, 2.50, false, NOW(), NOW()),
('Italian Porcelain', '300x600', 'Glazed', 'Modern Porcelain', 45.00, 67.50, 121.50, 18.00, 2.00, 1.80, 1.80, 6.00, 2.50, false, NOW(), NOW()),

-- Granite Tiles
('Black Granite', '600x600', 'Polished', 'Premium Granite', 150.00, 225.00, 810.00, 18.00, 2.00, 3.60, 3.60, 18.00, 2.50, false, NOW(), NOW()),
('Black Granite', '600x600', 'Honed', 'Premium Granite', 140.00, 210.00, 756.00, 18.00, 2.00, 3.60, 3.60, 18.00, 2.50, false, NOW(), NOW()),
('Black Granite', '300x600', 'Polished', 'Premium Granite', 75.00, 112.50, 202.50, 18.00, 2.00, 1.80, 1.80, 9.00, 2.50, false, NOW(), NOW()),

-- Ceramic Tiles
('Spanish Ceramic', '600x600', 'Glazed', 'Classic Ceramic', 60.00, 90.00, 324.00, 18.00, 2.00, 3.60, 3.60, 10.00, 2.50, false, NOW(), NOW()),
('Spanish Ceramic', '600x600', 'Matt', 'Classic Ceramic', 55.00, 82.50, 297.00, 18.00, 2.00, 3.60, 3.60, 10.00, 2.50, false, NOW(), NOW()),
('Spanish Ceramic', '300x600', 'Glazed', 'Classic Ceramic', 30.00, 45.00, 81.00, 18.00, 2.00, 1.80, 1.80, 5.00, 2.50, false, NOW(), NOW()); 