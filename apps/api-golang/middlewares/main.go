package middlewares

import "github.com/gin-gonic/gin"

func InitMiddlewares(r *gin.Engine) *gin.Engine {
	r.Use(gin.Logger())
	r.Use(gin.Recovery())

	return r
}