package mail

import (
	"fmt"
	"os"
	"time"

	"github.com/okanay/digital-menu/configs"
	"gopkg.in/gomail.v2"
)

type VerificationMailRequest struct {
	To       string    `json:"to"`
	Title    string    `json:"title"`
	Token    string    `json:"token"`
	ExpireAt time.Time `json:"expireAt"`
}

func (r *Repository) SendVerificationMail(req VerificationMailRequest) error {
	link := os.Getenv("FRONTEND_URL") + "/verified-email?token=" + req.Token + "&email=" + req.To
	expireAt := fmt.Sprintf("%.0f hours", req.ExpireAt.Sub(time.Now()).Hours())

	m := gomail.NewMessage()

	m.SetHeader("From", m.FormatAddress(r.Mail, configs.PROJECT_NAME+" - Verify Email"))
	m.SetHeader("To", req.To)
	m.SetHeader("Subject", req.Title)
	m.SetBody("text/html", fmt.Sprintf(VerificationMailTemplate, link, link, expireAt, configs.PROJECT_NAME))

	d := gomail.NewDialer(r.Host, r.Port, r.Mail, r.Password)
	if err := d.DialAndSend(m); err != nil {
		return err
	}
	return nil
}

const VerificationMailTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 2rem auto;
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            justify-content: start;
            background-color: #ffffff;
            border-radius: 0.5rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .button {
            display: inline-block;
            padding: 0.5rem 1rem;
            background-color: #FF706E;
            color: #ffffff;
            text-decoration: none;
            font-weight: 600;
            border-radius: 5px;
            transition: background-color 0.3s ease;
        }
        .button:hover {
            background-color: #FF5A5A;
        }
        .code-container {}
        .code {
            font-size: 22px;
            font-weight: 700;
            letter-spacing: 5px;
            padding: 10px;
            background-color: #f1f1f1;
            display: inline-block;
            border-radius: 8px;
            color: #444;
        }
        .header {
            text-align: center;
        }
        .footer {
            font-size: 12px;
            color: #999;
            text-align: center;
        }
        h1 {
            color: #111;
            font-size: 24px;
            font-weight: 600;
        }
        p {
            color: #555;
            font-size: 14px;
            letter-spacing: 0.5px;
        }
        img {
            max-width: 120px;
            margin-bottom: -1rem;
        }
        .divider {
            height: 1px;
            background-color: #e0e0e0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://menu-arts.s3.eu-north-1.amazonaws.com/logo.jpeg" alt="Logo" />
            <h1>Email Verification</h1>
        </div>
        <p>Hello,</p>
        <p>Thank you for signing up! To complete your registration and verify your email address, please use the verification code below or click the button to confirm your account.</p>
        <p style="text-align: left;">To verify your email address, click the button below:</p>
        <p style="text-align: left;"><a href="%s" class="button">Verify My Email</a></p>
        <p style="text-align: left;">Or open the following link in your browser:</p>
        <p style="word-break: break-all; color: #FFC0CB; text-align: left;">%s</p>
        <div class="divider"></div>
        <div style="text-align: left; color: #555; font-size: 8px;">
          <p> This code and link will expire in <u><b>%s</b></u>. <br/> If you did not sign up for an account with us, please ignore this email.</p>
          	<div class="footer">
              <p>Thank you,<br>The %s Team</p>
            </div>
        </div>
    </div>
</body>
</html>`
