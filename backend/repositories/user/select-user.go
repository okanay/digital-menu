package userRepository

import (
	"time"

	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (r *Repository) SelectUser(email string) (types.User, error) {
	defer utils.TimeTrack(time.Now(), "User -> Select User")

	var user types.User

	query := `SELECT id, email, hashed_password, created_at, updated_at, last_login, membership, email_verified, email_verification_token, password_reset_token FROM users WHERE email = $1`

	err := r.db.QueryRow(query, email).Scan(&user.ID, &user.Email, &user.HashedPassword, &user.CreatedAt, &user.UpdatedAt, &user.LastLogin, &user.Membership, &user.EmailVerified, &user.EmailVerificationToken, &user.PasswordResetToken)
	if err != nil {
		return user, err
	}

	return user, nil
}
