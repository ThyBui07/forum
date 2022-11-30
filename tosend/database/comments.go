package database

import (
	"database/sql"
	"fmt"
	u "forum/server/utils"
)

// Get comments of post (id)
func GetComs(db *sql.DB, id int) []u.Comment {
	rows, err := db.Query(`SELECT ID, AuthorID, PostID, Content FROM Comments WHERE PostID = ?`, id)
	if err != nil {
		fmt.Println("Get comments Query error:", err)
		return nil
	}
	defer rows.Close()

	var AllComs []u.Comment

	for rows.Next() {
		var c u.Comment
		err = rows.Scan(&c.ID, &c.AuthorID, &c.PostID, &c.Content)
		if err != nil {
			fmt.Println("Get comments Scan error:", err)
			continue
		}
		AllComs = append(AllComs, c)
	}

	if err = rows.Err(); err != nil {
		fmt.Println("Get comments rows error:", err)
		return nil
	}
	return AllComs
}

// Insert comment
func InsertCom(db *sql.DB, c u.Comment) {
	statement, err := db.Prepare(`INSERT INTO Comments (AuthorID, PostID, Content) VALUES (?, ?, ?)`)
	if err != nil {
		fmt.Println("Insert comment Prepare error:", err)
		return
	}
	defer statement.Close()
	_, err = statement.Exec(c.AuthorID, c.PostID, c.Content)
	if err != nil {
		fmt.Println("Insert comment Exec error:", err)
		return
	}
}

// Count comments in post (id)
func CountComs(db *sql.DB, id int) int {
	n := 0
	rows, err := db.Query(`SELECT COUNT(*) FROM Comments WHERE PostID = ?`, id)
	if err != nil {
		fmt.Println("Count comments Query error:", err)
		return 0
	}
	defer rows.Close()

	if rows.Next() {
		err = rows.Scan(&n)
		if err != nil {
			fmt.Println("Count comments Scan error:", err)
		}
	}
	if err = rows.Err(); err != nil {
		fmt.Println("Count comments rows error:", err)
		return 0
	}
	return n
}
