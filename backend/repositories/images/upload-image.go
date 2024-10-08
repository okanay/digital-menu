package imageRepository

import (
	"time"

	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (r *Repository) UploadImage(req types.UploadImageReq) error {
	defer utils.TimeTrack(time.Now(), "Images -> Upload Image")

	query := `INSERT INTO images (user_id, size, type, name, unique_name, url, description, public_access) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`
	_, err := r.db.Exec(query, req.UserID, req.Size, req.Type, req.Name, req.UniqueName, req.URL, req.Description, req.PublicAccess)
	if err != nil {
		return err
	}

	return nil
}
