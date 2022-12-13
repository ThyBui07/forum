package handlers

import (
	"encoding/json"
	"fmt"
	d "forum/database"
	u "forum/server/utils"
	"net/http"
)

type Logged struct {
	User    u.User
	Success bool
}

var LUser u.User

func Signin(w http.ResponseWriter, r *http.Request) {
	fmt.Println(r)
	l := Logged{}
	username := r.PostFormValue("username")
	password := r.PostFormValue("password")

	log_success := d.UserAuth(Database, username, password)
	// If username and password match -> home with success message
	if log_success {
		l.User = d.GetUserByUsername(Database, username)
		l.Success = true
		// Send.Logged = l
		// err := tpl.ExecuteTemplate(w, "home.html", Send)
		// if err != nil {
		// 	errHandlers(w, r, http.StatusInternalServerError)
		// }
	} else {
		//err := tpl.ExecuteTemplate(w, "login.html", nil)
		l.Success = false
		// Send.Logged = l
		// if err != nil {
		// 	errHandlers(w, r, http.StatusInternalServerError)
		// }
	}
}

func Signin1(w http.ResponseWriter, r *http.Request) {

	fmt.Println("loginrediret0")

	// Getting login info
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000/login")
	switch r.Method {
	case "OPTIONS":
		w.Header().Set("Access-Control-Allow-Headers", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		return
	}
	if r.Method == "POST" {
		fmt.Println("he")
		err := json.NewDecoder(r.Body).Decode(&LUser)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			fmt.Println("herrr")
			return
		}
		fmt.Println("received:", LUser)
	}

	log_success := d.UserAuth(Database, LUser.Username, LUser.Password)

	fmt.Println(log_success)

	b, err := json.Marshal(log_success)
	if err != nil {
		fmt.Println(err)
		return
	}

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")

	w.Write(b)
}
