package restaurantRepository

import (
	"fmt"
	"time"

	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (r *Repository) SelectRestauranstBySlug(slug string) ([]types.Restaurant, error) {
	defer utils.TimeTrack(time.Now(), "Restaurant -> Select Restaurants By Slug")

	var restaurants []types.Restaurant
	query := `SELECT * FROM restaurants WHERE slug = $1`

	rows, err := r.db.Query(query, slug)
	if err != nil {
		return restaurants, err
	}

	defer rows.Close()
	for rows.Next() {
		var res types.Restaurant
		err := utils.ScanStructByDBTagsForRows(rows, &res)

		if err != nil {
			fmt.Println("[ERROR] failed to scan restaurant: ", err)
			continue
		}

		restaurants = append(restaurants, res)
	}

	return restaurants, nil
}
