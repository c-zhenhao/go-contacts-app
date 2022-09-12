package main

import (
	"go-contacts-app/configs"
	"go-contacts-app/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	// test endpoint
	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{"data": "Hello from gin-gonic!"})
	})

	// run database
	configs.ConnectDB()

	// attach router to http.Server
	routes.ContactsRoute(router)

	// use Run method to attach router to http.Server and start listening & serving HTTP requests
	router.Run("localhost:8000")
}
