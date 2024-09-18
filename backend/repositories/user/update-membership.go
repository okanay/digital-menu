package userRepository

import "github.com/okanay/digital-menu/types"

func (r *Repository) UpdateMembership(membership types.MembershipType, userId string) error {
	query := `UPDATE users SET membership = $1 WHERE id = $2`

	_, err := r.db.Exec(query, membership, userId)
	if err != nil {
		return err
	}

	return nil
}
