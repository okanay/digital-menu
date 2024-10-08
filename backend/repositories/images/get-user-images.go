package imageRepository

import (
	"fmt"
	"time"

	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (r *Repository) GetUserImages(userId int) ([]types.Image, error) {
	defer utils.TimeTrack(time.Now(), "Images -> Get User Images")

	var images []types.Image
	query := `SELECT * FROM images WHERE user_id = $1`

	rows, err := r.db.Query(query, userId)
	if err != nil {
		return images, err
	}

	defer rows.Close()
	for rows.Next() {
		var res types.Image

		err := utils.ScanStructByDBTagsForRows(rows, &res)
		if err != nil {
			fmt.Println("[ERROR] failed to scan images: ", err)
			continue
		}

		images = append(images, res)
	}

	return images, nil
}
