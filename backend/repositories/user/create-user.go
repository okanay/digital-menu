package userRepository

import (
	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (r *UserRepository) CreateUser(req types.CreateUserReq) (types.User, error) {
	var user types.User

	hashPassword, err := utils.EncryptPassword(req.Password)
	if err != nil {
		return user, err
	}

	query := `INSERT INTO users (email, hashed_password) VALUES ($1, $2) RETURNING id, email, hashed_password, created_at, updated_at, last_login, membership, email_verified, email_verification_token, password_reset_token`

	err = r.db.QueryRow(query, req.Email, hashPassword).Scan(&user.ID, &user.Email, &user.HashedPassword, &user.CreatedAt, &user.UpdatedAt, &user.LastLogin, &user.Membership, &user.EmailVerified, &user.EmailVerificationToken, &user.PasswordResetToken)
	if err != nil {
		return user, err
	}

	return user, nil
}
