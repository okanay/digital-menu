package restaurantRepository

import (
	"time"

	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (r *Repository) SelectRestaurantByID(id string) (types.Restaurant, error) {
	defer utils.TimeTrack(time.Now(), "Restaurant -> Select Restaurant")

	var restaurant types.Restaurant
	query := `SELECT * FROM restaurants WHERE id = $1`

	row := r.db.QueryRow(query, id)
	err := utils.ScanStructByDBTags(row, &restaurant)
	if err != nil {
		return restaurant, err
	}

	return restaurant, nil
}
