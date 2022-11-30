package handlers

import (
	"net/http"
)

// To post creation page
func CreatePost(w http.ResponseWriter, r *http.Request) {
	err := tpl.ExecuteTemplate(w, "post.html", Send)
	if err != nil {
		errHandlers(w, r, http.StatusInternalServerError)
	}
}
