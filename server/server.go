package server

import (
	"log"
	"net/http"
)

//create a variable from server package
//var Tpl *template.Template

func Start() error {
	//tmpl, err := template.ParseFiles("server/template/index.html")
	// if err != nil {
	// 	return err
	// }
	// Tpl = tmpl
	//handle css from static directory
	//http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./server/static/"))))
	//get request
	http.HandleFunc("/", GetRequest)
	//post request
	//open port- listen
	log.Println("Staring server on port...")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		return err
	}
	return nil
}
