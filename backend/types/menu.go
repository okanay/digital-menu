package types

import "time"

type Menu struct {
	ID           int64     `json:"id"`
	UserID       int64     `json:"user_id"`
	RestaurantID int64     `json:"restaurant_id"`
	Name         string    `json:"name"`
	Type         string    `json:"type"`
	Json         string    `json:"json"`
	Description  string    `json:"description"`
	Language     string    `json:"language"`
	IsActive     bool      `json:"is_active"`
	ExpiresAt    time.Time `json:"expires_at"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}

type GetMenuReq struct {
	UserID       int64  `json:"user_id"`
	RestaurantID int64  `json:"restaurant_id"`
	Name         string `json:"name"`
}

type CreateMenuReq struct {
	UserID       int64     `json:"user_id"`
	RestaurantID int64     `json:"restaurant_id"`
	Name         string    `json:"name"`
	Type         string    `json:"type"`
	Json         string    `json:"json"`
	Description  string    `json:"description"`
	Language     string    `json:"language"`
	IsActive     bool      `json:"is_active"`
	ExpiresAt    time.Time `json:"expires_at"`
}

type UpdateMenuReq struct {
	Name        string    `json:"name"`
	Type        string    `json:"type"`
	Json        string    `json:"json"`
	Description string    `json:"description"`
	Language    string    `json:"language"`
	IsActive    bool      `json:"is_active"`
	ExpiresAt   time.Time `json:"expires_at"`
}

type DeleteMenuReq struct {
	UserID       int64  `json:"user_id"`
	RestaurantID int64  `json:"restaurant_id"`
	Name         string `json:"name"`
}
