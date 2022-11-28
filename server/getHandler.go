package forum

import (
	"fmt"
	d "forum/database"
	u "forum/utils"
	"net/http"
)

var Categories []Category

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

	err := tpl.ExecuteTemplate(w, "home.html", Categories)
	u.CheckErr(err)
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
	u.CheckErr(err)
	info := d.InsertInUsers(db, username, email, password)
	fmt.Println(info)
	tpl.ExecuteTemplate(w, "home.html", nil)
}

func HomeAfterLogin(w http.ResponseWriter, r *http.Request) {
	//Login stuff
	user := User{}
	username := r.PostFormValue("Lusername")
	password := r.PostFormValue("Lpassword")
	db, err := d.GetDB("users.db")
	u.CheckErr(err)
	d.PrintTable(db)
	fmt.Println(d.UserAuth(db, username, password))

	//Loading Categories

	//Launching templates
	if d.UserAuth(db, username, password) {
		user.Username = username
		tpl.ExecuteTemplate(w, "logged_home.html", user)
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
	u.CheckErr(err)

}

var Posts []Post

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
	u.CheckErr(err)

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
