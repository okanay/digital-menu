package types

type Restaurant struct {
	ID          int64  `json:"id"`
	UserID      int64  `json:"user_id"`
	Name        string `json:"name"`
	Location    string `json:"location"`
	Description string `json:"description"`
	IsActive    bool   `json:"is_active"`
	MenuCount   int    `json:"menu_count"`
	CreatedAt   string `json:"created_at"`
	UpdatedAt   string `json:"updated_at"`
}

type GetRestaurantReq struct {
	UserID int64 `json:"user_id"`
	ID     int64 `json:"id" binding:"required"`
}

type CreateRestaurantReq struct {
	UserID      int64  `json:"user_id"`
	Name        string `json:"name" binding:"required"`
	Location    string `json:"location" binding:"required"`
	Description string `json:"description" binding:"required"`
}

type UpdateRestaurantReq struct {
	ID          int64  `json:"id" binding:"required"`
	Name        string `json:"name"`
	Location    string `json:"location"`
	Description string `json:"description"`
	IsActive    bool   `json:"is_active"`
	MenuCount   int    `json:"menu_count"`
}

type DeleteRestaurantReq struct {
	UserID int64 `json:"user_id"`
	ID     int64 `json:"id" binding:"required"`
}
