package restaurantRepository

import "fmt"

func (r *Repository) DeleteRestaurant(id int, userID int) error {
	query := `DELETE FROM restaurants WHERE id = $1 AND user_id = $2`

	restaurant, err := r.SelectRestaurant(id)
	if restaurant.Name == "" {
		return fmt.Errorf("Restaurant not found.")
	}

	if restaurant.UserID != int64(userID) {
		return fmt.Errorf("You are not authorized to delete this restaurant.")
	}

	_, err = r.db.Exec(query, id, userID)
	if err != nil {
		return err
	}

	return nil
}
