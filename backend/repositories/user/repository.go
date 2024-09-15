package userRepository

import (
	"database/sql"

	"github.com/okanay/digital-menu/types"
)

type UserRepository struct {
	db *sql.DB
}

func NewUserRepository(db *sql.DB) *UserRepository {
	return &UserRepository{db: db}
}

type IUserRepository interface {
	CreateUser(types.CreateUserReq) (types.User, error)
	SelectUserByEmail(email string) (types.User, error)
	UpdatePasswordByEmail(types.UpdatePasswordReq) error
	UpdateResetTokenByEmail(email string) error
}
