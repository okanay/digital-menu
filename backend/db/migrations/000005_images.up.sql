CREATE TABLE IF NOT EXISTS images (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id BIGINT NOT NULL,
    size BIGINT NOT NULL CHECK (size > 0),
    type TEXT NOT NULL CHECK (type IN ('image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif')),
    name TEXT NOT NULL,
    unique_name TEXT NOT NULL UNIQUE,
    url TEXT NOT NULL UNIQUE,
    description TEXT CHECK (char_length(description) <= 255),
    public_access BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS images_user_id_index ON images (user_id);
CREATE INDEX IF NOT EXISTS images_public_access_index ON images (public_access);
CREATE INDEX IF NOT EXISTS images_type_index ON images (type);
CREATE INDEX IF NOT EXISTS images_created_at_index ON images (created_at);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_images_updated_at
BEFORE UPDATE ON images
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
