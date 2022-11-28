package forum

import (
	"fmt"
	d "forum/database"
	"net/http"
)

type Logged struct {
	Username string
	LoggedIn bool
}

type Categories struct {
	Title string
}

func GetRequest(w http.ResponseWriter, r *http.Request) {

	if r.URL.Path != "/" {
		errHandlers(w, r, http.StatusNotFound)
		return
	}
	if tpl == nil {
		errHandlers(w, r, http.StatusInternalServerError)
		return
	}

	/* 	c := []Categories{}
	   	dbc, err := d.GetDB("categories.db")
	   	time.Sleep(2 * time.Second)
	   	d.InsertInCategories(dbc, "first", "62oz")
	   	titles := d.GetCategories(dbc)
	   	for i := range titles {
	   		temp := Categories{}
	   		temp.Title = titles[i]
	   		c = append(c, temp)
	   	}
	   	d.CheckErr(err) */

	tpl.ExecuteTemplate(w, "home.html", nil)
}

func Login(w http.ResponseWriter, r *http.Request) {

	tpl.ExecuteTemplate(w, "login.html", nil)

}

func Signup(w http.ResponseWriter, r *http.Request) {

	tpl.ExecuteTemplate(w, "signup.html", nil)
}

func Home(w http.ResponseWriter, r *http.Request) {
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

func HomeNew(w http.ResponseWriter, r *http.Request) {
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
		l.LoggedIn = true
		tpl.ExecuteTemplate(w, "logged_home.html", l)
	} else {
		l.LoggedIn = false
		tpl.ExecuteTemplate(w, "wronglogin.html", nil)
	}
}
