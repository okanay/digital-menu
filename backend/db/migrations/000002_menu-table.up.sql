CREATE TABLE IF NOT EXISTS restaurants (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id BIGINT NOT NULL,
    name TEXT NOT NULL,
    location TEXT,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    menu_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS menus (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id BIGINT NOT NULL,
    restaurant_id BIGINT NOT NULL,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    json TEXT NOT NULL,
    description TEXT,
    language TEXT DEFAULT 'tr',
    is_active BOOLEAN DEFAULT TRUE,
    expires_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP + INTERVAL '1 month',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants (id) ON DELETE CASCADE
);

create index if not exists idx_restaurants_user_id on restaurants (user_id);
create index if not exists idx_restaurants_name on restaurants (name);
create index if not exists idx_restaurants_location on restaurants (location);
create index if not exists idx_menus_user_id on menus (user_id);
create index if not exists idx_menu_restaurants_id on menus (restaurant_id);
create index if not exists idx_menus_name on menus (name);
create index if not exists idx_menus_type on menus (type);
