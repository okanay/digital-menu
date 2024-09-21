package userRepository

import (
	"time"

	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (r *Repository) SelectVerifyToken(email string, token string) (types.EmailVerification, error) {
	defer utils.TimeTrack(time.Now(), "User -> Select Reset Token")
	var ev types.EmailVerification

	query := `SELECT * FROM email_verification_tokens WHERE email = $1 AND token = $2 AND is_used = false AND expires_at > NOW()`
	row := r.db.QueryRow(query, email, token)

	err := utils.ScanStructByDBTags(row, &ev)
	if err != nil {
		return ev, err
	}

	go func() {
		query := `UPDATE email_verification_tokens SET is_used = true WHERE email = $1 AND token = $2`
		_, _ = r.db.Exec(query, email, token)
	}()

	return ev, nil
}
