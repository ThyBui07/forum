package forum

import (
	"fmt"
	d "forum/database"
	"net/http"
	"time"
)

type Data struct {
	Logged     Logged
	Categories []Category
}

type Logged struct {
	Username string
}

type Category struct {
	id       int
	Title    string
	NumPosts int
	Posts    []Post
}

type Post struct {
	id      int
	Title   string
	Content string
}

var Categories []Category
var data Data

func GetRequest(w http.ResponseWriter, r *http.Request) {

	if r.URL.Path != "/" {
		errHandlers(w, r, http.StatusNotFound)
		return
	}
	if tpl == nil {
		errHandlers(w, r, http.StatusInternalServerError)
		return
	}
	PopulateCategories()

	data.Categories = Categories
	err := tpl.ExecuteTemplate(w, "home.html", data)
	d.CheckErr(err)
}

func Login(w http.ResponseWriter, r *http.Request) {

	tpl.ExecuteTemplate(w, "login.html", nil)

}

func Signup(w http.ResponseWriter, r *http.Request) {

	tpl.ExecuteTemplate(w, "signup.html", nil)
}

func HomeAfterSignup(w http.ResponseWriter, r *http.Request) {
	username := r.PostFormValue("Susername")
	fmt.Println("user", username)
	email := r.PostFormValue("Semail")
	password := r.PostFormValue("Spassword")

	fmt.Println("new user:", username)
	db, err := d.GetDB("users.db")
	d.CheckErr(err)
	d.InsertInUsers(db, username, email, password)
	tpl.ExecuteTemplate(w, "home.html", nil)
}

func HomeAfterLogin(w http.ResponseWriter, r *http.Request) {
	//Login stuff
	l := Logged{}
	username := r.PostFormValue("Lusername")
	password := r.PostFormValue("Lpassword")
	fmt.Println("user", username)
	db, err := d.GetDB("users.db")
	d.CheckErr(err)
	d.PrintTable(db)
	fmt.Println(d.UserExists(db, username, password))

	//Loading Categories

	//Launching templates
	if d.UserExists(db, username, password) {
		l.Username = username
		tpl.ExecuteTemplate(w, "logged_home.html", l)
	} else {
		tpl.ExecuteTemplate(w, "wronglogin.html", nil)
	}
}

func ViewCategory(w http.ResponseWriter, r *http.Request) {

	tpl.ExecuteTemplate(w, "category.html", Categories)

}

func PopulateCategories() {

	dbc, err := d.GetDB("categories.db")
	time.Sleep(2 * time.Second)
	d.InsertInCategories(dbc, "first", "62oz")
	titles := d.GetCategories(dbc)
	for i := range titles {
		temp := Category{}
		temp.Title = titles[i]
		temp.NumPosts = 0
		temp.id = i
		Categories = append(Categories, temp)
	}
	d.CheckErr(err)

}
