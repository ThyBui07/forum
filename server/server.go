package forum

import (
	"html/template"
	"log"
	"net/http"
)

var tpl *template.Template

func init() {
	tpl = template.Must(template.ParseGlob("server/template/*.html"))
}

func Start() error {

	//handle css from static directory
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./server/static/"))))
	//get request
	http.HandleFunc("/", GetRequest)
	http.HandleFunc("/login", Login)
	http.HandleFunc("/home", Home)
	http.HandleFunc("/signup", Signup)
	http.HandleFunc("/homenew", HomeNew)
	//open port- listen
	log.Println("Starting server port 8080 (http://localhost:8080/)")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		return err
	}
	return nil
}
