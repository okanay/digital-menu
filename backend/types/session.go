package types

import "time"

type Session struct {
	ID           int64     `json:"id"`
	UserID       int64     `json:"user_id"`
	Token        string    `json:"token"`
	ExpiresAt    time.Time `json:"expires_at"`
	CreatedAt    time.Time `json:"created_at"`
	IPAddress    string    `json:"ip_address"`
	UserAgent    string    `json:"user_agent"`
	LastAccessed time.Time `json:"last_accessed"`
}
