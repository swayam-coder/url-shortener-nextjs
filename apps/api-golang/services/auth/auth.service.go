package auth

import (
	"url-shortener/apps/api-golang/models"
)

type Auth struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (auth *Auth) CheckUser() (models.APIUser, string) {
	email, password := auth.Email, auth.Password
	return models.CheckUser(email, password)
}