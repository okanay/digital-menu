package sessionRepository

import "github.com/okanay/digital-menu/types"

func (r *Repository) CreateSession(req types.CreateSessionReq) error {
	query := `INSERT INTO sessions (user_id, token, expires_at, ip_address, user_agent) VALUES ($1, $2, $3, $4, $5)`
	_, err := r.db.Exec(query, req.UserID, req.Token, req.ExpiresAt, req.IPAddress, req.UserAgent)
	if err != nil {
		return err
	}

	return nil
}
