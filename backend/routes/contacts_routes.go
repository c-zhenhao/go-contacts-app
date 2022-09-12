package routes

import (
	"go-contacts-app/controllers"

	"github.com/gin-gonic/gin"
)

func ContactsRoute(router *gin.Engine) {
	// all routes to user come here:
	router.POST("/contact", controllers.CreateContact())              // create contact
	router.GET("/contact/:contactId", controllers.GetContact())       // get contact
	router.PATCH("/contact/:contactId", controllers.UpdateContact())  // update contact
	router.DELETE("/contact/:contactId", controllers.DeleteContact()) // delete contact
	router.GET("/contact", controllers.GetAllContacts())              // get all contacts
}
