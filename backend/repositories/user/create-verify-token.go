package userRepository

import (
	"time"

	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (r *Repository) CreateVerifyToken(email string) (types.EmailVerification, error) {
	defer utils.TimeTrack(time.Now(), "User -> Create Verified Token")
	var ev types.EmailVerification

	token := utils.GenerateRandomString(20)
	query := `INSERT INTO email_verification_tokens (email, token) VALUES ($1, $2) RETURNING *`

	row := r.db.QueryRow(query, email, token)
	err := utils.ScanStructByDBTags(row, &ev)
	if err != nil {
		return ev, err
	}

	return ev, nil
}
