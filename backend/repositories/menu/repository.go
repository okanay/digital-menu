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
	UpdateMenu(req types.UpdateMenuReq) (types.Menu, error)
}
