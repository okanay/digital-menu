package menuRepository

import (
	"fmt"
	"time"

	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (r *Repository) SelectMenus(restaurantId string, userId string) ([]types.Menu, error) {
	defer utils.TimeTrack(time.Now(), "Menu -> Select Menu")
	var menus []types.Menu

	query := `SELECT * FROM menus WHERE restaurant_id = $1 AND user_id = $2`
	rows, err := r.db.Query(query, restaurantId, userId)
	if err != nil {
		return menus, err
	}

	for rows.Next() {
		var menu types.Menu
		err := rows.Scan(&menu.ID, &menu.UserID, &menu.RestaurantID, &menu.Name, &menu.Type, &menu.Json, &menu.Description, &menu.Language, &menu.IsActive, &menu.ExpiresAt, &menu.CreatedAt, &menu.UpdatedAt)
		if err != nil {
			fmt.Println("[ERROR] SelectMenus -> rows.Scan: ", err)
			continue
		}
		menus = append(menus, menu)
	}

	return menus, nil
}
