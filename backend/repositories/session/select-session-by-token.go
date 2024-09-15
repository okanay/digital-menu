package sessionRepository

import "github.com/okanay/digital-menu/types"

func (r *SessionRepository) SelectSessionByToken(token string) (types.Session, error) {
	var session types.Session

	query := `SELECT id, user_id, token, expires_at, created_at, ip_address, user_agent, last_accessed FROM sessions WHERE token = $1`
	err := r.db.QueryRow(query, token).Scan(&session.ID, &session.UserID, &session.Token, &session.ExpiresAt, &session.CreatedAt, &session.IPAddress, &session.UserAgent, &session.LastAccessed)

	if err != nil {
		return session, err
	}

	return session, nil
}
