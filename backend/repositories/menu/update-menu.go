package menuRepository

import (
	"fmt"

	"github.com/okanay/digital-menu/types"
)

func (r *Repository) UpdateMenu(req types.UpdateMenuReq) (types.Menu, error) {
	var menu types.Menu
	query := "UPDATE menus SET updated_at = NOW(), "
	args := []interface{}{}
	argCount := 1

	if req.Name != nil {
		query += fmt.Sprintf("name = $%d, ", argCount)
		args = append(args, *req.Name)
		argCount++
	}
	if req.Type != nil {
		query += fmt.Sprintf("type = $%d, ", argCount)
		args = append(args, *req.Type)
		argCount++
	}
	if req.Json != nil {
		query += fmt.Sprintf("json = $%d, ", argCount)
		args = append(args, *req.Json)
		argCount++
	}
	if req.Description != nil {
		query += fmt.Sprintf("description = $%d, ", argCount)
		args = append(args, *req.Description)
		argCount++
	}
	if req.Language != nil {
		query += fmt.Sprintf("language = $%d, ", argCount)
		args = append(args, *req.Language)
		argCount++
	}
	if req.IsActive != nil {
		query += fmt.Sprintf("is_active = $%d, ", argCount)
		args = append(args, *req.IsActive)
		argCount++
	}
	if req.ExpiresAt != nil {
		query += fmt.Sprintf("expires_at = $%d, ", argCount)
		args = append(args, *req.ExpiresAt)
		argCount++
	}

	query = query[:len(query)-2]

	query += fmt.Sprintf(" WHERE id = $%d AND restaurant_id = $%d RETURNING id, restaurant_id, name, type, json, description, language, is_active, expires_at, created_at, updated_at", argCount, argCount+1)
	args = append(args, req.ID, req.RestaurantID)

	err := r.db.QueryRow(query, args...).Scan(
		&menu.ID, &menu.RestaurantID, &menu.Name, &menu.Type, &menu.Json,
		&menu.Description, &menu.Language, &menu.IsActive, &menu.ExpiresAt,
		&menu.CreatedAt, &menu.UpdatedAt,
	)
	if err != nil {
		return menu, err
	}
	return menu, nil
}
