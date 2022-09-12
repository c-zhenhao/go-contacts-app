package controllers

import (
	"context"
	"fmt"
	"math"
	"net/http"
	"strconv"
	"time"

	"go-contacts-app/configs"
	"go-contacts-app/models"
	"go-contacts-app/responses"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// create collection and validate models
var contactsCollection *mongo.Collection = configs.GetCollection(configs.DB, "contacts")
var validate = validator.New()

func CreateContact() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var contact models.Contact
		defer cancel()

		// validate request body
		if err := c.BindJSON(&contact); err != nil {
			c.JSON(http.StatusBadRequest, responses.ContactsResponse{Status: http.StatusBadRequest, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		// use validator library to validate required fields
		if validationErr := validate.Struct(&contact); validationErr != nil {
			c.JSON(http.StatusBadRequest, responses.ContactsResponse{Status: http.StatusBadRequest, Message: "error", Data: map[string]interface{}{"data": validationErr.Error()}})
			return
		}

		// insert contact to database
		newContact := models.Contact{
			Id:    primitive.NewObjectID(),
			Name:  contact.Name,
			Phone: contact.Phone,
		}
		result, err := contactsCollection.InsertOne(ctx, newContact)
		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.ContactsResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		fmt.Println("added contact to database!")
		// finally, send response if everything is fine
		c.JSON(http.StatusCreated, responses.ContactsResponse{Status: http.StatusCreated, Message: "success", Data: map[string]interface{}{"data": result}})
	}
}

func GetContact() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

		// contact id from params
		contactId := c.Param("contactId")

		var contact models.Contact
		defer cancel()

		// convert contactId from string to primitive ObjectID tpye, a BSON type whjich mongoDB uses
		objId, _ := primitive.ObjectIDFromHex(contactId)

		// search for contact by passing objId as filter and decode
		err := contactsCollection.FindOne(ctx, bson.M{"_id": objId}).Decode(&contact)
		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.ContactsResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		fmt.Println("found contact in database!", contact)

		// return decoded response
		c.JSON(http.StatusOK, responses.ContactsResponse{Status: http.StatusOK, Message: "success", Data: map[string]interface{}{"data": contact}})
	}
}

func UpdateContact() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

		contactId := c.Param("contactId")

		var contact models.Contact
		defer cancel()

		objId, _ := primitive.ObjectIDFromHex(contactId)

		// validate request body
		if err := c.BindJSON(&contact); err != nil {
			c.JSON(http.StatusBadRequest, responses.ContactsResponse{Status: http.StatusBadRequest, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		// use validator library to validate required fields
		if validationErr := validate.Struct(&contact); validationErr != nil {
			c.JSON(http.StatusBadRequest, responses.ContactsResponse{Status: http.StatusBadRequest, Message: "error", Data: map[string]interface{}{"data": validationErr.Error()}})
			return
		}

		// update contact in database
		update := bson.M{"name": contact.Name, "phone": contact.Phone}
		result, err := contactsCollection.UpdateOne(ctx, bson.M{"_id": objId}, bson.M{"$set": update})
		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.ContactsResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		fmt.Println("updated contact in database!", result)

		c.JSON(http.StatusOK, responses.ContactsResponse{Status: http.StatusOK, Message: "success", Data: map[string]interface{}{"data": result}})
	}
}

func DeleteContact() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		contactId := c.Param("contactId")
		defer cancel()

		objId, _ := primitive.ObjectIDFromHex(contactId)

		// delete contact from database
		result, err := contactsCollection.DeleteOne(ctx, bson.M{"_id": objId})
		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.ContactsResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		// if deletedcount is less than 1, return error
		if result.DeletedCount < 1 {
			c.JSON(http.StatusInternalServerError, responses.ContactsResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": "contact not found!"}})
			fmt.Println("coudln't delete contact in database!")
			return
		}

		fmt.Println("deleted contact in database!", result)

		c.JSON(http.StatusOK, responses.ContactsResponse{Status: http.StatusOK, Message: "success", Data: map[string]interface{}{"data": result}})
	}
}

func GetAllContacts() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var contacts []models.Contact
		defer cancel()

		// find all contacts in database
		filter := bson.M{}
		findOptions := options.Find()

		// filter to reduce number of returned contacts
		if search := c.Query("search"); search != "" {
			filter = bson.M{
				"$or": []bson.M{
					{
						"name": bson.M{
							"$regex": primitive.Regex{
								Pattern: search,
								Options: "i",
							},
						},
					},
					{
						"phone": bson.M{
							"$regex": primitive.Regex{
								Pattern: search,
								Options: "i",
							},
						},
					},
				},
			}
		}

		// sort query
		if sort := c.Query("sort"); sort != "" {
			if sort == "asc" {
				findOptions.SetSort(bson.D{{Key: "name", Value: 1}})
			} else if sort == "desc" {
				findOptions.SetSort(bson.D{{Key: "name", Value: -1}})
			}
		}

		// pagination
		page, err := strconv.Atoi(c.Query("page")) // default is page 1
		if err != nil {
			c.JSON(http.StatusBadRequest, responses.ContactsResponse{Status: http.StatusBadRequest, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		var perPage int64 = 10 // default no of contacts per page is 10

		// allow for limit per page
		if limit := c.Query("limit"); limit != "" {
			perPage, err = strconv.ParseInt(limit, 10, 64)
			if err != nil {
				c.JSON(http.StatusBadRequest, responses.ContactsResponse{Status: http.StatusBadRequest, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
				return
			}
		}

		total, _ := contactsCollection.CountDocuments(ctx, filter)

		findOptions.SetSkip((int64(page) - 1) * perPage) /// skip to the page
		findOptions.SetLimit(perPage)                    // limit the number of contacts returned

		cursor, err := contactsCollection.Find(ctx, filter, findOptions)
		defer cursor.Close(ctx)

		for cursor.Next(ctx) {
			var singleContact models.Contact
			if err = cursor.Decode(&singleContact); err != nil {
				c.JSON(http.StatusInternalServerError, responses.ContactsResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
				fmt.Println("error decoding contact from database!")
				return
			}

			contacts = append(contacts, singleContact)
		}

		c.JSON(http.StatusOK, responses.ContactsResponse{Status: http.StatusOK, Message: "success", Data: map[string]interface{}{
			"data":        contacts,
			"totalDocs":   total,
			"currentPage": page,
			"perPage":     perPage,
			"nextPage":    page + 1,
			"prevPage":    page - 1,
			"totalPages":  math.Ceil(float64(total) / float64(perPage)),
		}})
	}
}
