package userRepository

import (
	"time"

	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (r *Repository) SelectUser(email string) (types.User, error) {
	defer utils.TimeTrack(time.Now(), "User -> Select User")
	var user types.User

	query := `SELECT * FROM users WHERE email = $1`

	row := r.db.QueryRow(query, email)
	err := utils.ScanStructByDBTags(row, &user)
	if err != nil {
		return user, err
	}

	return user, nil
}
