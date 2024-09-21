package userRepository

import (
	"time"

	"github.com/okanay/digital-menu/utils"
)

func (r *Repository) UpdateVerify(email string, state bool) error {
	defer utils.TimeTrack(time.Now(), "User -> Update Email Verified")

	query := `UPDATE users SET email_verified = $1 WHERE email = $2`
	_, err := r.db.Exec(query, state, email)
	if err != nil {
		return err
	}

	return nil
}
