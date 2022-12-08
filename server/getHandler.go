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
	Categories := d.GetCategories(Database)
	b, err := json.Marshal(Categories)
	if err != nil {
		fmt.Println(err)
		return
	}
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Write(b)

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
