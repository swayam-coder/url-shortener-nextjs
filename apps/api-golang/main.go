package main

import (
	"os"
	"url-shortener/apps/api-golang/controllers"
	"url-shortener/apps/api-golang/middlewares"
	"url-shortener/apps/api-golang/pkg/pkginit"

	"github.com/gin-gonic/gin"
)

func init() {
	_, err := pkginit.InitDB()

	if err != nil {
		// handle error
		return  // will this work?
	}
}

func main() {
	r := setupGin()
	_ = r.Run(":8080")
}

func setupGin() *gin.Engine {
	r := gin.New()
	
	r = middlewares.InitMiddlewares(r)
	r = controllers.InitRoutes(r)

	port := os.Getenv("PORT")

	if port == "" {
		port = "8080"
	}

	// readTimeout := setting.ServerSetting.ReadTimeout
	// writeTimeout := setting.ServerSetting.WriteTimeout
	// endPoint := fmt.Sprintf(":%d", setting.ServerSetting.HttpPort)
	// maxHeaderBytes := 1 << 20

	// server := &http.Server{
	// 	Addr:           endPoint,
	// 	Handler:        routersInit,
	// 	ReadTimeout:    readTimeout,
	// 	WriteTimeout:   writeTimeout,
	// 	MaxHeaderBytes: maxHeaderBytes,
	// }

	// log.Printf("[info] start http server listening %s", endPoint)

	// server.ListenAndServe() // ?

	r.Run(port)
	return r
}

// Validation (Gorm), Does the main function get called everytime the package is installed
// Modules vs Packages
// Interfaces, Co-routines
// Error handling, panics

// To ensure reproducible initialization behavior, build systems are encouraged to present multiple files belonging to the same package in lexical file name order to a compiler. One way to ensure that all init() functions are loaded in order is to declare 
// them all in one file. This will prevent the order from changing even if file names are changed.