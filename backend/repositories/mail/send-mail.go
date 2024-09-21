package mail

import (
	"gopkg.in/gomail.v2"
)

type Request struct {
	FromName string `json:"from_name"`
	To       string `json:"to"`
	Title    string `json:"title"`
	Body     string `json:"body"`
}

func (r *Repository) SendMail(req Request) error {
	m := gomail.NewMessage()

	if req.FromName != "" {
		m.SetHeader("From", m.FormatAddress(r.Mail, req.FromName))
	} else {
		m.SetHeader("From", r.Mail)
	}

	m.SetHeader("To", req.To)
	m.SetHeader("Subject", req.Title)
	m.SetBody("text/html", req.Body)

	d := gomail.NewDialer(r.Host, r.Port, r.Mail, r.Password)
	if err := d.DialAndSend(m); err != nil {
		return err
	}
	return nil
}
