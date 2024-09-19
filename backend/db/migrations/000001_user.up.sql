CREATE TYPE membership_type AS ENUM ('Basic', 'Pro', 'Premium', 'Admin');

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY DEFAULT ('1' || substring(md5(random()::text) from 1 for 5)) UNIQUE,
  email TEXT UNIQUE NOT NULL,
  hashed_password TEXT NOT NULL,
  membership membership_type DEFAULT 'Basic' NOT NULL,
  email_verified BOOLEAN DEFAULT FALSE,
  email_verification_token TEXT DEFAULT ('e' || substring(md5(random()::text) from 1 for 5)),
  password_reset_token TEXT DEFAULT ('p' || substring(md5(random()::text) from 1 for 5)),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);
