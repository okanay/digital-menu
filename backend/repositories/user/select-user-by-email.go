package userRepository

import "github.com/okanay/digital-menu/types"

func (r *UserRepository) SelectUserByEmail(email string) (types.User, error) {
	var user types.User

	query := `SELECT id, email, hashed_password, created_at, updated_at, last_login, membership, email_verified, email_verification_token, password_reset_token FROM users WHERE email = $1`

	err := r.db.QueryRow(query, email).Scan(&user.ID, &user.Email, &user.HashedPassword, &user.CreatedAt, &user.UpdatedAt, &user.LastLogin, &user.Membership, &user.EmailVerified, &user.EmailVerificationToken, &user.PasswordResetToken)
	if err != nil {
		return user, err
	}

	return user, nil
}
