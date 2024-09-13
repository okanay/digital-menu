-- Create the membership_type enum
CREATE TYPE membership_type AS ENUM ('Regular', 'Premium');

-- Create the User table
CREATE TABLE IF NOT EXISTS users (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  email TEXT UNIQUE NOT NULL,
  hashed_password TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  last_login TIMESTAMPTZ,
  membership membership_type DEFAULT 'Regular'
);

-- Create the Session table
CREATE TABLE IF NOT EXISTS sessions (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id BIGINT NOT NULL,
  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  last_accessed TIMESTAMPTZ,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);



-- Create indexes for optimization
CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions (user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions (token);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions (expires_at);
