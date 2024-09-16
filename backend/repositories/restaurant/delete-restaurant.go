package restaurantRepository

import (
	"fmt"
	"time"

	"github.com/okanay/digital-menu/utils"
)

func (r *Repository) DeleteRestaurant(id int, userID int) error {
	defer utils.TimeTrack(time.Now(), "Restaurant -> Delete Restaurant")

	query := `
	WITH deleted AS (
		DELETE FROM restaurants
		WHERE id = $1 AND user_id = $2
		RETURNING id
	)
	SELECT CASE WHEN COUNT(*) = 0 THEN 'Restaurant does not exist' ELSE NULL END
	FROM deleted;
	`

	var result string
	err := r.db.QueryRow(query, id, userID).Scan(&result)
	if err != nil {
		return err
	}

	if result == "Restaurant does not exist" {
		return fmt.Errorf(result)
	}

	return nil
}
