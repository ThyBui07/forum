package handlers

import (
	"encoding/json"
	"fmt"
	d "forum/database"
	u "forum/server/utils"
	"net/http"
)

type Data struct {
	Categories []u.Category `json:"categories"`
	Posts      []u.Post     `json:"posts"`
	Logged     Logged       `json:"logged"`
}

var NPost u.Post

var Send Data

func GetRequest(w http.ResponseWriter, r *http.Request) {

	Categories := d.GetCategories(Database)
	Posts := d.GetPosts(Database)
	//Load post comments
	for i := 0; i < len(Posts); i++ {
		Posts[i].Comments = d.GetComs(Database, Posts[i].ID)
		//Load comments likes and dislikes
		for j := 0; j < len(Posts[i].Comments); j++ {
			Posts[i].Comments[j].Likes = d.GetReacsCom(Database, 1, Posts[i].Comments[j].ID)
			Posts[i].Comments[j].Dislikes = d.GetReacsCom(Database, -1, Posts[i].Comments[j].ID)
		}
		//Load post likes and dislikes
		Posts[i].Likes = d.GetReacsPost(Database, 1, Posts[i].ID)
		Posts[i].Dislikes = d.GetReacsPost(Database, -1, Posts[i].ID)
	}

	data := make(map[string]interface{})
	data["categories"] = Categories
	data["posts"] = Posts

	b, err := json.Marshal(data)
	if err != nil {
		fmt.Println(err)
		return
	}
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Credentials", "true")

	w.Write(b)
}

func CreatePost(w http.ResponseWriter, r *http.Request) {
	fmt.Println("creating post")

	// Getting login info
	w.Header().Set("Access-Control-Allow-Origin", "*")
	switch r.Method {
	case "OPTIONS":
		w.Header().Set("Access-Control-Allow-Headers", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		return
	}
	if r.Method == "POST" {
		err := json.NewDecoder(r.Body).Decode(&NPost)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		NPost.AuthorID = d.GetUserIDBySesh(Database, NPost.Session)
		NPost.Author = d.GetUserByID(Database, NPost.AuthorID).Username
		fmt.Println("received:", NPost)
	}

	valid_post := false
	//CHECKING POST VALIDITY
	if len(NPost.Content) > 0 && len(NPost.Title) > 0 {
		valid_post = true
		//ADDING TO DATABASE
		d.InsertPost(Database, NPost)
	}

	fmt.Println(valid_post)

	b, err := json.Marshal(valid_post)
	if err != nil {
		fmt.Println(err)
		return
	}

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")

	w.Write(b)
}
