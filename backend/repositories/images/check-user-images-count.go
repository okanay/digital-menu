package imageRepository

import (
	"fmt"
	"time"

	"github.com/okanay/digital-menu/configs"
	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (r *Repository) CheckUserImagesCount(userID int, membership types.MembershipType) error {
	defer utils.TimeTrack(time.Now(), "Images -> Check User Images Count")

	query := `SELECT COUNT(*) FROM images WHERE user_id = $1`
	var count int

	err := r.db.QueryRow(query, userID).Scan(&count)
	if err != nil {
		return err
	}

	switch membership {
	case types.Basic:
		if count >= configs.BASIC_MAX_IMAGE_COUNT {
			return fmt.Errorf("You can upload %d images at most", configs.BASIC_MAX_IMAGE_COUNT)
		}
	case types.Pro:
		if count >= configs.PRO_MAX_IMAGE_COUNT {
			return fmt.Errorf("You can upload %d images at most", configs.PRO_MAX_IMAGE_COUNT)
		}
	case types.Premium:
		if count >= configs.PREMIUM_MAX_IMAGE_COUNT {
			return fmt.Errorf("You can upload %d images at most", configs.PREMIUM_MAX_IMAGE_COUNT)
		}
	}

	return nil
}
