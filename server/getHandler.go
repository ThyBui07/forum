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

func AddPostToDB() {
	var post u.Post

	post.AuthorID = 1
	post.CategoryID = 1
	post.Content = "Another test"
	post.Date = "Thursday"
	post.Title = "SECOND Post"

	d.InsertPost(Database, post)

}

func AddComToDB() {
	var comment u.Comment

	comment.AuthorID = 1
	comment.Content = "Nice!"
	comment.PostID = 2

	d.InsertCom(Database, comment)

}

func UpdateComments(post u.Post) {
	Comments := d.GetComs(Database, post.ID)
	for i := range Comments {
		Reactions := d.GetReacsCom(Database, 1, Comments[i].ID)
		for j := range Reactions {
			exists := false
			for k := range Comments[i].Reactions {
				if Comments[i].Reactions[k].ID == Reactions[j].ID {
					exists = true
				}
			}
			if !exists {
				Comments[i].Reactions = append(Comments[i].Reactions, Reactions[j])
			}
		}
		Reactions = d.GetReacsCom(Database, 0, Comments[i].ID)
		for j := range Reactions {
			exists := false
			for k := range Comments[i].Reactions {
				if Comments[i].Reactions[k].ID == Reactions[j].ID {
					exists = true
				}
			}
			if !exists {
				Comments[i].Reactions = append(Comments[i].Reactions, Reactions[j])
			}
		}
	}
}

func UpdatePosts([]u.Post) []u.Post {
	Posts := d.GetPosts(Database)
	for i := range Posts {
		Comments := d.GetComs(Database, Posts[i].ID)
		for j := range Comments {
			exists := false
			for k := range Posts[i].Comments {
				if Posts[i].Comments[k].ID == Comments[j].ID {
					exists = true
				}
			}
			if !exists {
				Posts[i].Comments = append(Posts[i].Comments, Comments[j])
			}
		}
	}
	for i := range Posts {
		Likes := d.GetReacsPost(Database, 1, Posts[i].ID)
		for j := range Likes {
			exists := false
			for k := range Posts[i].Reactions {
				if Posts[i].Reactions[k].ID == Likes[j].ID {
					exists = true
				}
			}
			if !exists {
				Posts[i].Reactions = append(Posts[i].Reactions, Likes[j])
			}
		}
	}
	for i := range Posts {
		Dislikes := d.GetReacsPost(Database, 1, Posts[i].ID)
		for j := range Dislikes {
			exists := false
			for k := range Posts[i].Reactions {
				if Posts[i].Reactions[k].ID == Dislikes[j].ID {
					exists = true
				}
			}
			if !exists {
				Posts[i].Reactions = append(Posts[i].Reactions, Dislikes[j])
			}
		}
	}
	return Posts
}

func GetRequest(w http.ResponseWriter, r *http.Request) {
	AddPostToDB()
	AddComToDB()

	for i := range d.GetPosts(Database) {
		d.DeletePost(Database, i)
		i = 1
	}

	Posts := d.GetPosts(Database)
	for i := range Posts {
		UpdateComments(Posts[i])
	}
	Categories := UpdatePosts(Posts)

	b, err := json.Marshal(Categories)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println("werk")
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

func DeletePost(PostID int) {
	d.DeletePost(Database, PostID)
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
