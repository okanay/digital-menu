package restaurantRepository

import "github.com/okanay/digital-menu/types"

func (r *Repository) CreateRestaurant(req types.CreateRestaurantReq) (types.Restaurant, error) {
	restaurant := types.Restaurant{}
	query := `INSERT INTO restaurants (user_id, name, location, description) VALUES ($1, $2, $3, $4) RETURNING id, user_id, name, location, description, is_active, menu_count, created_at, updated_at`

	err := r.db.QueryRow(query, req.UserID, req.Name, req.Location, req.Description).Scan(&restaurant.ID, &restaurant.UserID, &restaurant.Name, &restaurant.Location, &restaurant.Description, &restaurant.IsActive, &restaurant.MenuCount, &restaurant.CreatedAt, &restaurant.UpdatedAt)
	if err != nil {
		return restaurant, err
	}

	return restaurant, nil
}
