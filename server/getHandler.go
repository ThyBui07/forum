package handlers

import (
	"encoding/json"
	"fmt"
	d "forum/database"
	u "forum/server/utils"
	"net/http"
)

type Data struct {
	Categories []u.Category
	Posts      []u.Post
	//Logged     Logged
}

var Send Data

func GetRequest(w http.ResponseWriter, r *http.Request) {
	var post u.Post

	post.AuthorID = 1
	post.CategoryID = 1
	post.Content = "Yummmmm"
	post.Date = "Thursday"
	post.Title = "First Post"

	d.InsertPost(Database, post)

	var comment u.Comment

	comment.AuthorID = 1
	comment.Content = "Nice!"
	comment.PostID = 1

	d.InsertCom(Database, comment)

	Posts := d.GetPosts(Database)
	Categories := d.GetCategories(Database)

	for i := range Posts {
		Posts[i].Comments = d.GetComs(Database, Posts[i].ID)
	}

	for i := range Categories {
		for j := range Posts {
			if Posts[j].CategoryID == Categories[i].Id {
				Categories[i].Posts = append(Categories[i].Posts, Posts[j])
			}
		}
	}

	for i := range Categories {
		Categories[i].NumPosts = len(Categories[i].Posts)
	}

	b, err := json.Marshal(Categories)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println("work")
	fmt.Println(string(b))

	//Fix the CORS
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Write(b)

	// if tpl == nil {
	// 	fmt.Println("1")
	// 	errHandlers(w, r, http.StatusInternalServerError)
	// 	return
	// }

	// err = tpl.ExecuteTemplate(w, "home.html", Send)
	// if err != nil {
	// 	fmt.Println("2")
	// 	errHandlers(w, r, http.StatusInternalServerError)
	// }
}

func GetPosts(w http.ResponseWriter, r *http.Request) {
	Posts := d.GetPosts(Database)

	if r.URL.Path != "/" {
		errHandlers(w, r, http.StatusNotFound)
		return
	}

	b, err := json.Marshal(Posts)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println("work")
	fmt.Println(string(b))

	//Fix the CORS
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Write(b)
}
