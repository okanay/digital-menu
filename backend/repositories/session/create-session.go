package sessionRepository

import (
	"time"

	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (r *Repository) CreateSession(req types.CreateSessionReq) error {
	defer utils.TimeTrack(time.Now(), "Session -> Create Session")

	query := `INSERT INTO sessions (user_id, token, expires_at, ip_address, user_agent) VALUES ($1, $2, $3, $4, $5)`
	_, err := r.db.Exec(query, req.UserID, req.Token, req.ExpiresAt, req.IPAddress, req.UserAgent)
	if err != nil {
		return err
	}

	return nil
}
