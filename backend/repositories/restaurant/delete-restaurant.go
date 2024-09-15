package restaurantRepository

func (r *Repository) DeleteRestaurant(id int, userID int) error {
	query := `DELETE FROM restaurants WHERE id = $1 AND user_id = $2`

	_, err := r.db.Exec(query, id, userID)
	if err != nil {
		return err
	}

	return nil
}
