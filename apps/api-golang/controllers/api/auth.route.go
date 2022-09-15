package api

import (
	"net/http"
	authG "url-shortener/apps/api-golang/helpers/auth"
	"url-shortener/apps/api-golang/helpers/messages"
	"url-shortener/apps/api-golang/models"
	"url-shortener/apps/api-golang/services/auth"

	"github.com/gin-gonic/gin"
)

func Login(c *gin.Context) {
	// Body Extraction
	// Validation
	// Auth Service
	var json auth.Auth

	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	email, password := json.Email, json.Password

	authservice := auth.Auth{Email: email, Password: password}
	data, err := authservice.CheckUser()

	if err != messages.GetMsg(messages.SUCCESS) {
		// Internal server error
	}

	var user models.APIUser

	if data == user {
		// Handle this error
	}

	authG.GenerateJWT(data.Email, data.Password)
}