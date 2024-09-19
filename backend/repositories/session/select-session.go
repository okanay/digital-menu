package sessionRepository

import (
	"time"

	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (r *Repository) SelectSession(token string) (types.Session, error) {
	defer utils.TimeTrack(time.Now(), "Session -> Select Session")

	var session types.Session
	query := `SELECT * FROM sessions WHERE token = $1`

	row := r.db.QueryRow(query, token)
	err := utils.ScanStructByDBTags(row, &session)
	if err != nil {
		return session, err
	}

	return session, nil
}
