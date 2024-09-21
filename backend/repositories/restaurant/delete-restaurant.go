package restaurantRepository

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/okanay/digital-menu/utils"
)

func (r *Repository) DeleteRestaurant(id string, userID int) error {
	defer utils.TimeTrack(time.Now(), "Restaurant -> Delete Restaurant")

	// "error": "sql: Scan error on column index 0, name \"case\": converting NULL to string is unsupported"

	query := `
	WITH deleted AS (
		DELETE FROM restaurants
		WHERE id = $1 AND user_id = $2
		RETURNING id
	)
	SELECT CASE WHEN COUNT(*) = 0 THEN true ELSE NULL END
	FROM deleted;
	`

	var result sql.NullBool
	err := r.db.QueryRow(query, id, userID).Scan(&result)
	if err != nil {
		return err
	}

	if result.Valid {
		return fmt.Errorf("Restaurant not found.")
	}

	fmt.Println(result)
	return nil
}
