package types

import "time"

type Session struct {
	ID           string    `json:"id"`
	UserID       string    `json:"userId"`
	Token        string    `json:"token"`
	IPAddress    string    `json:"ipAddress"`
	UserAgent    string    `json:"userAgent"`
	ExpiresAt    time.Time `json:"expiresAt"`
	CreatedAt    time.Time `json:"createdAt"`
	LastAccessed time.Time `json:"lastAccessed"`
}

type CreateSessionReq struct {
	UserID    string    `json:"userId"`
	Token     string    `json:"token"`
	ExpiresAt time.Time `json:"expiresAt"`
	IPAddress string    `json:"ipAddress"`
	UserAgent string    `json:"userAgent"`
}

type LogoutSessionReq struct {
	LogoutAllDevices bool `json:"logoutAllDevices" validate:"required" binding:"required"`
}
