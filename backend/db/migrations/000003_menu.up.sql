CREATE TYPE language AS ENUM (
    'tr',
    'en',
    'fr',
    'de',
    'es',
    'it',
    'ko',
    'jp',
    'ru',
    'uk',
    'ar'
);

CREATE TABLE IF NOT EXISTS menus (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id BIGINT NOT NULL,
    restaurant_id BIGINT NOT NULL,
    unique_id TEXT DEFAULT ('1' || substring(md5(random()::text) from 1 for 5)) UNIQUE,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    json TEXT NOT NULL,
    description TEXT,
    language language DEFAULT 'tr',
    is_active BOOLEAN DEFAULT TRUE,
    expires_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP + INTERVAL '12 month',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants (id) ON DELETE CASCADE
);


create index if not exists idx_menus_user_id on menus (user_id);
create index if not exists idx_menu_restaurants_id on menus (restaurant_id);
create index if not exists idx_menus_name on menus (name);
create index if not exists idx_menus_type on menus (type);
