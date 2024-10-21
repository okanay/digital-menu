package types

type Shop struct {
	ID        int    `db:"id" json:"id"`
	UserID    int    `db:"user_id" json:"userId"`
	UniqueID  string `db:"unique_id" json:"uniqueId"`
	Name      string `db:"name" json:"name"`
	Slug      string `db:"slug" json:"slug"`
	IsActive  bool   `db:"is_active" json:"isActive"`
	MenuCount int    `db:"menu_count" json:"menuCount"`
	CreatedAt string `db:"created_at" json:"createdAt"`
	UpdatedAt string `db:"updated_at" json:"updatedAt"`
}

type ShopResponse struct {
	UniqueID  string `db:"unique_id" json:"uniqueId"`
	Name      string `db:"name" json:"name"`
	Slug      string `db:"slug" json:"slug"`
	IsActive  bool   `db:"is_active" json:"isActive"`
	MenuCount int    `db:"menu_count" json:"menuCount"`
	CreatedAt string `db:"created_at" json:"createdAt"`
	UpdatedAt string `db:"updated_at" json:"updatedAt"`
}

type ShopRestaurantReq struct {
	UserID int    `json:"userId" validate:"required"`
	Name   string `json:"name" validate:"required,min=1,max=64"`
}

type UpdateShopReq struct {
	UserID   int     `json:"userId" validate:"required"`
	UniqueID string  `db:"unique_id" json:"uniqueId"`
	Name     *string `json:"name" validate:"omitempty,min=1,max=64"`
	IsActive *bool   `json:"isActive" validate:"omitempty"`
}
