package types

import "time"

type Menu struct {
	ID           int       `db:"id" json:"id"`
	UserID       int       `db:"user_id" json:"userId"`
	ShopID       int       `db:"shop_id" json:"shopId"`
	ShopUniqueID string    `db:"shop_unique_id" json:"shopUniqueId"`
	UniqueID     string    `db:"unique_id" json:"uniqueId"`
	Name         string    `db:"name" json:"name"`
	Type         int       `db:"type" json:"type"`
	Json         string    `db:"json" json:"json"`
	IsActive     bool      `db:"is_active" json:"isActive"`
	CreatedAt    time.Time `db:"created_at" json:"createdAt"`
	UpdatedAt    time.Time `db:"updated_at" json:"updatedAt"`
}

type MenuResponse struct {
	ShopUniqueID string    `db:"shop_unique_id" json:"shopUniqueId"`
	UniqueID     string    `db:"unique_id" json:"uniqueId"`
	Name         string    `json:"name"`
	Type         int       `json:"type"`
	Json         string    `json:"json"`
	IsActive     bool      `json:"isActive"`
	CreatedAt    time.Time `json:"createdAt"`
	UpdatedAt    time.Time `json:"updatedAt"`
}

type CreateMenuReq struct {
	UserID       int    `json:"userId" validate:"required"`
	ShopUniqueID string `db:"shop_unique_id" json:"shopUniqueId"`
	Name         string `json:"name" validate:"required,min=1,max=64"`
	Type         int    `json:"type" validate:"required"`
	Json         string `json:"json" validate:"required"`
	IsActive     bool   `json:"isActive" validate:"omitempty"`
}

type UpdateMenuReq struct {
	UserID       int     `json:"userId" validate:"required"`
	ShopUniqueID string  `db:"shop_unique_id" json:"shopUniqueId"`
	UniqueID     string  `db:"unique_id" json:"uniqueId"`
	Name         *string `json:"name" validate:"omitempty,min=1,max=64"`
	Type         *int    `json:"type" validate:"omitempty,min=0,max=64"`
	Json         *string `json:"json" validate:"omitempty"`
	IsActive     *bool   `json:"isActive" validate:"omitempty"`
}
