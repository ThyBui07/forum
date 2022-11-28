/* TYPES OF DATABASE WE NEED:
- User
- Categories
- Comments
- Likes and Dislikes
- Log In
- Sign Up
- Post
*/

package database

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"net/http/cookiejar"
	"strconv"
	"time"

	_ "github.com/mattn/go-sqlite3"
)

// Open database and  check for error
func GetDB(database string) (db *sql.DB, err error) {
	switch {
	case database == "users.db":
		CreateUserTable(db)
	case database == "topics.db":
		CreateTopicTable(db)
	case database == "posts.db":
		CreatePostsTable(db)
	case database == "categories.db":
		CreateCategoriesTable(db)

	}
	db, err = sql.Open("sqlite3", database)
	CheckErr(err)
	return db, err
}

// If error log and quit
func CheckErr(err error) {
	if err != nil {
		log.Fatal(err)
	}
}

// Checks if username exists in database
func UserExists(db *sql.DB, username string, password string) bool {
	rows, err := db.Query("SELECT id, username, email FROM users")
	CheckErr(err)
	var id int
	var u string
	var email string
	var p string
	for rows.Next() {
		rows.Scan(&id, &u, &email, &p)
		if u == username && p == password {
			fmt.Println(u, username)
			return true
		}
	}
	return false
}

// Creates users database
func CreateUserTable(database *sql.DB) {
	statement, err := database.Prepare("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT UNIQUE, email TEXT UNIQUE, password TEXT)")
	CheckErr(err)
	statement.Exec()

}

// Inserts new username and email if they don't exist
func InsertInUsers(database *sql.DB, u string, e string, p string) {
	if !UserExists(database, u, p) {
		statement, err := database.Prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)")
		CheckErr(err)

		statement.Exec(u, e, p)
	}

}

// Go through the table and print content
func PrintTable(database *sql.DB) {
	rows, err := database.Query("SELECT id, username, email FROM users")
	CheckErr(err)

	var id int
	var username string
	var email string
	for rows.Next() {
		rows.Scan(&id, &username, &email)
		fmt.Println(strconv.Itoa(id) + ": " + username + " " + email)
	}
}

func CreateTopicTable(database *sql.DB) {
	statement, err := database.Prepare("CREATE TABLE IF NOT EXISTS topics (id INTEGER PRIMARY KEY, title TEXT, username TEXT, content TEXT, category TEXT)")
	CheckErr(err)
	statement.Exec()

}

func CreatePostsTable(database *sql.DB) {
	statement, err := database.Prepare("CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY, topic TEXT, username TEXT, content TEXT)")
	CheckErr(err)
	statement.Exec()
}

func CreateCategoriesTable(database *sql.DB) {
	statement, err := database.Prepare("CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY, title TEXT, author TEXT)")
	CheckErr(err)
	statement.Exec()
}

func InsertInCategories(database *sql.DB, title string, author string) {

	statement, err := database.Prepare("INSERT INTO categories (title, author) VALUES (?, ?)")
	CheckErr(err)
	statement.Exec(title, author)

}

func GetCategories(database *sql.DB) []string {
	rows, err := database.Query("SELECT id, title, author FROM categories")
	CheckErr(err)

	c := []string{}
	var id int
	var title string
	var username string
	for rows.Next() {
		rows.Scan(&id, &title, &username)
		c = append(c, title)
	}
	return c
}

type Cookie struct {
	Name    string
	Value   string
	Expires time.Time
	// MaxAge=0 means no 'Max-Age' attribute specified.
	// MaxAge<0 means delete cookie now, equivalently 'Max-Age: 0'
	// MaxAge>0 means Max-Age attribute present and given in seconds
	MaxAge   int
	Secure   bool
	HttpOnly bool
	//SameSite SameSite
	Raw      string
	Unparsed []string
}

//Trying out cookies stuff

var client http.Client

func init() {
	jar, err := cookiejar.New(nil)
	CheckErr(err)
	client = http.Client{
		Jar: jar,
	}
}

func Cookies() {
	cookie := &http.Cookie{
		Name:   "token",
		Value:  "some_token",
		MaxAge: 300,
	}
	req, err := http.NewRequest("GET", "ifjeifjiwej.com", nil)
	CheckErr(err)
	req.AddCookie(cookie)
	resp, err := client.Do(req)
	CheckErr(err)
	defer resp.Body.Close()
}
