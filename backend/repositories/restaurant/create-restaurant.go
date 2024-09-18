package restaurantRepository

import (
	"time"

	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (r *Repository) CreateRestaurant(req types.CreateRestaurantReq) (types.Restaurant, error) {
	defer utils.TimeTrack(time.Now(), "Restaurant -> Create Restaurant")
	restaurant := types.Restaurant{}

	slug, err := utils.GenerateSlug(req.Name, false)
	if err != nil {
		return restaurant, err
	}

	query := `
	INSERT INTO restaurants (user_id, name, slug, location, description)
	VALUES ($1, $2, $3, $4, $5)
	RETURNING id, user_id, name, slug, location, description, is_active, menu_count, created_at, updated_at
	`
	err = r.db.QueryRow(query, req.UserID, req.Name, slug, req.Location, req.Description).Scan(&restaurant.ID, &restaurant.UserID, &restaurant.Name, &restaurant.Slug, &restaurant.Location, &restaurant.Description, &restaurant.IsActive, &restaurant.MenuCount, &restaurant.CreatedAt, &restaurant.UpdatedAt)

	if err != nil {
		return restaurant, err
	}

	return restaurant, nil
}
