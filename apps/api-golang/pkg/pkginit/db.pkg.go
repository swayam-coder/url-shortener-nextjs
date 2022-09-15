package pkginit

import (
	"fmt"
	"os"
	"errors"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func InitDB() (*gorm.DB, error) {
	dsn := os.Getenv("DBURL")
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		fmt.Println("Error connecting to database:", err.Error())
		return nil, errors.New("error connecting to database")
	}

	return db, nil
}