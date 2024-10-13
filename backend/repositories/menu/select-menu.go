package menuRepository

import (
	"time"

	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (r *Repository) SelectMenu(id string) (types.Menu, error) {
	defer utils.TimeTrack(time.Now(), "Menu -> Select Menu")
	var menu types.Menu

	query := `SELECT * FROM menus WHERE unique_id = $1`
	row := r.db.QueryRow(query, id)
	err := utils.ScanStructByDBTags(row, &menu)
	if err != nil {
		return menu, err
	}

	return menu, nil
}
