package userRepository

import (
	"time"

	"github.com/okanay/digital-menu/utils"
)

func (r *Repository) GenerateRandomPasswordResetToken(email string) (string, error) {
	defer utils.TimeTrack(time.Now(), "User -> Update Password Reset Token User")

	token := utils.GenerateRandomString(8)
	query := `UPDATE users SET password_reset_token = $1 WHERE email = $2`

	_, err := r.db.Exec(query, token, email)
	if err != nil {
		return token, err
	}

	return token, nil
}
