package sessionRepository

import (
	"time"

	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (r *Repository) SelectSession(token string) (types.Session, error) {
	defer utils.TimeTrack(time.Now(), "Session -> Select Session")

	var session types.Session

	query := `SELECT id, user_id, token, expires_at, created_at, ip_address, user_agent, last_accessed FROM sessions WHERE token = $1`
	err := r.db.QueryRow(query, token).Scan(&session.ID, &session.UserID, &session.Token, &session.ExpiresAt, &session.CreatedAt, &session.IPAddress, &session.UserAgent, &session.LastAccessed)

	if err != nil {
		return session, err
	}

	return session, nil
}
