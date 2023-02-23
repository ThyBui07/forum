package handlers

import (
	"encoding/json"
	"fmt"
	d "forum/database"
	u "forum/server/utils"
	"log"
	"net/http"
	"regexp"
	"time"

	uuid "github.com/gofrs/uuid"
	"golang.org/x/crypto/bcrypt"
)

type Logged struct {
	User    u.User `json:"user"`
	Success bool   `json:"success"`
}

var LUser u.User
var sesh u.Session

func Login(w http.ResponseWriter, r *http.Request) {

	var logged Logged
	// begin new transaction
	fmt.Println("Begin transaction in login")
	tx, err := Database.Begin()
	if err != nil {
		log.Fatal(err)
	}
	defer tx.Commit()
	// Getting login info

	if r.Method == "POST" {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		err := json.NewDecoder(r.Body).Decode(&LUser)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		if LUser.Logout {
			LUser.Username = ""
			deleteCookie(w, "sessionID")
			cookie, err := r.Cookie("sessionID")
			if err == nil {
				id, err := uuid.FromString(cookie.Value)
				if err != nil {
					d.DeleteSession(tx, id)
				}
			}

			fmt.Println("Deleted cookie and loggedout")
			/* 			err = tx.Commit()
			   			if err != nil {
			   				log.Fatal(err)
			   			}
			   			return */
		}
	}

	var b []byte

	// Checking if credentials correct from database
	log_success, freshUuid := d.UserAuth(tx, LUser.Username, LUser.Password, w)
	LUser.ID = d.GetUserByUsername(Database, LUser.Username).ID

	if log_success {
		logged.Success = true
		logged.User = LUser
	} else {
		logged.Success = false
	}

	sessionID, err := r.Cookie("sessionID")
	if err != nil {
		//fmt.Println("Cookie not found -> fetching cookie")

		if log_success {
			// Set the cookie with the session ID and expiration date
			expiration := time.Now().Add(time.Minute * 20)

			cookie := &http.Cookie{
				Name:     "sessionID",
				Value:    freshUuid.String(),
				Expires:  expiration,
				SameSite: http.SameSiteStrictMode,
				Secure:   false,
				Path:     "/",
			}
			w.Header().Add("Set-Cookie", cookie.String())
			http.SetCookie(w, cookie)

			sesh.UUID = freshUuid
			sesh.UserID = LUser.ID
			sesh.ExpDate = expiration.Unix()

		}

	} else {
		fmt.Println("There is already an active session, session ID:", sessionID.Value)
		// Update session
		newUuid, err := uuid.FromString(sessionID.Value)
		if err != nil {
			log.Fatalf("failed to parse UUID %q: %v", sessionID, err)
		}
		sesh = d.GetSession(Database, newUuid)
		if sesh != (u.Session{}) {
			d.UpdateSession(sesh, tx)
			http.SetCookie(w, sessionID)
		} else {
			deleteCookie(w, "sessionID")
		}
	}

	b, err = json.Marshal(logged)
	if err != nil {
		fmt.Println(err)
		return
	}

	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Credentials", "true")

	// Write to the client the status of login success
	w.Write(b)

	/* 	err = tx.Commit()
	   	if err != nil {
	   		log.Fatal(err)
	   	} */

}

type SignupResult struct {
	Success bool     `json:"success"`
	Wrong   []string `json:"wrong"`
}

var success = false

func Signup(w http.ResponseWriter, r *http.Request) {
	// begin new transaction
	tx, err := Database.Begin()
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("signing up")
	var res SignupResult

	// Getting login info
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000/signup")
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
			return
		}
		fmt.Println("received:", LUser.Username)
	}

	user_exists, _ := d.UserAuth(tx, LUser.Username, LUser.Password, w)
	if user_exists {
		res.Wrong = append(res.Wrong, "exist")
	}

	emailMatch, _ := regexp.MatchString(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`, LUser.Email)
	if emailMatch {
		fmt.Println("Valid email address")
	} else {
		fmt.Println("Invalid email address")
		res.Wrong = append(res.Wrong, "email")
	}

	UsernameMatch, _ := regexp.MatchString("^[a-zA-Z0-9_]+$", LUser.Username)
	if UsernameMatch {
		fmt.Println("Valid username")
	} else {
		fmt.Println("Invalid username")
		res.Wrong = append(res.Wrong, "username")
	}

	if len(LUser.Password) < 4 {
		res.Wrong = append(res.Wrong, "password")
	}

	if !user_exists && emailMatch && UsernameMatch && len(LUser.Password) > 3 /* && other conditions */ {
		fmt.Println("User doesn't exist yet")
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(LUser.Password), bcrypt.DefaultCost)
		if err != nil {
			fmt.Println("Error hashing the password:", err)
			return
		}
		if d.InsertInUsers(Database, LUser.Username, LUser.Email, string(hashedPassword), LUser.Email) {
			fmt.Println("Successfully added user to database.")
			res.Success = true
		}
	}

	b, err := json.Marshal(res)
	if err != nil {
		fmt.Println(err)
		return
	}

	err = tx.Commit()
	if err != nil {
		log.Fatal(err)
	}

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")

	w.Write(b)
}

func deleteCookie(w http.ResponseWriter, name string) {
	cookie := &http.Cookie{
		Name:   name,
		Value:  "",
		MaxAge: -1,
	}
	http.SetCookie(w, cookie)
}
