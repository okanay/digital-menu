package shopRepository

import (
	"fmt"
	"time"

	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (r *Repository) SelectShopsBySlug(slug string) ([]types.Shop, error) {
	defer utils.TimeTrack(time.Now(), "Shops -> Select Shops By Slug")

	var shops []types.Shop
	query := `SELECT * FROM shops WHERE slug = $1`

	rows, err := r.db.Query(query, slug)
	if err != nil {
		return shops, err
	}

	defer rows.Close()
	for rows.Next() {
		var res types.Shop
		err := utils.ScanStructByDBTagsForRows(rows, &res)

		if err != nil {
			fmt.Println("[ERROR] failed to scan shop: ", err)
			continue
		}

		shops = append(shops, res)
	}

	return shops, nil
}
