CREATE TABLE IF NOT EXISTS menus (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id BIGINT NOT NULL,
    shop_id BIGINT NOT NULL,
    shop_unique_id TEXT NOT NULL,
    unique_id TEXT DEFAULT ('1' || substring(md5(random()::text) from 1 for 5)) UNIQUE,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    json TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (shop_id) REFERENCES shops (id) ON DELETE CASCADE
);

create
or replace function update_menu_count () returns trigger as $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE shops SET menu_count = menu_count + 1 WHERE id = NEW.shop_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE shops SET menu_count = menu_count - 1 WHERE id = OLD.shop_id;
    END IF;
    RETURN NULL;
END;
$$ language plpgsql;

create trigger menu_count_trigger
after insert
or delete on menus for each row
execute function update_menu_count ();


create index if not exists idx_menus_user_id on menus (user_id);
create index if not exists idx_menu_shops_unique_id on menus (shop_unique_id);
