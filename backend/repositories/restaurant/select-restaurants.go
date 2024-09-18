package restaurantRepository

import (
	"time"

	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (r *Repository) SelectRestaurants(userID string) ([]types.Restaurant, error) {
	defer utils.TimeTrack(time.Now(), "Restaurant -> Select Restaurants")

	var restaurants []types.Restaurant
	query := `SELECT id, user_id, name, slug, location, description, is_active, menu_count, created_at, updated_at FROM restaurants WHERE user_id = $1`

	rows, err := r.db.Query(query, userID)
	if err != nil {
		return restaurants, err
	}

	defer rows.Close()

	for rows.Next() {
		var restaurant types.Restaurant
		err := rows.Scan(&restaurant.ID, &restaurant.UserID, &restaurant.Name, &restaurant.Slug, &restaurant.Location, &restaurant.Description, &restaurant.IsActive, &restaurant.MenuCount, &restaurant.CreatedAt, &restaurant.UpdatedAt)
		if err != nil {
			continue
		}
		restaurants = append(restaurants, restaurant)
	}

	return restaurants, nil
}
