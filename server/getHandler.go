package handlers

import (
	"encoding/json"
	"fmt"
	d "forum/database"
	u "forum/server/utils"
	"net/http"
	"strings"

	"github.com/gofrs/uuid"
)

type Data struct {
	Categories []u.Category `json:"categories"`
	Posts      []u.Post     `json:"posts"`
	Logged     Logged       `json:"logged"`
}

var NPost u.Post

var Send Data

func GetRequest(w http.ResponseWriter, r *http.Request) {

	//Getting session info
	// Make a GET request to the /login endpoint to retrieve the cookie
	resp, err := http.Get("http://localhost:8080/login")
	if err != nil {
		fmt.Println("WHOOPS")
	}
	defer resp.Body.Close()

	var cookieStr string

	// Retrieve the cookie from the response
	if len(resp.Cookies()) > 0 {
		httpcookie := resp.Cookies()[0]
		cookieStr = httpcookie.String()
	}

	cookie := &http.Cookie{}

	// Split the cookie string into separate key-value pairs
	for _, pair := range strings.Split(cookieStr, ";") {
		parts := strings.Split(pair, "=")
		if len(parts) != 2 {
			continue
		}

		switch strings.TrimSpace(parts[0]) {
		case "sessionID":
			cookie.Name = parts[0]
			cookie.Value = parts[1]
		}
	}

	id, _ := uuid.FromString(cookie.Value)

	activeUserID := d.GetUserIDBySesh(Database, id)
	activeUser := d.GetUserByID(Database, activeUserID)

	Categories := d.GetCategories(Database)
	Posts := d.GetPosts(Database)
	//Load post comments
	for i := 0; i < len(Posts); i++ {
		Posts[i].Author = d.GetUserByID(Database, Posts[i].AuthorID).Username
		Posts[i].Comments = d.GetComs(Database, Posts[i].ID)
		//Load comments likes and dislikes
		for j := 0; j < len(Posts[i].Comments); j++ {
			Posts[i].Comments[j].Likes = d.GetReacsCom(Database, 1, Posts[i].ID, Posts[i].Comments[j].ID)
			//Marking the comments liked by active user
			for _, cl := range Posts[i].Comments[j].Likes {
				if cl.Author == activeUser.Username {
					Posts[i].Liked = true
				}
			}

			Posts[i].Comments[j].Dislikes = d.GetReacsCom(Database, -1, Posts[i].ID, Posts[i].Comments[j].ID)
			//Marking the comments disliked by active user
			for _, cl := range Posts[i].Comments[j].Dislikes {
				if cl.Author == activeUser.Username {
					Posts[i].Disliked = true
				}
			}
		}
		//Load post likes and dislikes
		Posts[i].Likes = d.GetReacsPost(Database, 1, Posts[i].ID)

		//Marking the posts liked by active user
		for _, pl := range Posts[i].Likes {
			if pl.Author == activeUser.Username {
				Posts[i].Liked = true
			}
		}
		//Marking the posts disliked by active user
		for _, pd := range Posts[i].Dislikes {
			if pd.Author == activeUser.Username {
				Posts[i].Disliked = true
			}
		}
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

var NCom u.Comment

func CreateComment(w http.ResponseWriter, r *http.Request) {
	fmt.Println("creating comment")

	// Getting login info
	w.Header().Set("Access-Control-Allow-Origin", "*")
	switch r.Method {
	case "OPTIONS":
		w.Header().Set("Access-Control-Allow-Headers", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		return
	}
	if r.Method == "POST" {
		err := json.NewDecoder(r.Body).Decode(&NCom)
		if err != nil {
			fmt.Println("OH NO :((((((", NCom)
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		NCom.AuthorID = d.GetUserIDBySesh(Database, NCom.Session)
		NCom.Author = d.GetUserByID(Database, NCom.AuthorID).Username
		fmt.Println("received:", NCom)
	}

	valid_com := false
	//CHECKING POST VALIDITY
	if len(NCom.Content) > 0 {
		valid_com = true
		//ADDING TO DATABASE
		d.InsertCom(Database, NCom)
	}

	b, err := json.Marshal(valid_com)
	if err != nil {
		fmt.Println(err)
		return
	}

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")

	w.Write(b)
}

var NReac u.Reac

func AddReaction(w http.ResponseWriter, r *http.Request) {
	fmt.Println("adding reaction")

	// Getting login info
	w.Header().Set("Access-Control-Allow-Origin", "*")
	switch r.Method {
	case "OPTIONS":
		w.Header().Set("Access-Control-Allow-Headers", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		return
	}
	if r.Method == "POST" {
		err := json.NewDecoder(r.Body).Decode(&NReac)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		NReac.AuthorID = d.GetUserIDBySesh(Database, NReac.Session)
		NReac.Author = d.GetUserByID(Database, NReac.AuthorID).Username
		fmt.Println("received reaction:", NReac)
	}
	//If it's post
	if NReac.PostID != 0 && NReac.CommentID == 0 {
		fmt.Println("commentID is 0")
		NReac.CommentID = 0
	}

	var allReacs []u.Reac

	if NReac.CommentID != 0 {
		fmt.Println("comment reac")
		already := false
		allReacs = d.GetReacsCom(Database, NReac.LorD, NReac.PostID, NReac.CommentID)
		for _, r := range allReacs {
			if r.AuthorID == NReac.AuthorID {
				already = true
				//REMOVE REAC FROM DATABASE
				d.DeleteReaction(Database, NReac)
				break
			}
		}
		if !already {
			// ADDING TO DATABASE IF DOESN'T EXIST
			d.InsertReac(Database, NReac)
		}
	} else if NReac.PostID != 0 && NReac.CommentID == 0 {
		already := false
		allReacs = d.GetReacsPost(Database, NReac.LorD, NReac.PostID)
		allOppositeReacs := d.GetReacsPost(Database, -NReac.LorD, NReac.PostID)
		for _, r := range allReacs {
			if r.AuthorID == NReac.AuthorID {
				already = true
				//REMOVE REAC FROM DATABASE
				fmt.Println("removing reac")
				d.DeleteReaction(Database, NReac)
				break
			}
		}
		//If there is an opposite reaction you can't unless you remove the other first
		for _, r := range allOppositeReacs {
			if r.AuthorID == NReac.AuthorID {
				already = true
				break
			}
		}
		if !already {
			// ADDING TO DATABASE IF DOESN'T EXIST
			fmt.Println("adding reac")
			d.InsertReac(Database, NReac)
		}
	}

	b, err := json.Marshal(true)
	if err != nil {
		fmt.Println(err)
		return
	}

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")

	w.Write(b)
}
