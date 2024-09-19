package userRepository

import (
	"time"

	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (r *Repository) CreateUser(req types.CreateUserReq) (types.User, error) {
	defer utils.TimeTrack(time.Now(), "User -> Create User")

	var user types.User
	hashPassword, err := utils.EncryptPassword(req.Password)

	if err != nil {
		return user, err
	}

	query := `INSERT INTO users (email, hashed_password) VALUES ($1, $2) RETURNING *`

	row := r.db.QueryRow(query, req.Email, hashPassword)
	err = utils.ScanStructByDBTags(row, &user)
	if err != nil {
		return user, err
	}

	return user, nil
}
