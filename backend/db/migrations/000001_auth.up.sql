CREATE TYPE membership_type AS ENUM ('Basic', 'Pro', 'Premium', 'Admin');

CREATE TABLE IF NOT EXISTS users (
  id bigint primary key generated always as identity,
  unique_id TEXT DEFAULT ('1' || substring(md5(random()::text) from 1 for 8)) UNIQUE,
  email TEXT UNIQUE NOT NULL,
  hashed_password TEXT NOT NULL,
  membership membership_type DEFAULT 'Basic' NOT NULL,
  email_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  last_login TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sessions (
  id bigint primary key generated always as identity,
  user_id bigint NOT NULL,
  token TEXT UNIQUE NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  expires_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP + INTERVAL '1 month',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  last_accessed TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id bigint primary key generated always as identity,
  email TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  expires_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP + INTERVAL '5 minutes',
  is_used BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (email) REFERENCES users (email) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS email_verification_tokens (
  id bigint primary key generated always as identity,
  email TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  expires_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP + INTERVAL '8 hours',
  is_used BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (email) REFERENCES users (email) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);

CREATE UNIQUE INDEX IF NOT EXISTS idx_sessions_token ON sessions (token);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions (user_id);

CREATE INDEX IF NOT EXISTS idx_password_reset_email ON password_reset_tokens (email);
CREATE UNIQUE INDEX IF NOT EXISTS idx_password_reset_token ON password_reset_tokens (token);

CREATE INDEX IF NOT EXISTS idx_email_verification_email ON email_verification_tokens (email);
CREATE UNIQUE INDEX IF NOT EXISTS idx_email_verification_token ON email_verification_tokens (token);
