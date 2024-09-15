DROP TABLE IF EXISTS sessions;

DROP TABLE IF EXISTS users;

DROP TYPE IF EXISTS membership_type;

DROP INDEX IF EXISTS idx_users_email;
DROP INDEX IF EXISTS idx_sessions_user_id;
DROP INDEX IF EXISTS idx_sessions_token;
DROP INDEX IF EXISTS idx_sessions_expires_at;
