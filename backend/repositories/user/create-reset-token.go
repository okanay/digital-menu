package userRepository

import (
	"time"

	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (r *Repository) CreateResetToken(email string) (types.ResetPassword, error) {
	defer utils.TimeTrack(time.Now(), "User -> Create Reset Token")
	var rp types.ResetPassword

	token := utils.GenerateRandomString(20)
	query := `INSERT INTO password_reset_tokens (email, token) VALUES ($1, $2) RETURNING *`

	row := r.db.QueryRow(query, email, token)
	err := utils.ScanStructByDBTags(row, &rp)
	if err != nil {
		return rp, err
	}

	return rp, nil
}
