package sessionRepository

func (r *SessionRepository) DeleteSessionByUserID(userID int) error {
	query := `DELETE FROM sessions WHERE user_id = $1`
	_, err := r.db.Exec(query, userID)

	if err != nil {
		return err
	}

	return nil
}
