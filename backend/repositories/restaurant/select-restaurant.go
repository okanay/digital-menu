package restaurantRepository

import (
	"time"

	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (r *Repository) SelectRestaurant(id int) (types.Restaurant, error) {
	defer utils.TimeTrack(time.Now(), "Restaurant -> Select Restaurant")

	var restaurant types.Restaurant
	query := `SELECT id, user_id, name, location, description, is_active, menu_count, created_at, updated_at FROM restaurants WHERE id = $1`

	err := r.db.QueryRow(query, id).Scan(&restaurant.ID, &restaurant.UserID, &restaurant.Name, &restaurant.Location, &restaurant.Description, &restaurant.IsActive, &restaurant.MenuCount, &restaurant.CreatedAt, &restaurant.UpdatedAt)
	if err != nil {
		return restaurant, err
	}

	return restaurant, nil
}
