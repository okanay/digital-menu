package utils

import "github.com/go-playground/validator"

var Validate *validator.Validate

func ValidateInit() {
	Validate = validator.New()
}
