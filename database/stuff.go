/* TYPES OF DATABASE WE HAVE:
- Users
- Categories
- Posts
- Comments
- Likes and Dislikes
- User session (cookies stuff)
- Images (let's try)
*/

package database

import (
	"database/sql"
	u "forum/utils"

	_ "github.com/mattn/go-sqlite3"
)

// Open database or creates it if it doesn't exist
func GetDB(database string) (*sql.DB, error) {

	db, err := sql.Open("sqlite3", database)
	u.CheckErr(err)

	_, err = db.Exec(`PRAGMA foreign_keys = ON`)
	u.CheckErr(err)

	_, err = db.Exec(`
	CREATE TABLE IF NOT EXISTS Users (
		ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
		Username TEXT NOT NULL UNIQUE,
		Email TEXT NOT NULL UNIQUE,
		Password TEXT NOT NULL);
	CREATE TABLE IF NOT EXISTS Categories (
		ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
		Name TEXT NOT NULL UNIQUE);
	CREATE TABLE IF NOT EXISTS Posts (
		ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
		AuthorID INTEGER NOT NULL,
		Title TEXT NOT NULL,
		Content BLOB NOT NULL,
		Date TEXT NOT NULL,
		CategoryID INTEGER NOT NULL,
		FOREIGN KEY(CategoryID) REFERENCER Categories(ID) ON DELECTE CASCADE,
		FOREIGN KEY(AuthorID) REFERENCES Users(ID) ON DELETE CASCADE);
	CREATE TABLE IF NOT EXISTS Comments (
		ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
		AuthorID INTEGER NOT NULL,
		PostID INTEGER NOT NULL,
		Content BLOB NOT NULL,
		FOREIGN KEY(AuthorID) REFERENCES Users(ID) ON DELETE CASCADE,
		FOREIGN KEY(PostID) REFERENCES Posts(ID) ON DELETE CASCADE);
	CREATE TABLE IF NOT EXISTS Reacs (
		ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
		LorD INTEGER NOT NULL,
		AuthorID INTEGER NOT NULL,
		PostID INTEGER NOT NULL,
		CommentID INTEGER NOT NULL,
		FOREIGN KEY(AuthorID) REFERENCES Users(ID) ON DELETE CASCADE,
		FOREIGN KEY(PostID) REFERENCES Posts(ID) ON DELETE CASCADE,
		FOREIGN KEY(CommentID) REFERENCES Comments(ID) ON DELETE CASCADE);
	CREATE TABLE IF NOT EXISTS Sessions (
		ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
		UserID INTEGER NOT NULL UNIQUE,
		UUID TEXT NOT NULL UNIQUE,
		ExpDate TEXT NOT NULL,
		FOREIGN KEY(UserID) REFERENCES Users(ID) ON DELETE CASCADE);
	CREATE TABLE IF NOT EXISTS Images (
		ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
		PostID INTEGER NOT NULL,
		ImageURL TEXT NOT NULL,
		FOREIGN KEY(PostID) REFERENCES POSTS(ID) ON DELETE CASCADE);`)
	u.CheckErr(err)

	_, err = db.Exec(`
	INSERT INTO "main"."Categories" ("Name")
	VALUES
		("Pasta everdyday")
		("Meat lovers")
		("Vegan delight")
		("#HEALTHY")
		("Sweet stuff")
		("Raw is Law")
		("Year-round holidays")
	`)
	return db, err
}

func InsertInCategories(database *sql.DB, title string, author string) {

	statement, err := database.Prepare("INSERT INTO categories (title, author) VALUES (?, ?)")
	u.CheckErr(err)
	statement.Exec(title, author)

}

func InsertInPosts(database *sql.DB, title string, author string, content string, category string) {

	statement, err := database.Prepare("INSERT INTO posts (title, author, content, category) VALUES (?, ?, ?, ?)")
	u.CheckErr(err)
	statement.Exec(title, author, content, category)

}

/*
func GetPostsOfCategory(database *sql.DB, category string) []u.Post {
	rows, err := database.Query("SELECT id, title, author, content, category FROM categories")
	u.CheckErr(err)

	var ps []u.Post
	var id int
	var title string
	var username string
	var content string
	var c string
	for rows.Next() {
		rows.Scan(&id, &title, &username, &content, &c)
		if c == category {
			var temp u.Post
			temp.Content = content
			temp.ID = id
			temp.Title = title
			temp.AuthorID = username
			temp.Category = c
			ps = append(ps, temp)
		}
	}
	return ps
}
*/
