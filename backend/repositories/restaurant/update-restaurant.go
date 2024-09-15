package restaurantRepository

import (
	"fmt"

	"github.com/okanay/digital-menu/types"
)

func (r *Repository) UpdateRestaurant(req types.UpdateRestaurantReq) (types.Restaurant, error) {
	var restaurant types.Restaurant
	query := "UPDATE restaurants SET updated_at = NOW(), "
	args := []interface{}{}
	argCount := 1

	if req.Name != nil {
		query += fmt.Sprintf("name = $%d, ", argCount)
		args = append(args, *req.Name)
		argCount++
	}
	if req.Location != nil {
		query += fmt.Sprintf("location = $%d, ", argCount)
		args = append(args, *req.Location)
		argCount++
	}
	if req.Description != nil {
		query += fmt.Sprintf("description = $%d, ", argCount)
		args = append(args, *req.Description)
		argCount++
	}
	if req.IsActive != nil {
		query += fmt.Sprintf("is_active = $%d, ", argCount)
		args = append(args, *req.IsActive)
		argCount++
	}
	if req.MenuCount != nil {
		query += fmt.Sprintf("menu_count = $%d, ", argCount)
		args = append(args, *req.MenuCount)
		argCount++
	}

	// Remove trailing comma and space
	query = query[:len(query)-2]

	query += fmt.Sprintf(" WHERE id = $%d AND user_id = $%d RETURNING id, user_id, name, location, description, is_active, menu_count, created_at, updated_at", argCount, argCount+1)
	args = append(args, req.ID, req.UserID)

	err := r.db.QueryRow(query, args...).Scan(
		&restaurant.ID, &restaurant.UserID, &restaurant.Name, &restaurant.Location,
		&restaurant.Description, &restaurant.IsActive, &restaurant.MenuCount,
		&restaurant.CreatedAt, &restaurant.UpdatedAt,
	)
	if err != nil {
		return restaurant, err
	}
	return restaurant, nil
}
