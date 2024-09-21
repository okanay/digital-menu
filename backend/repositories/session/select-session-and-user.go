package sessionRepository

import (
	"time"

	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (r *Repository) SelectSessionAndUser(token string) (types.Session, types.User, error) {
	defer utils.TimeTrack(time.Now(), "Session -> Select Session And User")

	var session types.Session
	var user types.User

	query := `
		SELECT
			s.id, s.user_id, s.token, s.expires_at, s.created_at, s.ip_address, s.user_agent, s.last_accessed,
			u.id, u.email, u.hashed_password, u.created_at, u.updated_at, u.last_login, u.membership, u.email_verified
		FROM sessions s
		JOIN users u ON s.user_id = u.id
		WHERE s.token = $1`

	err := r.db.QueryRow(query, token).Scan(
		&session.ID, &session.UserID, &session.Token, &session.ExpiresAt, &session.CreatedAt, &session.IPAddress, &session.UserAgent, &session.LastAccessed,
		&user.ID, &user.Email, &user.HashedPassword, &user.CreatedAt, &user.UpdatedAt, &user.LastLogin, &user.Membership, &user.EmailVerified,
	)

	if err != nil {
		return session, user, err
	}

	return session, user, nil
}
