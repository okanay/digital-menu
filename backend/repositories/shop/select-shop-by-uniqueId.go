package shopRepository

import (
	"time"

	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (r *Repository) SelectShopByUniqueID(id string) (types.Shop, error) {
	defer utils.TimeTrack(time.Now(), "Shops -> Select Shop By Unique ID")

	var shop types.Shop
	query := `SELECT * FROM shops WHERE unique_id = $1`

	row := r.db.QueryRow(query, id)
	err := utils.ScanStructByDBTags(row, &shop)
	if err != nil {
		return shop, err
	}

	return shop, nil
}
