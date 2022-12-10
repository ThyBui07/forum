package handlers

import (
	"encoding/json"
	"fmt"
	u "forum/server/utils"
	"net/http"
)

type Logged struct {
	User     u.User `json:"user"`
	LoggedIn int    `json"loggedin"`
}

/* // Register handler
func SignUpRedirect(w http.ResponseWriter, r *http.Request) {
	// Getting registration info
	username := r.PostFormValue("Susername")
	email := r.PostFormValue("Semail")
	password := r.PostFormValue("Spassword")

	reg_success := d.InsertInUsers(Database, username, email, password)

	// If user does not exist -> add user and redirect home with success message
	if reg_success {
		fmt.Printf("New user added: %s.", username)
		err := tpl.ExecuteTemplate(w, "home.html", Send)
		if err != nil {
			errHandlers(w, r, http.StatusInternalServerError)
		}
	} else {
		// If user exists -> redirect to registration page with failure message
		err := tpl.ExecuteTemplate(w, "signup.html", reg_success)
		if err != nil {
			errHandlers(w, r, http.StatusInternalServerError)
		}
	}
} */

// Login handler
func LoginRedirect(w http.ResponseWriter, r *http.Request) {
	// Getting login info
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000/loginredirect")
	switch r.Method {
	case "OPTIONS":
		w.Header().Set("Access-Control-Allow-Headers", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		return
	}
	var LUser u.User

	LUser.Username = ""
	LUser.Password = ""

	if r.Method == "POST" {
		fmt.Println("he")
		err := json.NewDecoder(r.Body).Decode(&LUser)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		fmt.Println("received:", LUser)
	}

	/* 	log_success := d.UserAuth(Database, lUser.Username, lUser.Password)
	   	// If username and password match -> home with success message
	   	if log_success {
	   		lUser = d.GetUserByUsername(Database, lUser.Username)
	   		Send.Logged = l

	   	} else {
	   		l.LoggedIn = 0
	   		Send.Logged = l

	   	} */

}
