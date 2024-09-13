-- Drop the Sessions table and its indexes
DROP TABLE IF EXISTS sessions;

-- Drop the Users table and its indexes
DROP TABLE IF EXISTS users;

-- Drop the membership_type enum
DROP TYPE IF EXISTS membership_type;

-- Drop the indexes
DROP INDEX IF EXISTS idx_users_email;
DROP INDEX IF EXISTS idx_sessions_user_id;
DROP INDEX IF EXISTS idx_sessions_token;
DROP INDEX IF EXISTS idx_sessions_expires_at;
