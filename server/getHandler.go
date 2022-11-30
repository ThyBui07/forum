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
	/* Logged     Logged */
}

var Send Data

func GetRequest(w http.ResponseWriter, r *http.Request) {

	Categories := d.GetCategories(Database)
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
	Posts := d.GetPosts(Database)

	Send.Categories = Categories
	Send.Posts = Posts

	if r.URL.Path != "/" {
		errHandlers(w, r, http.StatusNotFound)
		return
	}
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
