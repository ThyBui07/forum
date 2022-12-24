package database

import (
	"database/sql"
	"fmt"
	u "forum/server/utils"
)

// Get categories struct
func GetCategories(db *sql.DB) []u.Category {
	rows, err := db.Query(`SELECT ID, Name FROM Categories`)
	if err != nil {
		fmt.Println("Get cats Query error:", err)
		return nil
	}
	defer rows.Close()

	var c []u.Category

	for rows.Next() {
		var category u.Category
		err = rows.Scan(&category.Id, &category.Title)
		if err != nil {
			fmt.Println("Get cats Scan error:", err)
			continue
		}
		c = append(c, category)
	}

	if err = rows.Err(); err != nil {
		fmt.Println("Get cats rows error:", err)
		return nil
	}

	return c
}

// Get categories list (names)
func GetCategoriesNames(db *sql.DB) []string {
	rows, err := db.Query(`SELECT Name FROM categories`)
	if err != nil {
		fmt.Println("Cats names list Query error:", err)
		return nil
	}
	defer rows.Close()

	cats := []string{}

	for rows.Next() {
		var temp string
		err = rows.Scan(&temp)
		if err != nil {
			fmt.Println("Cats names list Scan error:", err)
			continue
		}
		cats = append(cats, temp)
	}

	if err = rows.Err(); err != nil {
		fmt.Println("Cats names list rows error:", err)
		return nil
	}

	return cats
}
