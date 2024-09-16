package types

import "time"

type Menu struct {
	ID           int       `json:"id"`
	UserID       int       `json:"userId"`
	RestaurantID int       `json:"restaurantId"`
	Name         string    `json:"name"`
	Type         int       `json:"type"`
	Json         string    `json:"json"`
	Description  string    `json:"description"`
	Language     string    `json:"language"`
	IsActive     bool      `json:"isActive"`
	ExpiresAt    time.Time `json:"expiresAt"`
	CreatedAt    time.Time `json:"createdAt"`
	UpdatedAt    time.Time `json:"updatedAt"`
}

type MenuResponse struct {
	Name        string    `json:"name"`
	Type        int       `json:"type"`
	Json        string    `json:"json"`
	Description string    `json:"description"`
	Language    string    `json:"language"`
	IsActive    bool      `json:"isActive"`
	ExpiresAt   time.Time `json:"expiresAt"`
	CreatedAt   time.Time `json:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt"`
}

type CreateMenuReq struct {
	UserID       int       `json:"userId"`
	RestaurantID int       `json:"restaurantId"`
	Name         string    `json:"name"`
	Type         int       `json:"type"`
	Json         string    `json:"json"`
	Description  string    `json:"description"`
	Language     string    `json:"language"`
	IsActive     bool      `json:"isActive"`
	ExpiresAt    time.Time `json:"expiresAt"`
}

type UpdateMenuReq struct {
	UserID      int        `json:"userId"`
	ID          int        `json:"id"`
	Name        *string    `json:"name,omitempty"`
	Type        *int       `json:"type,omitempty"`
	Json        *string    `json:"json,omitempty"`
	Description *string    `json:"description,omitempty"`
	Language    *string    `json:"language,omitempty"`
	IsActive    *bool      `json:"isActive,omitempty"`
	ExpiresAt   *time.Time `json:"expiresAt,omitempty"`
}

type DeleteMenuReq struct {
	UserID int `json:"userId"`
	ID     int `json:"id"`
}
