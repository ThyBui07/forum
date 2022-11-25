package forum

import (
	"fmt"
	d "forum/database"
	"net/http"
)

type Data struct {
	Logged     Logged
	Categories []Category
}

type Logged struct {
	Username string
}

type Category struct {
	Id       int
	Title    string
	NumPosts int
	Posts    []d.Post
}

type Post struct {
	Id      int
	Title   string
	Content string
	Author  string
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
	d.InsertInCategories(dbc, "first", "62oz")
	titles := d.GetCategories(dbc)
	for i := range titles {
		temp := Category{}
		temp.Title = titles[i]
		temp.NumPosts = 0
		temp.Id = i
		Categories = append(Categories, temp)
	}
	d.CheckErr(err)

}

var Posts []d.Post

func PopulatePosts(c Category) {

	dbp, err := d.GetDB("posts.db")
	d.InsertInPosts(dbp, "first", "62oz", "hihihihihihi", "first")
	d.InsertInPosts(dbp, "second", "62oz", "hahahhaha", "first")

	Posts = d.GetPostsOfCategory(dbp, c.Title)
	for i := range Posts {
		for j := range Categories {
			if Posts[i].Category == Categories[j].Title {
				Categories[j].Posts = append(Categories[j].Posts, Posts[i])
			}
		}
	}
	fmt.Println(Categories)
	d.CheckErr(err)

}

func GetCategoryById(w http.ResponseWriter, r *http.Request) {
	title := r.URL.Query().Get("Title")
	var res Category
	if title == "" {
		//BAD REQUEST
		return
	} else {
		for i, v := range Categories {
			if v.Title == title {
				res = Categories[i]
				break
			}
		}
	}
	if res.Id == 0 {
		//NOT FOUND
		return
	}
	PopulatePosts(res)
	tpl.ExecuteTemplate(w, "category.html", res)
}
