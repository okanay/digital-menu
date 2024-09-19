package menuRepository

import (
	"fmt"
	"strings"

	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (r *Repository) UpdateMenu(req types.UpdateMenuReq) (types.Menu, error) {
	var menu types.Menu
	var queryBuilder strings.Builder
	args := []interface{}{}
	argCount := 1

	queryBuilder.WriteString("UPDATE menus SET updated_at = NOW()")

	if req.Name != nil {
		queryBuilder.WriteString(fmt.Sprintf(", name = $%d", argCount))
		args = append(args, *req.Name)
		argCount++
	}
	if req.Type != nil {
		queryBuilder.WriteString(fmt.Sprintf(", type = $%d", argCount))
		args = append(args, *req.Type)
		argCount++
	}
	if req.Json != nil {
		queryBuilder.WriteString(fmt.Sprintf(", json = $%d", argCount))
		args = append(args, *req.Json)
		argCount++
	}
	if req.Description != nil {
		queryBuilder.WriteString(fmt.Sprintf(", description = $%d", argCount))
		args = append(args, *req.Description)
		argCount++
	}
	if req.Language != nil {
		queryBuilder.WriteString(fmt.Sprintf(", language = $%d", argCount))
		args = append(args, *req.Language)
		argCount++
	}
	if req.IsActive != nil {
		queryBuilder.WriteString(fmt.Sprintf(", is_active = $%d", argCount))
		args = append(args, *req.IsActive)
		argCount++
	}
	if req.ExpiresAt != nil {
		queryBuilder.WriteString(fmt.Sprintf(", expires_at = $%d", argCount))
		args = append(args, *req.ExpiresAt)
		argCount++
	}

	queryBuilder.WriteString(fmt.Sprintf(" WHERE id = $%d AND user_id = $%d RETURNING id, user_id, restaurant_id, name, type, json, description, language, is_active, expires_at, created_at, updated_at", argCount, argCount+1))
	args = append(args, req.ID, req.UserID)

	row := r.db.QueryRow(queryBuilder.String(), args...)
	err := utils.ScanStructByDBTags(row, &menu)

	if err != nil {
		return menu, err
	}

	return menu, nil
}
