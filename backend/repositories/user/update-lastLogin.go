package userRepository

import "time"

func (r *Repository) UpdateLastLogin(email string) error {
	now := time.Now()
	query := `UPDATE users SET last_login=$1, updated_at=$1 WHERE email=$2`

	_, err := r.db.Exec(query, now, email)
	if err != nil {
		return err
	}

	return nil
}
