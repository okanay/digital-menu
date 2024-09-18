package types

type Restaurant struct {
	ID          string `json:"id"`
	UserID      string `json:"userId"`
	Name        string `json:"name"`
	Slug        string `json:"slug"`
	Location    string `json:"location"`
	Description string `json:"description"`
	IsActive    bool   `json:"isActive"`
	MenuCount   int    `json:"menuCount"`
	CreatedAt   string `json:"createdAt"`
	UpdatedAt   string `json:"updatedAt"`
}

type CreateRestaurantReq struct {
	UserID      string `json:"userId" validate:"required"`
	Name        string `json:"name" validate:"required,min=3,max=64"`
	Location    string `json:"location" validate:"required,min=3,max=64"`
	Description string `json:"description" validate:"required,max=128"`
}

type UpdateRestaurantReq struct {
	UserID      string  `json:"userId" validate:"required"`
	ID          string  `json:"id" validate:"required"`
	Name        *string `json:"name" validate:"omitempty,min=3,max=64"`
	Location    *string `json:"location" validate:"omitempty,min=3,max=64"`
	Description *string `json:"description" validate:"omitempty,max=128"`
	IsActive    *bool   `json:"isActive" validate:"omitempty"`
	MenuCount   *int    `json:"menuCount" validate:"omitempty,max=50"`
}
