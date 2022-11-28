package server

import (
	"fmt"
	"net/http"
)

func GetRequest(w http.ResponseWriter, r *http.Request) {
	fmt.Println("work")
	//Tpl.Execute(w, "work")
}
