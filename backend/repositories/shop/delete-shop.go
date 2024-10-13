package shopRepository

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/okanay/digital-menu/utils"
)

func (r *Repository) DeleteShop(id string, userID int) error {
	defer utils.TimeTrack(time.Now(), "Shops -> Delete Shop")

	query := `
	WITH deleted AS (
		DELETE FROM shops
		WHERE unique_id = $1 AND user_id = $2
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
		return fmt.Errorf("Shop not found.")
	}

	fmt.Println(result)
	return nil
}
