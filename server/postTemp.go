package handlers

import (
	d "forum/database"
	u "forum/server/utils"
	"time"
)

func PostTemp() {
	var Post u.Post

	Post.Author = "gin"
	Post.AuthorID = 1
	Post.Categories = "Sweet, Salad, Breakfast"
	Post.Content = "This is sweet and savoury recijgfdkhjghfgjghgdfjgfhgdpe"

	var Comment1 u.Comment

	Comment1.Author = "Gin"
	Comment1.Content = "Doesn't look good"

	var Reacc1 u.Reac

	Reacc1.LorD = 1
	Comment1.Likes = append(Comment1.Likes, Reacc1)

	var Comment2 u.Comment

	var Reacc2 u.Reac

	Reacc2.LorD = -1
	Comment2.Dislikes = append(Comment2.Dislikes, Reacc2)

	Comment2.Author = "Ali"
	Comment1.Content = "I swear it's delicious!"

	Post.Comments = append(Post.Comments, Comment1)
	Post.Comments = append(Post.Comments, Comment2)

	var Reacp u.Reac

	Reacp.LorD = -1
	Post.Dislikes = append(Post.Dislikes, Reacp)

	t := time.Now()
	Post.Date = t.Unix()

	Post.Title = "tesssststtst"

	d.InsertPost(Database, Post)
}
