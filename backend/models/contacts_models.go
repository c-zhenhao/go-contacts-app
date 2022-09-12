package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Contact struct {
	Id    primitive.ObjectID `json:"id" bson:"_id"`
	Name  string             `json:"name,omitempty" validate:"required"`
	Phone string             `json:"phone,omitempty" validate:"required"`
}
