package types

import "time"

type Session struct {
	ID           int       `db:"id" json:"id"`
	UserID       int       `db:"user_id" json:"userId"`
	Token        string    `db:"token" json:"token"`
	IPAddress    string    `db:"ip_address" json:"ipAddress"`
	UserAgent    string    `db:"user_agent" json:"userAgent"`
	ExpiresAt    time.Time `db:"expires_at" json:"expiresAt"`
	CreatedAt    time.Time `db:"created_at" json:"createdAt"`
	LastAccessed time.Time `db:"last_accessed" json:"lastAccessed"`
}

type CreateSessionReq struct {
	UserID    int       `json:"userId"`
	Token     string    `json:"token"`
	ExpiresAt time.Time `json:"expiresAt"`
	IPAddress string    `json:"ipAddress"`
	UserAgent string    `json:"userAgent"`
}

type LogoutSessionReq struct {
	LogoutAllDevices bool `json:"logoutAllDevices" validate:"omitempty"`
}
