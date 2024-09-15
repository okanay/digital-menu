package sessionRepository

func (r *SessionRepository) DeleteSessionByTokenID(id int) error {
	query := `DELETE FROM sessions WHERE id = $1`
	_, err := r.db.Exec(query, id)

	if err != nil {
		return err
	}

	return nil
}
