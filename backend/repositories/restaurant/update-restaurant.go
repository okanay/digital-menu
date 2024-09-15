package restaurantRepository

import "github.com/okanay/digital-menu/types"

func (r *Repository) UpdateRestaurant(req types.UpdateRestaurantReq) (types.Restaurant, error) {
	var restaurant types.Restaurant
	query := `UPDATE restaurants SET name = $1, location = $2, description = $3, is_active = $4, menu_count = $5 WHERE id = $6 RETURNING id, user_id, name, location, description, is_active, menu_count, created_at, updated_at`

	err := r.db.QueryRow(query, req.Name, req.Location, req.Description, req.IsActive, req.MenuCount, req.ID).Scan(&restaurant.ID, &restaurant.UserID, &restaurant.Name, &restaurant.Location, &restaurant.Description, &restaurant.IsActive, &restaurant.MenuCount, &restaurant.CreatedAt, &restaurant.UpdatedAt)
	if err != nil {
		return restaurant, err
	}

	return restaurant, nil
}
