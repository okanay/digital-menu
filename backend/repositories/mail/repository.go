package mail

import (
	"os"
	"strconv"
)

type Repository struct {
	Host     string `json:"host"`
	Port     int    `json:"port"`
	Mail     string `json:"mail"`
	Password string `json:"password"`
}

func NewRepository() *Repository {
	portStr := os.Getenv("MAIL_PORT")
	port, _ := strconv.Atoi(portStr)

	m := &Repository{
		Host:     os.Getenv("MAIL_HOST"),
		Port:     port,
		Mail:     os.Getenv("MAIL_ADDRESS"),
		Password: os.Getenv("MAIL_PASSWORD"),
	}

	return m
}
