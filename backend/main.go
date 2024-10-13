package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	c "github.com/okanay/digital-menu/configs"
	cache "github.com/okanay/digital-menu/configs/managers/cache"
	dbCleanup "github.com/okanay/digital-menu/configs/managers/db-cleanup"
	"github.com/okanay/digital-menu/configs/managers/statistics"
	mw "github.com/okanay/digital-menu/configs/middlewares"
	"github.com/okanay/digital-menu/db"
	"github.com/okanay/digital-menu/handlers"
	ah "github.com/okanay/digital-menu/handlers/auth"
	imagesHandler "github.com/okanay/digital-menu/handlers/images"
	mh "github.com/okanay/digital-menu/handlers/menu"
	sh "github.com/okanay/digital-menu/handlers/shop"
	imageRepository "github.com/okanay/digital-menu/repositories/images"
	"github.com/okanay/digital-menu/repositories/mail"
	mr "github.com/okanay/digital-menu/repositories/menu"
	r2Repository "github.com/okanay/digital-menu/repositories/r2"
	sr "github.com/okanay/digital-menu/repositories/session"
	shopRepository "github.com/okanay/digital-menu/repositories/shop"
	ur "github.com/okanay/digital-menu/repositories/user"
)

func main() {
	// 1. Environment Variables and Database Connection
	if err := godotenv.Load(".env.local"); err != nil {
		log.Fatalf("Error loading .env file")
		return
	}

	sqlDB, err := db.Init(os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatalf("Error connecting to database")
		return
	}
	defer sqlDB.Close()

	// 2. Configurations
	cache := cache.Init()
	rateLimit := mw.NewRateLimit(cache)
	timeout := mw.NewTimeout()

	statistics := statistics.Init(sqlDB)
	dbCleanup.Init(sqlDB)

	// 4. Repositories
	userRepository := ur.NewRepository(sqlDB)
	sessionRepository := sr.NewRepository(sqlDB)
	menuRepository := mr.NewRepository(sqlDB)
	shopRepository := shopRepository.NewRepository(sqlDB)
	mailRepository := mail.NewRepository()
	imageRepository := imageRepository.NewRepository(sqlDB)
	r2Repository, _ := r2Repository.NewRepository(os.Getenv("R2_BUCKET_NAME"), os.Getenv("R2_ACCOUNT_ID"), os.Getenv("R2_ACCESS_KEY_ID"), os.Getenv("R2_SECRET_ACCESS_KEY"))

	// 5. Handlers
	authHandler := ah.NewHandler(userRepository, sessionRepository, mailRepository, statistics)
	menuHandler := mh.NewHandler(menuRepository, shopRepository, mailRepository, statistics)
	shopHandler := sh.NewHandler(menuRepository, shopRepository, mailRepository, statistics)
	imagesHandler := imagesHandler.NewHandler(r2Repository, imageRepository, userRepository, statistics)

	// 6. Router Initialize
	router := gin.Default()
	router.Use(c.SecureConfig)
	router.Use(c.CorsConfig())
	router.Use(timeout.Middleware())
	router.Use(rateLimit.Middleware())

	// 7. Route Groups
	// :: Only verified email users can access these routes without authentication.
	verifyMail := router.Group("/")
	verifyMail.Use(mw.VerifyMiddleware(userRepository))
	// :: Only authenticated users can access these routes
	auth := router.Group("/auth")
	auth.Use(mw.AuthMiddleware(sessionRepository, userRepository, statistics))
	// :: Only verified email users can access these routes with authentication.
	verifyAuth := auth.Group("/")
	verifyAuth.Use(mw.VerifyAuthMiddleware())

	// 8. API Routes
	// Global Routes
	router.GET("/", handlers.Index)
	router.NoRoute(handlers.NoRoute)

	// User Routes
	auth.GET("/check", authHandler.Check)
	auth.POST("/logout", authHandler.Logout)
	verifyMail.POST("/password-reset", authHandler.ResetPassword)
	verifyMail.POST("/password-reset-request", authHandler.ResetPasswordRequest)
	router.POST("/verify-email-request", authHandler.SendEmailVerify)
	router.POST("/verify-email", authHandler.VerifyEmail)
	router.POST("/login", authHandler.Login)
	router.POST("/register", authHandler.Register)

	// Restaurant Routes
	verifyAuth.POST("/shops", shopHandler.CreateShop)
	verifyAuth.PATCH("/shops/:uniqueId", shopHandler.UpdateShop)
	verifyAuth.DELETE("/shops/:uniqueId", shopHandler.DeleteShop)
	auth.GET("/shops", shopHandler.SelectShops)
	auth.GET("/shops/:uniqueId", shopHandler.SelectShop)

	// Menu Routes
	auth.POST("/menu", menuHandler.CreateMenu)
	auth.PATCH("/menu/:uniqueId", menuHandler.UpdateMenu)
	auth.DELETE("/menu/:uniqueId", menuHandler.DeleteMenu)
	auth.GET("/menus/res/:uniqueId", menuHandler.SelectMenusByShopID)
	auth.GET("/menus/all", menuHandler.SelectMenusByUserID)
	auth.GET("/menu/:uniqueId", menuHandler.SelectMenuWithAuth)
	router.GET("/menu/:uniqueId", menuHandler.SelectMenu)

	// Image Routes
	auth.POST("/image/upload", imagesHandler.UploadHandler)
	auth.GET("/image/all", imagesHandler.GetUserFiles)
	auth.DELETE("/image/delete", imagesHandler.DeleteFiles)

	// 9. Start Server
	err = router.Run(":" + os.Getenv("PORT"))
	if err != nil {
		log.Fatalf("Error starting server: %v", err)
	}
}
