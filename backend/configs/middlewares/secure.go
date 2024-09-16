package middlewares

import "github.com/gin-contrib/secure"

var SecureMiddleware = secure.New(secure.Config{
	FrameDeny:             true,
	ContentTypeNosniff:    true,
	BrowserXssFilter:      true,
	ContentSecurityPolicy: "default-src 'self'",
})
