package userRepository

import (
	"time"

	"github.com/okanay/digital-menu/utils"
)

func (r *Repository) UpdateLastLogin(email string) error {
	defer utils.TimeTrack(time.Now(), "User -> Update Last Login User")

	now := time.Now()
	query := `UPDATE users SET last_login=$1, updated_at=$1 WHERE email=$2`

	_, err := r.db.Exec(query, now, email)
	if err != nil {
		return err
	}

	return nil
}
