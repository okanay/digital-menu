package shopRepository

import (
	"time"

	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (r *Repository) CreateShop(req types.ShopRestaurantReq) (types.Shop, error) {
	defer utils.TimeTrack(time.Now(), "Shops -> Create Shop")
	shop := types.Shop{}

	slug, err := utils.GenerateSlug(req.Name, false)
	if err != nil {
		return shop, err
	}

	query := `INSERT INTO shops (user_id, name, slug) VALUES ($1, $2, $3) RETURNING *`
	row := r.db.QueryRow(query, req.UserID, req.Name, slug)
	err = utils.ScanStructByDBTags(row, &shop)
	if err != nil {
		return shop, err
	}

	return shop, nil
}
