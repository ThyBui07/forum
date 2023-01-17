package handlers

import (
	"encoding/json"
	"fmt"
	d "forum/database"
	"log"
	"net/http"

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
		sessionID, err := uuid.FromString(temp.SessionIDstr)
		if err != nil {
			log.Printf("Error converting session ID to UUID: %v", err)
			http.Error(w, "Invalid session ID", http.StatusBadRequest)
			return
		}

		fmt.Println("seshID:", sessionID)
	}

	userID := d.GetUserIDBySesh(Database, sessionID)
	var a ActiveSession
	a.Status = "failed"
	if userID != 0 {
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
	w.Write(b)
}
