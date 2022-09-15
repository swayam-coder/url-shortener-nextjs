package app

import "github.com/gin-gonic/gin"

type Gin struct {
	C *gin.Context
}

type Response struct {
	StatusCode int `json:"statuscode"`
	ErrorMessage string `json:"error"`
	Data interface{} `json:"data"`  // interface{} basically means any type of struct
}

func (c *Gin) Response(httpCode int, data interface{}) {
	c.C.JSON(httpCode, Response{ 
		StatusCode: httpCode,
		ErrorMessage: "",
		Data: data,
	})
}
