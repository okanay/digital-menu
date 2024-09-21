package types

type Restaurant struct {
	ID          int    `db:"id" json:"id"`
	UserID      int    `db:"user_id" json:"userId"`
	UniqueID    string `db:"unique_id" json:"uniqueId"`
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
	UserID      int    `json:"userId" validate:"required"`
	Name        string `json:"name" validate:"required,min=3,max=64"`
	Location    string `json:"location" validate:"required,min=3,max=64"`
	Description string `json:"description" validate:"required,max=128"`
}

type UpdateRestaurantReq struct {
	UserID      int     `json:"userId" validate:"required"`
	ID          int     `json:"id" validate:"required"`
	Name        *string `json:"name" validate:"omitempty,min=3,max=64"`
	Location    *string `json:"location" validate:"omitempty,min=3,max=64"`
	Description *string `json:"description" validate:"omitempty,max=128"`
	IsActive    *bool   `json:"isActive" validate:"omitempty"`
	MenuCount   *int    `json:"menuCount" validate:"omitempty,max=50"`
}
