package restaurantRepository

import (
	"fmt"
	"time"

	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (r *Repository) SelectRestauranstBySlug(slug string) ([]types.Restaurant, error) {
	defer utils.TimeTrack(time.Now(), "Restaurant -> Select Restaurants By Slug")
	var restaurant []types.Restaurant

	query := `SELECT id, user_id, name, slug, location, description, is_active, menu_count, created_at, updated_at FROM restaurants WHERE slug = $1`
	rows, err := r.db.Query(query, slug)
	if err != nil {
		return restaurant, err
	}

	for rows.Next() {
		var res types.Restaurant
		err := rows.Scan(&res.ID, &res.UserID, &res.Name, &res.Slug, &res.Location, &res.Description, &res.IsActive, &res.MenuCount, &res.CreatedAt, &res.UpdatedAt)
		if err != nil {
			fmt.Println("[ERROR] failed to scan restaurant: ", err)
			continue
		}
		restaurant = append(restaurant, res)
	}

	return restaurant, nil
}
