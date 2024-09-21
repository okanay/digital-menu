CREATE TYPE purchase_status AS ENUM ('Pending', 'Cancelled', 'Active', 'Expired', 'Deleted', 'Suspended');

CREATE TABLE IF NOT EXISTS purchases (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id BIGINT NOT NULL,
    unique_id TEXT DEFAULT ('p' || substring(md5(random()::text) from 1 for 6)) UNIQUE,
    price DECIMAL(10, 2) DEFAULT 0.00,
    status purchase_status DEFAULT 'Pending',
    before membership_type NOT NULL,
    after membership_type NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON purchases (user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_status ON purchases (status);
