package restaurantRepository

import (
	"fmt"
	"strings"
	"time"

	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (r *Repository) UpdateRestaurant(req types.UpdateRestaurantReq) (types.Restaurant, error) {
	defer utils.TimeTrack(time.Now(), "Restaurant -> Update Restaurant")

	var restaurant types.Restaurant
	var queryBuilder strings.Builder
	args := []interface{}{}
	argCount := 1

	queryBuilder.WriteString("UPDATE restaurants SET updated_at = NOW()")

	if req.Name != nil {
		slug, err := utils.GenerateSlug(*req.Name, false)
		if err != nil {
			return restaurant, err
		}

		queryBuilder.WriteString(fmt.Sprintf(", name = $%d, slug = $%d", argCount, argCount+1))
		args = append(args, *req.Name, slug)
		argCount = argCount + 2
	}
	if req.Location != nil {
		queryBuilder.WriteString(fmt.Sprintf(", location = $%d", argCount))
		args = append(args, *req.Location)
		argCount++
	}
	if req.Description != nil {
		queryBuilder.WriteString(fmt.Sprintf(", description = $%d", argCount))
		args = append(args, *req.Description)
		argCount++
	}
	if req.IsActive != nil {
		queryBuilder.WriteString(fmt.Sprintf(", is_active = $%d", argCount))
		args = append(args, *req.IsActive)
		argCount++
	}
	if req.MenuCount != nil {
		queryBuilder.WriteString(fmt.Sprintf(", menu_count = $%d", argCount))
		args = append(args, *req.MenuCount)
		argCount++
	}

	queryBuilder.WriteString(fmt.Sprintf(" WHERE id = $%d AND user_id = $%d RETURNING id, user_id, name, slug, location, description, is_active, menu_count, created_at, updated_at", argCount, argCount+1))
	args = append(args, req.ID, req.UserID)

	err := r.db.QueryRow(queryBuilder.String(), args...).Scan(
		&restaurant.ID, &restaurant.UserID, &restaurant.Name, &restaurant.Slug, &restaurant.Location,
		&restaurant.Description, &restaurant.IsActive, &restaurant.MenuCount,
		&restaurant.CreatedAt, &restaurant.UpdatedAt,
	)
	if err != nil {
		return restaurant, fmt.Errorf("failed to update restaurant: %w", err)
	}
	return restaurant, nil
}
