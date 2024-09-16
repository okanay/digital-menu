package menuRepository

import (
	"time"

	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (r *Repository) SelectMenu(id int) (types.Menu, error) {
	defer utils.TimeTrack(time.Now(), "Menu -> Select Menu")

	var menu types.Menu

	query := `SELECT * FROM menus WHERE id = $1`
	err := r.db.QueryRow(query, id).Scan(&menu.ID, &menu.UserID, &menu.RestaurantID, &menu.Name, &menu.Type, &menu.Json, &menu.Description, &menu.Language, &menu.IsActive, &menu.ExpiresAt, &menu.CreatedAt, &menu.UpdatedAt)
	if err != nil {
		return menu, err
	}

	return menu, nil
}
