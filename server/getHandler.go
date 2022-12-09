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
	//Posts      []u.Post     `json:"posts"`
	//Logged     Logged
}

var Send Data

func GetRequest(w http.ResponseWriter, r *http.Request) {
	Categories := d.GetCategories(Database)
	/* //Posts := d.GetPosts(Database)
	var dataToSend Data
	dataToSend.Categories = Categories
	//dataToSend.Posts = Posts */
	b, err := json.Marshal(Categories)
	if err != nil {
		fmt.Println(err)
		return
	}
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Write(b)

}

// Unmarshal received json and add it to database :*
func ReceivePost(w http.ResponseWriter, r *http.Request) {
	var new_post u.Post

	Categories := d.GetCategories(Database)
	b, err := json.Marshal(Categories)
	if err != nil {
		fmt.Println(err)
		return
	}
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Write(b)

	err = json.NewDecoder(r.Body).Decode(&new_post)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	d.InsertPost(Database, new_post)

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
