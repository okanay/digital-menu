package mail

import (
	"fmt"
	"os"
	"time"

	"github.com/okanay/digital-menu/configs"
	"gopkg.in/gomail.v2"
)

type ResetMailRequest struct {
	To       string    `json:"to"`
	Title    string    `json:"title"`
	Token    string    `json:"token"`
	ExpireAt time.Time `json:"expireAt"`
}

func (r *Repository) SendResetPasswordMail(req ResetMailRequest) error {
	link := os.Getenv("FRONTEND_URL") + "/reset-password?token=" + req.Token + "&email=" + req.To
	expireAt := fmt.Sprintf("%.0f min", req.ExpireAt.Sub(time.Now()).Minutes())

	m := gomail.NewMessage()
	m.SetHeader("From", m.FormatAddress(r.Mail, configs.PROJECT_NAME+" - Support"))
	m.SetHeader("To", req.To)
	m.SetHeader("Subject", req.Title)
	m.SetBody("text/html", fmt.Sprintf(ResetPasswordEmailTemplate, req.Token, link, link, expireAt, configs.PROJECT_NAME))

	d := gomail.NewDialer(r.Host, r.Port, r.Mail, r.Password)
	if err := d.DialAndSend(m); err != nil {
		return err
	}
	return nil
}

const ResetPasswordEmailTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password Code</title>
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
            <img src="https://menu-arts.s3.eu-north-1.amazonaws.com/logo.jpeg" alt="Menu Arts" />
            <h1>Reset Password</h1>
        </div>
        <p>Hello,</p>
        <p>We received a request to reset your password. If you didn't make the request, you can safely ignore this email.</p>
        <div class="code-container">
            <p>Your reset code is:</p>
            <div class="code">%s</div>
        </div>
        <p style="text-align: left;">Click the button below to reset your password:</p>
        <p style="text-align: left;"><a href="%s" class="button">Reset Password</a></p>
        <p style="text-align: left;">If you can't click the button, you can copy and paste the following link into your browser:</p>
        <p style="word-break: break-all; color: #FFC0CB; text-align: left;">%s</p>
        <div class="divider"></div>
        <div style="text-align: left; color: #555; font-size: 8px;">
          <p> This code and link will expire in <u><b>%s</b></u>. <br/> If you didn't make this request, you can safely ignore this email.</p>
          	<div class="footer">
              <p>Thank you,<br>The %s Team</p>
            </div>
        </div>
    </div>
</body>
</html>`
