package sessionRepository

import (
	"time"

	"github.com/okanay/digital-menu/utils"
)

func (r *Repository) DeleteSessionByTokenID(id int) error {
	defer utils.TimeTrack(time.Now(), "Session -> Delete Session By Token ID")

	query := `DELETE FROM sessions WHERE id = $1`
	_, err := r.db.Exec(query, id)

	if err != nil {
		return err
	}

	return nil
}
