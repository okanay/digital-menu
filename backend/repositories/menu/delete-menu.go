package menuRepository

import (
	"fmt"
	"time"

	"github.com/okanay/digital-menu/utils"
)

func (r *Repository) DeleteMenu(userId int, id int) error {
	defer utils.TimeTrack(time.Now(), "Menu -> Delete Menu")

	query := `
	WITH deleted AS (
		DELETE FROM menus
		WHERE id = $1 AND user_id = $2
		RETURNING id
		)
		SELECT CASE WHEN COUNT(*) = 0 THEN 'Menu does not exist' ELSE NULL END
		FROM deleted;
		`

	var result string
	err := r.db.QueryRow(query, id, userId).Scan(&result)
	if err != nil {
		return err
	}

	if result == "Menu does not exist" {
		return fmt.Errorf(result)
	}

	return nil
}
