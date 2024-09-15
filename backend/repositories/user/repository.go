package userRepository

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

type UserRepository interface {
	CreateUser(req types.CreateUserReq) (types.User, error)
	SelectUserByEmail(email string) (types.User, error)
	UpdatePasswordByEmail(req types.UpdatePasswordReq) error
	UpdateResetTokenByEmail(email string) error
	UpdateLastLoginByEmail(email string) error
}
