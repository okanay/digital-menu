package types

type Restaurant struct {
	ID          int    `json:"id"`
	UserID      int    `json:"userId"`
	Name        string `json:"name"`
	Location    string `json:"location"`
	Description string `json:"description"`
	IsActive    bool   `json:"isActive"`
	MenuCount   int    `json:"menuCount"`
	CreatedAt   string `json:"createdAt"`
	UpdatedAt   string `json:"updatedAt"`
}

type GetRestaurantReq struct {
	UserID int `json:"userId" validate:"required" binding:"required"`
	ID     int `json:"id" validate:"required" binding:"required"`
}

type CreateRestaurantReq struct {
	UserID      int    `json:"userId" validate:"required" binding:"required"`
	Name        string `json:"name" validate:"required" binding:"required"`
	Location    string `json:"location" validate:"required" binding:"required"`
	Description string `json:"description" validate:"required" binding:"required"`
}

type UpdateRestaurantReq struct {
	UserID      int     `json:"userId"`
	ID          int     `json:"id"`
	Name        *string `json:"name,omitempty"`
	Location    *string `json:"location,omitempty"`
	Description *string `json:"description,omitempty"`
	IsActive    *bool   `json:"isActive,omitempty"`
	MenuCount   *int    `json:"menuCount,omitempty"`
}

type DeleteRestaurantReq struct {
	UserID int `json:"userId" validate:"required" binding:"required"`
	ID     int `json:"id" validate:"required" binding:"required"`
}
