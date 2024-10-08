DROP TRIGGER IF EXISTS update_images_updated_at ON images;
DROP FUNCTION IF EXISTS update_updated_at_column;

DROP INDEX IF EXISTS images_user_id_index;
DROP INDEX IF EXISTS images_public_access_index;
DROP INDEX IF EXISTS images_type_index;
DROP INDEX IF EXISTS images_created_at_index;

DROP TABLE IF EXISTS images;
