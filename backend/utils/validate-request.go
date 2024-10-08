package utils

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator"
)

func ValidateRequest(c *gin.Context, req interface{}) error {
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request.", "message": err.Error()})
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

func ValidateRequestData(c *gin.Context, req interface{}, jsonData string) error {
    fmt.Println("jsonData: ", jsonData)

	if err := json.Unmarshal([]byte(jsonData), req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON format", "message": err.Error()})
		return err
	}

	// Validasyonu yap
	validate := validator.New()
	if err := validate.Struct(req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Validation failed", "message": err.Error()})
		return err
	}

	return nil
}
