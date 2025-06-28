/* Direct Import Fix */
DROP POLICY IF EXISTS "Users can insert own products" ON products;
CREATE POLICY "Allow all authenticated users to insert" ON products FOR INSERT TO authenticated WITH CHECK (true);
