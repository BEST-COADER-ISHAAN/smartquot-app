-- Migration: Backfill company_slug for all existing user_settings records
DO $$
DECLARE
  rec RECORD;
  base_slug TEXT;
  slug TEXT;
  suffix CHAR(1);
  char_code INT;
  exists_count INT;
BEGIN
  FOR rec IN SELECT user_id, company_name FROM user_settings WHERE company_slug IS NULL OR company_slug = '' LOOP
    IF rec.company_name IS NULL OR trim(rec.company_name) = '' THEN
      CONTINUE;
    END IF;
    base_slug := lower(regexp_replace(rec.company_name, '[^a-zA-Z0-9]+', '', 'g'));
    slug := base_slug;
    char_code := 97; -- 'a'
    LOOP
      SELECT COUNT(*) INTO exists_count FROM user_settings WHERE company_slug = slug AND user_id <> rec.user_id;
      IF exists_count = 0 THEN
        EXIT;
      END IF;
      suffix := chr(char_code);
      slug := base_slug || suffix;
      char_code := char_code + 1;
    END LOOP;
    UPDATE user_settings SET company_slug = slug WHERE user_id = rec.user_id;
  END LOOP;
END $$; 