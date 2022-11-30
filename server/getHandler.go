package server

import (
	"fmt"
	"net/http"
)

func GetRequest(w http.ResponseWriter, r *http.Request) {
	fmt.Println("work")
	b := []byte("hello world")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	w.Write(b)
	return
	//Tpl.Execute(w, "work")
}
