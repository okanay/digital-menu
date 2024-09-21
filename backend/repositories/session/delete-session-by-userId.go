package sessionRepository

import (
	"time"

	"github.com/okanay/digital-menu/utils"
)

func (r *Repository) DeleteSessionByUserID(userID int) error {
	defer utils.TimeTrack(time.Now(), "Session -> Delete Session By User ID")

	query := `DELETE FROM sessions WHERE user_id = $1`
	_, err := r.db.Exec(query, userID)

	if err != nil {
		return err
	}

	return nil
}
