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
	if req.IsActive != nil {
		queryBuilder.WriteString(fmt.Sprintf(", is_active = $%d", argCount))
		args = append(args, *req.IsActive)
		argCount++
	}

	queryBuilder.WriteString(fmt.Sprintf(" WHERE unique_id = $%d AND user_id = $%d RETURNING *", argCount, argCount+1))
	args = append(args, req.UniqueID, req.UserID)

	row := r.db.QueryRow(queryBuilder.String(), args...)
	err := utils.ScanStructByDBTags(row, &menu)

	if err != nil {
		return menu, err
	}

	return menu, nil
}
