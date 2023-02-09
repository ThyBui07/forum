package handlers

import (
	"database/sql"
	d "forum/database"
	"log"
	"net/http"
)

// var tpl *template.Template
var Database *sql.DB

func init() {
	//tpl = template.Must(template.ParseGlob("server/template/*.html"))
	Database = d.GetDB("forum.db")
}

func Start() error {

	PostTemp()
	//handle css from static directory
	//http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./server/static/"))))
	//get request
	http.HandleFunc("/", GetRequest)
	http.HandleFunc("/login", Login)
	http.HandleFunc("/signup", Signup)
	http.HandleFunc("/create-post", CreatePost)
	http.HandleFunc("/check-session", CheckSession)
	http.HandleFunc("/add-reaction", AddReaction)
	http.HandleFunc("/add-comment", CreateComment)
	//open port- listen
	log.Println("Starting server port 8080 (http://localhost:8080/)")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		return err
	}
	return nil
}
