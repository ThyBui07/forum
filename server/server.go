package handlers

import (
	"database/sql"
	d "forum/database"
	"html/template"
	"log"
	"net/http"
)

var tpl *template.Template
var Database *sql.DB

func init() {
	tpl = template.Must(template.ParseGlob("server/template/*.html"))
	Database = d.GetDB("forum.db")
}

func Start() error {

	//handle css from static directory
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./server/static/"))))
	//get request
	http.HandleFunc("/", GetRequest)
	/* http.HandleFunc("/login", Login)
	http.HandleFunc("/home", SignUpRedirect)
	http.HandleFunc("/signup", Signup)
	http.HandleFunc("/home_welcome", LoginRedirect)
	http.HandleFunc("/create_post", CreatePost) */
	//open port- listen
	log.Println("Starting server port 8080 (http://localhost:8080/)")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		return err
	}
	return nil
}
