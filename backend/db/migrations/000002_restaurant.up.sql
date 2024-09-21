CREATE TABLE IF NOT EXISTS restaurants (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id BIGINT NOT NULL,
    unique_id TEXT DEFAULT ('1' || substring(md5(random()::text) from 1 for 8)) UNIQUE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    location TEXT,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    menu_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

create index if not exists idx_restaurants_user_id on restaurants (user_id);
create index if not exists idx_restaurants_name on restaurants (name);
