package controllers

import (
	"github.com/gin-gonic/gin"
	"url-shortener/apps/api-golang/controllers/api"
)

func InitRoutes(r *gin.Engine) *gin.Engine {
	r.GET("/healthcheck", api.Healthcheck)
	r.GET("/login", api.Login)

	return r
}