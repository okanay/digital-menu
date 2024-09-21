package userRepository

import (
	"time"

	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (r *Repository) SelectResetToken(email string, token string) (types.ResetPassword, error) {
	defer utils.TimeTrack(time.Now(), "User -> Select Reset Token")
	var rp types.ResetPassword

	query := `SELECT * FROM password_reset_tokens WHERE email = $1 AND token = $2 AND is_used = false AND expires_at > NOW()`
	row := r.db.QueryRow(query, email, token)

	err := utils.ScanStructByDBTags(row, &rp)
	if err != nil {
		return rp, err
	}

	go func() {
		query := `UPDATE password_reset_tokens SET is_used = true WHERE email = $1 AND token = $2`
		_, _ = r.db.Exec(query, email, token)
	}()

	return rp, nil
}
