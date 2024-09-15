package userRepository

import "github.com/okanay/digital-menu/utils"

func (r *Repository) UpdatePasswordResetToken(email string) error {
	token := utils.GenerateRandomString(8)
	query := `UPDATE users SET password_reset_token = $1 WHERE email = $2`

	_, err := r.db.Exec(query, token, email)
	if err != nil {
		return err
	}

	return nil
}
