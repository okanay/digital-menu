package imageRepository

import (
	"time"

	"github.com/okanay/digital-menu/utils"
)

func (r *Repository) DeleteImages(uniqueName string, userId int) error {
	defer utils.TimeTrack(time.Now(), "Images -> Delete Images")

	query := `DELETE FROM images WHERE unique_name = $1 AND user_id = $2`
	_, err := r.db.Exec(query, uniqueName, userId)
	if err != nil {
		return err
	}

	return nil
}
