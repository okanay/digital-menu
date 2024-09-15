package sessionRepository

func (r *Repository) UpdateLastAccessed(id int) error {
	query := `UPDATE sessions SET last_accessed = NOW() WHERE id = $1`
	_, err := r.db.Exec(query, id)
	if err != nil {
		return err
	}

	return nil
}
