package database

import (
	"database/sql"
	"fmt"
	u "forum/server/utils"
)

// Count likes/dislikes (lord) of post (id)
func CountReacsPost(db *sql.DB, lord int, id int) int {
	n := 0
	rows, err := db.Query(`SELECT COUNT(*) FROM Reacs WHERE LorD = ? AND PostID = ?`, lord, id)
	if err != nil {
		fmt.Println("Count reacs Query error:", err)
		return 0
	}
	defer rows.Close()

	if rows.Next() {
		err = rows.Scan(&n)
		if err != nil {
			fmt.Println("Count reacs Scan error:", err)
		}
	}
	if err = rows.Err(); err != nil {
		fmt.Println("Count reacs rows error:", err)
		return 0
	}
	return n
}

// Count likes/dislikes (lord) of comment (id)
func CountReacsCom(db *sql.DB, lord int, id int) int {
	n := 0
	rows, err := db.Query(`SELECT COUNT(*) FROM Reacs WHERE LorD = ? AND CommentID = ?`, lord, id)
	if err != nil {
		fmt.Println("Count reacs Query error:", err)
		return 0
	}
	defer rows.Close()

	if rows.Next() {
		err = rows.Scan(&n)
		if err != nil {
			fmt.Println("Count reacs Scan error:", err)
		}
	}
	if err = rows.Err(); err != nil {
		fmt.Println("Count reacs rows error:", err)
		return 0
	}
	return n
}

// Insert reaction
func InsertReac(db *sql.DB, r u.Reac) {
	if r.PostID == 0 {
		statement, err := db.Prepare(`INSERT OR IGNORE INTO Reacs (AuthorID, LorD, CommentID) VALUES (?, ?, ?)`)
		if err != nil {
			fmt.Println("Insert reac com Prepare error:", err)
			return
		}
		defer statement.Close()
		_, err = statement.Exec(r.AuthorID, r.LorD, r.CommentID)
		if err != nil {
			fmt.Println("Insert reac com Exec error:", err)
			return
		}
	} else {
		statement, err := db.Prepare(`INSERT INTO Reacs (AuthorID, LorD, PostID) VALUES (?, ?, ?)`)
		if err != nil {
			fmt.Println("Insert reac post Prepare error:", err)
			return
		}
		defer statement.Close()
		_, err = statement.Exec(r.AuthorID, r.LorD, r.PostID)
		if err != nil {
			fmt.Println("Insert reac post Exec error:", err)
			return
		}
	}
}

// Get reacs (lord) of post (id)
func GetReacsPost(db *sql.DB, lord int, id int) []u.Reac {
	rows, err := db.Query(`SELECT ID, LorD, AuthorID, PostID, CommentID FROM Reacs WHERE PostID = ? && LorD == ?`, id, lord)
	if err != nil {
		fmt.Println("Get reacs post Query error:", err)
		return nil
	}
	defer rows.Close()

	var AllReacs []u.Reac

	for rows.Next() {
		var c u.Reac
		err = rows.Scan(&c.ID, &c.LorD, &c.AuthorID, &c.PostID, &c.CommentID)
		if err != nil {
			fmt.Println("Get reacs post Scan error:", err)
			continue
		}
		AllReacs = append(AllReacs, c)
	}

	if err = rows.Err(); err != nil {
		fmt.Println("Get reacs post rows error:", err)
		return nil
	}
	return AllReacs
}

// Get reacs (lord) of comment (id)
func GetReacsCom(db *sql.DB, lord int, id int) []u.Reac {
	rows, err := db.Query(`SELECT ID, LorD, AuthorID, PostID, CommentID FROM Reacs WHERE CommentID = ? && LorD == ?`, id, lord)
	if err != nil {
		fmt.Println("Get reacs com Query error:", err)
		return nil
	}
	defer rows.Close()

	var AllReacs []u.Reac

	for rows.Next() {
		var c u.Reac
		err = rows.Scan(&c.ID, &c.LorD, &c.AuthorID, &c.PostID)
		if err != nil {
			fmt.Println("Get reacs com Scan error:", err)
			continue
		}
		AllReacs = append(AllReacs, c)
	}

	if err = rows.Err(); err != nil {
		fmt.Println("Get reacs com rows error:", err)
		return nil
	}
	return AllReacs
}

// Delete Reaction
func DeleteReaction(db *sql.DB, reac u.Reac) {
	if reac.PostID == 0 {
		statement, err := db.Prepare(`DELETE FROM Reacs WHERE AuthorID = ? AND LorD = ? AND CommentID = ?`)
		if err != nil {
			fmt.Println("Delete reac com Prepare error:", err)
			return
		}
		defer statement.Close()

		_, err = statement.Exec(reac.AuthorID, reac.LorD, reac.CommentID)
		if err != nil {
			fmt.Println("Delete reac com Exec error:", err)
			return
		}
	} else {
		statement, err := db.Prepare(`DELETE FROM Reacs WHERE AuthorID = ? AND LorD = ? AND PostID = ?`)
		if err != nil {
			fmt.Println("Delete reac post Prepare error:", err)
			return
		}
		defer statement.Close()

		_, err = statement.Exec(reac.AuthorID, reac.LorD, reac.PostID)
		if err != nil {
			fmt.Println("Delete reac post Exec error:", err)
			return
		}
	}
}

// Get posts reacted to by author (id)
func GetLikedPostsIDs(db *sql.DB, id int) []u.Post {
	var LikedPosts []u.Post
	rows, err := db.Query(`
	SELECT Posts.ID, Posts.AuthorID, Posts.Title, Posts.Content, Posts.Date, Posts.CategoryID, 
	Reacs.PostID, Reacs.AuthorID FROM Posts 
	INNER JOIN Reacs ON Posts.ID = Reacs.PostID && Posts.AuthorID = Reacs.AuthorID`)
	if err != nil {
		fmt.Println("Get posts reacted to by author Query error:", err)
		return nil
	}
	defer rows.Close()

	for rows.Next() {
		var p u.Post
		err = rows.Scan(&p.ID, &p.AuthorID, &p.Title, &p.Content, &p.CategoryID)
		if err != nil {
			fmt.Println("Get posts reacted to by author Scan error:", err)
			continue
		}
		LikedPosts = append(LikedPosts, p)
	}

	if err = rows.Err(); err != nil {
		fmt.Println("Get posts reacted to by author rows error:", err)
		return nil
	}

	return LikedPosts
}
