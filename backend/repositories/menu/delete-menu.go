package menuRepository

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/okanay/digital-menu/utils"
)

func (r *Repository) DeleteMenu(uniqueId string, userId int) error {
	defer utils.TimeTrack(time.Now(), "Menu -> Delete Menu")

	query := `
	WITH deleted AS (
		DELETE FROM menus
		WHERE unique_id = $1 AND user_id = $2
		RETURNING id
		)
		SELECT CASE WHEN COUNT(*) = 0 THEN true ELSE NULL END
		FROM deleted;
		`

	var result sql.NullBool
	err := r.db.QueryRow(query, uniqueId, userId).Scan(&result)
	if err != nil {
		return err
	}

	if result.Valid {
		return fmt.Errorf("Menu not found.")
	}

	return nil
}
