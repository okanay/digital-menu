package menuRepository

import (
	"fmt"
	"time"

	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (r *Repository) SelectMenus(userId int) ([]types.Menu, error) {
	defer utils.TimeTrack(time.Now(), "Menu -> Select Menus")
	var menus []types.Menu

	query := `SELECT * FROM menus WHERE user_id = $1`
	rows, err := r.db.Query(query, userId)
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
