package handlers

import (
	"fmt"
	d "forum/database"
	u "forum/server/utils"
	"net/http"
)

type Logged struct {
	User    u.User
	Success bool
}

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
	fmt.Println(r)
	fmt.Println(r.Method)
	fmt.Println(r.Body)
	if r.Method != http.MethodPost {
		fmt.Println("only POST method allowed")
		return
	}

	username := r.PostFormValue("name")
	email := r.PostFormValue("email")
	mobileNumber := r.PostFormValue("mobileNumber")

	fmt.Printf("this is username %s with email %s with mobile number %s \n", username, email, mobileNumber)
	//w.Header().Set("Access-Control-Allow-Origin", "*")

	b := []byte("{\"user\":\"gin\"}")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")

	w.Write(b)
}
