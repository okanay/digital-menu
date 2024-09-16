package menuRepository

import (
	"fmt"
	"time"

	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (r *Repository) CreateMenu(req types.CreateMenuReq) (types.Menu, error) {
	defer utils.TimeTrack(time.Now(), "Menu -> Create Menu")

	var menu types.Menu

	query := `
		INSERT INTO menus (
			user_id, restaurant_id, name, type, json, description, language, is_active, expires_at
		) VALUES (
			$1, $2, $3, $4, $5, $6, $7, $8, $9
		) RETURNING
			id, user_id, restaurant_id, name, type, json, description, language, is_active, expires_at, created_at, updated_at
	`

	err := r.db.QueryRow(
		query, req.UserID, req.RestaurantID, req.Name, req.Type, req.Json, req.Description, req.Language, req.IsActive, req.ExpiresAt,
	).Scan(
		&menu.ID, &menu.UserID, &menu.RestaurantID, &menu.Name, &menu.Type, &menu.Json, &menu.Description, &menu.Language, &menu.IsActive, &menu.ExpiresAt, &menu.CreatedAt, &menu.UpdatedAt,
	)
	if err != nil {
		return types.Menu{}, fmt.Errorf("failed to create menu: %w", err)
	}

	return menu, nil
}
