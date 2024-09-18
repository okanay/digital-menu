package types

import "time"

type Language string

const (
	TR Language = "tr"
	EN Language = "en"
	FR Language = "fr"
	DE Language = "de"
	ES Language = "es"
	IT Language = "it"
	KO Language = "ko"
	JP Language = "jp"
	RU Language = "ru"
	UK Language = "uk"
	AR Language = "ar"
)

type Menu struct {
	ID           string    `json:"id"`
	UserID       string    `json:"userId"`
	RestaurantID string    `json:"restaurantId"`
	Name         string    `json:"name"`
	Type         int       `json:"type"`
	Json         string    `json:"json"`
	Description  string    `json:"description"`
	Language     Language  `json:"language"`
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
	Language    Language  `json:"language"`
	IsActive    bool      `json:"isActive"`
	ExpiresAt   time.Time `json:"expiresAt"`
	CreatedAt   time.Time `json:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt"`
}

type CreateMenuReq struct {
	UserID       string    `json:"userId" validate:"required"`
	RestaurantID string    `json:"restaurantId" validate:"required"`
	Name         string    `json:"name" validate:"required,min=3,max=64"`
	Type         int       `json:"type" validate:"required"`
	Json         string    `json:"json" validate:"required"`
	Description  string    `json:"description" validate:"required,max=128"`
	Language     Language  `json:"language" validate:"required,max=2,oneof=tr en fr de es it ko jp ru uk ar"`
	IsActive     bool      `json:"isActive" validate:"omitempty"`
	ExpiresAt    time.Time `json:"expiresAt" validate:"required"`
}

type UpdateMenuReq struct {
	UserID      string     `json:"userId" validate:"required,min=3,max=64"`
	ID          string     `json:"id" validate:"required,min=3,max=64"`
	Name        *string    `json:"name" validate:"omitempty,min=3,max=64"`
	Type        *int       `json:"type" validate:"omitempty,min=0,max=64"`
	Json        *string    `json:"json" validate:"omitempty"`
	Description *string    `json:"description" validate:"omitempty,max=128"`
	Language    *Language  `json:"language" validate:"required,max=2,oneof=tr en fr de es it ko jp ru uk ar"`
	IsActive    *bool      `json:"isActive" validate:"omitempty"`
	ExpiresAt   *time.Time `json:"expiresAt" validate:"omitempty"`
}
