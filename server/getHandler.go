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
	Logged     Logged
}

var Send Data

func GetRequest(w http.ResponseWriter, r *http.Request) {

	Categories := d.GetCategories(Database)
	b, err := json.Marshal(Categories)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(string(b))
	Posts := d.GetPosts(Database)

	Send.Categories = Categories
	Send.Posts = Posts

	if r.URL.Path != "/" {
		errHandlers(w, r, http.StatusNotFound)
		return
	}
	if tpl == nil {
		errHandlers(w, r, http.StatusInternalServerError)
		return
	}

	err = tpl.ExecuteTemplate(w, "home.html", Send)
	if err != nil {
		errHandlers(w, r, http.StatusInternalServerError)
	}
}
