package api

import (
	"github.com/gin-gonic/gin"
	"url-shortener/apps/api-golang/pkg/app"
)

type HealthCheck struct {
	data string `json:"data"`
}

func Healthcheck(c *gin.Context) {
	appG := app.Gin{ C: c }
	appG.Response(200, HealthCheck{data: "Everything is fine!"})
}