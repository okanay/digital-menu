package userRepository

import (
	"time"

	"github.com/okanay/digital-menu/utils"
)

func (r *Repository) UpdatePassword(email string, newPassword string) error {
	defer utils.TimeTrack(time.Now(), "User -> Update Password User")

	hashPassword, err := utils.EncryptPassword(newPassword)
	if err != nil {
		return err
	}

	query := `UPDATE users SET hashed_password = $1 WHERE email = $2`

	_, err = r.db.Exec(query, hashPassword, email)
	if err != nil {
		return err
	}

	return nil
}
