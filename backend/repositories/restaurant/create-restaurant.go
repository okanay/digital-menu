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

	query := `INSERT INTO restaurants (user_id, name, slug, location, description) VALUES ($1, $2, $3, $4, $5) RETURNING *`
	row := r.db.QueryRow(query, req.UserID, req.Name, slug, req.Location, req.Description)
	err = utils.ScanStructByDBTags(row, &restaurant)
	if err != nil {
		return restaurant, err
	}

	return restaurant, nil
}
