package sessionRepository

import (
	"database/sql"

	"github.com/okanay/digital-menu/types"
)

type SessionRepository struct {
	db *sql.DB
}

func NewSessionRepository(db *sql.DB) *SessionRepository {
	return &SessionRepository{db: db}
}

type ISessionRepository interface {
	SelectSessionAndUserByToken(token string) (types.Session, types.User, error)
	SelectSessionByToken(token string) (types.Session, error)
	CreateSession(req types.CreateSessionReq) error
	DeleteSessionByTokenID(id int) error
	DeleteSessionByUserID(userID int) error
}
