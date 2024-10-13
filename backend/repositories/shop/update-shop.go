package shopRepository

import (
	"fmt"
	"strings"
	"time"

	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (r *Repository) UpdateShop(req types.UpdateShopReq) (types.Shop, error) {
	defer utils.TimeTrack(time.Now(), "Shops -> Update Shop")

	var shop types.Shop
	var queryBuilder strings.Builder
	args := []interface{}{}
	argCount := 1

	queryBuilder.WriteString("UPDATE shops SET updated_at = NOW()")

	if req.Name != nil {
		slug, err := utils.GenerateSlug(*req.Name, false)
		if err != nil {
			return shop, err
		}

		queryBuilder.WriteString(fmt.Sprintf(", name = $%d, slug = $%d", argCount, argCount+1))
		args = append(args, *req.Name, slug)
		argCount = argCount + 2
	}
	if req.IsActive != nil {
		queryBuilder.WriteString(fmt.Sprintf(", is_active = $%d", argCount))
		args = append(args, *req.IsActive)
		argCount++
	}

	queryBuilder.WriteString(fmt.Sprintf(" WHERE unique_id = $%d AND user_id = $%d RETURNING *", argCount, argCount+1))
	args = append(args, req.UniqueID, req.UserID)

	row := r.db.QueryRow(queryBuilder.String(), args...)
	err := utils.ScanStructByDBTags(row, &shop)

	if err != nil {
		return shop, err
	}

	return shop, nil
}
