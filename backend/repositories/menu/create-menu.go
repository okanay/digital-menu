package menuRepository

import (
	"fmt"
	"time"

	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (r *Repository) CreateMenu(ShopID int, req types.CreateMenuReq) (types.Menu, error) {
	defer utils.TimeTrack(time.Now(), "Menu -> Create Menu")

	var menu types.Menu
	query := `
		INSERT INTO menus (
			user_id, shop_id, shop_unique_id, name, type, json, is_active
		) VALUES (
			$1, $2, $3, $4, $5, $6, $7
		) RETURNING
			*;
	`

	row := r.db.QueryRow(query, req.UserID, ShopID, req.ShopUniqueID, req.Name, req.Type, req.Json, req.IsActive)
	err := utils.ScanStructByDBTags(row, &menu)
	if err != nil {
		return menu, err
	}

	if err != nil {
		return types.Menu{}, fmt.Errorf("failed to create menu: %w", err)
	}

	return menu, nil
}
