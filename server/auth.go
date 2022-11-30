package handlers

import (
	"fmt"
	d "forum/database"
	u "forum/utils"
	"net/http"
)

type Logged struct {
	User    u.User
	Success bool
}

// To login page
func Login(w http.ResponseWriter, r *http.Request) {
	Send.Logged.Success = true

	err := tpl.ExecuteTemplate(w, "login.html", Send)
	if err != nil {
		errHandlers(w, r, http.StatusInternalServerError)
	}
}

// To registration page
func Signup(w http.ResponseWriter, r *http.Request) {
	err := tpl.ExecuteTemplate(w, "signup.html", nil)
	if err != nil {
		errHandlers(w, r, http.StatusInternalServerError)
	}
}

// Register handler
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
}

// Login handler
func LoginRedirect(w http.ResponseWriter, r *http.Request) {
	// Getting login info
	l := Logged{}
	username := r.PostFormValue("Lusername")
	password := r.PostFormValue("Lpassword")

	log_success := d.UserAuth(Database, username, password)
	// If username and password match -> home with success message
	if log_success {
		l.User = d.GetUserByUsername(Database, username)
		l.Success = true
		Send.Logged = l
		err := tpl.ExecuteTemplate(w, "home.html", Send)
		if err != nil {
			errHandlers(w, r, http.StatusInternalServerError)
		}
	} else {
		err := tpl.ExecuteTemplate(w, "login.html", nil)
		l.Success = false
		Send.Logged = l
		if err != nil {
			errHandlers(w, r, http.StatusInternalServerError)
		}
	}
}
