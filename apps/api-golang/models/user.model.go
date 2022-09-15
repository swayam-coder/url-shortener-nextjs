package models

import (
	// "github.com/go-playground/validator/v10"
	"url-shortener/apps/api-golang/helpers/messages"
	"gorm.io/gorm"
)

type UserModel struct {  // !Validation is pending
	gorm.Model
	Name     string `json:"name" validate:"required"` 
	Age      string `json:"age" validate:"required"`
	Email    string `json:"email" validate:"required, email, unique"`
	Password string `json:"password" validate:"required,gt=7,lt=30"`
	User_Id  string `json:"userId" validate:"required"`
}

type APIUser struct {
	ID   int `gorm:"primarykey"`
	Name string `json:"name"`
	Email string `json:"email"`
	Password string `json:"password"`
}

func CheckUser(email, password string) (APIUser, string) {
	var user APIUser
	err := db.Select(APIUser{}).Where(UserModel{ Email: email }).First(&user).Error  // what is the difference between writing APIUser and &APIUser?

    if err != nil && err != gorm.ErrRecordNotFound {
		return APIUser{}, messages.GetMsg(messages.INTERNAL_SERVER_ERROR)
	}

	if user.ID < 0 {  // in gorm.ErrRecordNotFound error user is populated but with negative ID
		return APIUser{}, messages.GetMsg(messages.UNAUTHORIZED)
	}

	if(password != user.Password) {  // do a different kind of check
		return APIUser{}, messages.GetMsg(messages.FORBIDDEN)
	}

	return user, messages.GetMsg(messages.SUCCESS)
}