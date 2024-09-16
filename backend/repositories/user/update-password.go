package userRepository

import (
	"time"

	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (r *Repository) UpdatePassword(req types.UpdatePasswordReq) error {
	defer utils.TimeTrack(time.Now(), "User -> Update Password User")

	hashPassword, err := utils.EncryptPassword(req.NewPassword)
	if err != nil {
		return err
	}

	query := `UPDATE users SET hashed_password = $1 WHERE email = $2`

	_, err = r.db.Exec(query, hashPassword, req.Email)
	if err != nil {
		return err
	}

	return nil
}
