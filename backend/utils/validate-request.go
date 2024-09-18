package utils

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator"
)

// buradaki req typescript deki any gibi olmali yani herhangi bir struct olabilir
func ValidateRequest(c *gin.Context, req interface{}) error {
	// Parse the JSON request and populate the User struct
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request."})
		return err
	}

	validate := validator.New()
	err := validate.Struct(req)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return err
	}

	return nil
}
