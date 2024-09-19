package types

type Restaurant struct {
	ID          string `db:"id" json:"id"`
	UserID      string `db:"user_id" json:"userId"`
	Name        string `db:"name" json:"name"`
	Slug        string `db:"slug" json:"slug"`
	Location    string `db:"location" json:"location"`
	Description string `db:"description" json:"description"`
	IsActive    bool   `db:"is_active" json:"isActive"`
	MenuCount   int    `db:"menu_count" json:"menuCount"`
	CreatedAt   string `db:"created_at" json:"createdAt"`
	UpdatedAt   string `db:"updated_at" json:"updatedAt"`
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
