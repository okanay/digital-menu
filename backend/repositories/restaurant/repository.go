package restaurantRepository

import (
	"database/sql"

	"github.com/okanay/digital-menu/types"
)

type Repository struct {
	db *sql.DB
}

func NewRepository(db *sql.DB) *Repository {
	return &Repository{db: db}
}

type RestaurantRepository interface {
	CreateRestaurant(req types.CreateRestaurantReq) (types.Restaurant, error)
	UpdateRestaurant(req types.UpdateRestaurantReq) (types.Restaurant, error)
	SelectRestaurantByID(restaurantID int) (types.Restaurant, error)
	SelectAllRestaurantsByUserID(userID int) ([]types.Restaurant, error)
	DeleteRestaurant(restaurantID int) error
}
