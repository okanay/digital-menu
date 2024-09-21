package sessionRepository

import (
	"time"

	"github.com/okanay/digital-menu/utils"
)

func (r *Repository) UpdateLastAccessed(id int) error {
	defer utils.TimeTrack(time.Now(), "Session -> Update Last Accessed")

	query := `UPDATE sessions SET last_accessed = NOW() WHERE id = $1`
	_, err := r.db.Exec(query, id)
	if err != nil {
		return err
	}

	return nil
}
