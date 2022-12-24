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

var success = false

func Signup(w http.ResponseWriter, r *http.Request) {

	fmt.Println("signing up")

	// Getting login info
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000/login")
	switch r.Method {
	case "OPTIONS":
		w.Header().Set("Access-Control-Allow-Headers", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		return
	}
	if r.Method == "POST" {
		fmt.Println("received sign up info")
		err := json.NewDecoder(r.Body).Decode(&LUser)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			fmt.Println("herrr")
			return
		}
		fmt.Println("received:", LUser)
	}

	user_exists := d.UserAuth(Database, LUser.Username, LUser.Password)

	if !user_exists /* && other conditions */ {
		fmt.Println("User doesn't exist yet")
		if d.InsertInUsers(Database, LUser.Username, LUser.Email, LUser.Password) {
			fmt.Println("Successfully added user to database.")
			success = true
		}
	}

	b, err := json.Marshal(success)
	if err != nil {
		fmt.Println(err)
		return
	}

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")

	w.Write(b)
}
