package sessionRepository

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

type SessionRepository interface {
	CreateSession(req types.CreateSessionReq) error
	DeleteSessionByTokenID(id int) error
	DeleteSessionByUserID(userID int) error
	SelectSessionAndUserByToken(token string) (types.Session, types.User, error)
	SelectSessionByToken(token string) (types.Session, error)
}
