package database

import (
	"database/sql"
	"fmt"
	u "forum/utils"
	"strconv"
)

// Checks if username and password match an entry in the database
func UserAuth(db *sql.DB, username string, password string) bool {
	rows, err := db.Query("SELECT username, password FROM Users")
	u.CheckErr(err)
	var u string
	var p string
	for rows.Next() {
		rows.Scan(&u, &p)
		if u == username && p == password {
			return true
		}
	}
	return false
}

// Checks if username exists
func UserExists(db *sql.DB, username string) bool {
	rows, err := db.Query("SELECT username FROM Users")
	u.CheckErr(err)
	var u string
	for rows.Next() {
		rows.Scan(&u)
		if u == username {
			return true
		}
	}
	return false
}

// Checks if email exists
func EmailExists(db *sql.DB, email string) bool {
	rows, err := db.Query("SELECT email FROM Users")
	u.CheckErr(err)
	var e string
	for rows.Next() {
		rows.Scan(&e)
		if e == email {
			return true
		}
	}
	return false
}

// Inserts new username and email if they don't exist
func InsertInUsers(database *sql.DB, username string, e string, p string) bool {
	if !UserExists(database, username) && !EmailExists(database, e) {
		statement, err := database.Prepare("INSERT INTO Users (username, email, password) VALUES (?, ?, ?)")
		u.CheckErr(err)
		statement.Exec(username, e, p)
		return true
	}
	return false
}

// Get all users
func GetUsers(db *sql.DB) []u.User {
	rows, err := db.Query(`SELECT ID, Username, Email, Password FROM Users`)
	u.CheckErr(err)
	defer rows.Close()

	var AllUsers []u.User

	for rows.Next() {
		var user u.User
		err = rows.Scan(&user.ID, &user.Username, &user.Email, &user.Password)
		u.CheckErr(err)
		AllUsers = append(AllUsers, user)
	}

	if err = rows.Err(); err != nil {
		fmt.Println("Get users rows error:", err)
		return nil
	}
	return AllUsers
}

// Get user by ID
func GetUserByID(db *sql.DB, UserID int) u.User {
	var user u.User
	rows, err := db.Query(`SELECT ID, Username, Email, Password FROM Users WHERE ID = ?`, UserID)
	u.CheckErr(err)
	defer rows.Close()

	if rows.Next() {
		err = rows.Scan(&user.ID, &user.Username, &user.Email, &user.Password)
		if err != nil {
			fmt.Println("Get user by ID error (Scan):", err)
			return user
		}
	}

	if err = rows.Err(); err != nil {
		fmt.Println("Get user by ID error:", err)
		return user
	}

	return user
}

// Get user by Username
func GetUserByUsername(db *sql.DB, Username string) u.User {
	var user u.User
	rows, err := db.Query(`SELECT ID, Username, Email, Password FROM Users WHERE Username = ?`, Username)
	u.CheckErr(err)
	defer rows.Close()

	if rows.Next() {
		err = rows.Scan(&user.ID, &user.Username, &user.Email, &user.Password)
		if err != nil {
			fmt.Println("Get user by Username error (Scan):", err)
			return user
		}
	}

	if err = rows.Err(); err != nil {
		fmt.Println("Get user by Username error:", err)
		return user
	}

	return user
}

// Go through the table and print content
func PrintTable(database *sql.DB) {
	rows, err := database.Query("SELECT id, username, email, password FROM users")
	u.CheckErr(err)

	var id int
	var username string
	var email string
	var password string
	for rows.Next() {
		rows.Scan(&id, &username, &email, &password)
		fmt.Println(strconv.Itoa(id) + ": " + username + " " + email + " " + password)
	}
}

// >>>>>>>>>>>

// Get user by session ?_?
func GetUserIDBySesh(db *sql.DB, UUID string) int {
	var id int
	rows, err := db.Query(`SELECT UserID FROM Sessions WHERE UUID = ?`, UUID)
	if err != nil {
		fmt.Println("UserID by Sesh Error Query:", err)
		return id
	}
	defer rows.Close()

	if rows.Next() {
		err = rows.Scan(&id)
		if err != nil {
			fmt.Println("UserID by Sesh Error Scan:", err)
			return id
		}
	}

	if err = rows.Err(); err != nil {
		fmt.Println("UserID by Sesh Error rows:", err)
		return id
	}
	return id
}
