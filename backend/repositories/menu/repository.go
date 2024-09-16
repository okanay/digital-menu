package menuRepository

import (
	"database/sql"

	"github.com/okanay/digital-menu/types"
)

type Repository struct {
	db *sql.DB
}

func NewRepository(db *sql.DB) *Repository {
	return &Repository{db: db}
}

type MenuRepository interface {
	CreateMenu(req types.CreateMenuReq) (types.Menu, error)
	SelectMenu(id int) (types.Menu, error)
	SelectMenus(restaurantId int, userId int) ([]types.Menu, error)
	UpdateMenu(req types.UpdateMenuReq) (types.Menu, error)
	DeleteMenu(userId int, id int) error
}
