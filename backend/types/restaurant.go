package types

type Restaurant struct {
	ID          int64  `json:"id"`
	UserID      int64  `json:"userId"`
	Name        string `json:"name"`
	Location    string `json:"location"`
	Description string `json:"description"`
	IsActive    bool   `json:"isActive"`
	MenuCount   int    `json:"menuCount"`
	CreatedAt   string `json:"createdAt"`
	UpdatedAt   string `json:"updatedAt"`
}

type GetRestaurantReq struct {
	UserID int64 `json:"userId" validate:"required"`
	ID     int64 `json:"id" validate:"required"`
}

type CreateRestaurantReq struct {
	UserID      int64  `json:"userId" validate:"required"`
	Name        string `json:"name" validate:"required"`
	Location    string `json:"location" validate:"required"`
	Description string `json:"description" validate:"required"`
}

type UpdateRestaurantReq struct {
	UserID      int64   `json:"userId"`
	ID          int64   `json:"id"`
	Name        *string `json:"name,omitempty"`
	Location    *string `json:"location,omitempty"`
	Description *string `json:"description,omitempty"`
	IsActive    *bool   `json:"isActive,omitempty"`
	MenuCount   *int    `json:"menuCount,omitempty"`
}

type DeleteRestaurantReq struct {
	UserID int64 `json:"userId" validate:"required"`
	ID     int64 `json:"id" validate:"required"`
}
