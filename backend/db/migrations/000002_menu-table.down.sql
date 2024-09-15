DROP INDEX IF EXISTS idx_restaurants_user_id;
DROP INDEX IF EXISTS idx_restaurants_name;
DROP INDEX IF EXISTS idx_restaurants_location;
DROP INDEX IF EXISTS idx_menus_user_id;
DROP INDEX IF EXISTS idx_menus_restaurant_id;
DROP INDEX IF EXISTS idx_menus_name;
DROP INDEX IF EXISTS idx_menus_type;

DROP TABLE IF EXISTS menus;
DROP TABLE IF EXISTS restaurants;
