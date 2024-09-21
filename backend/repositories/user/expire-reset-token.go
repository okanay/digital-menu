package userRepository

import (
	"time"

	"github.com/okanay/digital-menu/utils"
)

func (r *Repository) ExpireResetToken(email string, token string) error {
	defer utils.TimeTrack(time.Now(), "User -> Expire Reset Token")
	query := `UPDATE password_reset_tokens SET expires_at = NOW() - INTERVAL '1 day' WHERE email = $1 AND token = $2`

	_, err := r.db.Exec(query, email, token)
	if err != nil {
		return err
	}

	return nil
}
