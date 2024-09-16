package types

import "time"

type Menu struct {
	ID           int64     `json:"id"`
	UserID       int64     `json:"userId"`
	RestaurantID int64     `json:"restaurantId"`
	Name         string    `json:"name"`
	Type         string    `json:"type"`
	Json         string    `json:"json"`
	Description  string    `json:"description"`
	Language     string    `json:"language"`
	IsActive     bool      `json:"isActive"`
	ExpiresAt    time.Time `json:"expiresAt"`
	CreatedAt    time.Time `json:"createdAt"`
	UpdatedAt    time.Time `json:"updatedAt"`
}

type GetMenuReq struct {
	UserID       int64 `json:"userId" validate:"required" binding:"required"`
	RestaurantID int64 `json:"restaurantId" validate:"required" binding:"required"`
	ID           int64 `json:"id" validate:"required" binding:"required"`
}

type CreateMenuReq struct {
	UserID       int64     `json:"userId"`
	RestaurantID int64     `json:"restaurantId"`
	Name         string    `json:"name"`
	Type         string    `json:"type"`
	Json         string    `json:"json"`
	Description  string    `json:"description"`
	Language     string    `json:"language"`
	IsActive     bool      `json:"isActive"`
	ExpiresAt    time.Time `json:"expiresAt"`
}

type UpdateMenuReq struct {
	UserID       int64      `json:"userId"`
	RestaurantID int64      `json:"restaurantId"`
	ID           int64      `json:"id"`
	Name         *string    `json:"name,omitempty"`
	Type         *string    `json:"type,omitempty"`
	Json         *string    `json:"json,omitempty"`
	Description  *string    `json:"description,omitempty"`
	Language     *string    `json:"language,omitempty"`
	IsActive     *bool      `json:"isActive,omitempty"`
	ExpiresAt    *time.Time `json:"expiresAt,omitempty"`
}

type DeleteMenuReq struct {
	UserID       int64 `json:"userId"`
	RestaurantID int64 `json:"restaurantId"`
	ID           int64 `json:"id"`
}
