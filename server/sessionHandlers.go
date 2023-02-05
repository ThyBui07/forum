package handlers

import (
	"encoding/json"
	"fmt"
	d "forum/database"
	u "forum/server/utils"
	"log"
	"net/http"
	"time"

	"github.com/gofrs/uuid"
)

type ActiveSession struct {
	Status string `json:"status"`
}

type Session struct {
	SessionIDstr string `json:"SessionID"`
}

func CheckSession(w http.ResponseWriter, r *http.Request) {

	var sessionID uuid.UUID
	var temp Session

	// Getting session info from client
	w.Header().Set("Access-Control-Allow-Origin", "*")
	switch r.Method {
	case "OPTIONS":
		w.Header().Set("Access-Control-Allow-Headers", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		return
	}
	if r.Method == "POST" {
		err := json.NewDecoder(r.Body).Decode(&temp)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		sessionID, err = uuid.FromString(temp.SessionIDstr)
		if err != nil {
			log.Printf("Error converting session ID to UUID: %v", err)
			http.Error(w, "Invalid session ID", http.StatusBadRequest)
			return
		}

		fmt.Println("seshID check:", sessionID)
	}

	sesh := d.GetSession(Database, sessionID)

	var a ActiveSession
	a.Status = "failed"
	fmt.Println("Sesh found in database:", sesh)

	//Check if session not empty (i.e. it was found in the DB)
	if sesh != (u.Session{}) {
		//Send success and update cookie expiration time
		expiration := time.Now().Add(time.Minute * 20)

		cookie := &http.Cookie{
			Name:     "sessionID",
			Value:    sesh.UUID.String(),
			Expires:  expiration,
			SameSite: http.SameSiteNoneMode,
			Secure:   false,
			Path:     "/",
		}
		w.Header().Add("Set-Cookie", cookie.String())
		http.SetCookie(w, cookie)
		a.Status = "success"
	}
	b, err := json.Marshal(a)
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
