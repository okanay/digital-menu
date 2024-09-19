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

	defer rows.Close()
	for rows.Next() {
		var res types.Menu
		err := utils.ScanStructByDBTagsForRows(rows, &res)

		if err != nil {
			fmt.Println("[ERROR] failed to scan menu: ", err)
			continue
		}

		menus = append(menus, res)
	}

	return menus, nil
}
