package utils

import (
	"net/http"
	"net/http/cookiejar"
	"time"

	"github.com/gofrs/uuid"
)

// User :)
type User struct {
	ID       int
	Username string
}

// Category :O
type Category struct {
	Id       int
	Title    string
	NumPosts int
	Posts    []Post
}

// Post :D
type Post struct {
	ID         int
	AuthorID   int
	Title      string
	Content    string
	CategoryID int
	Date       string
	ImageID    string
}

// Comment c:
type Comment struct {
	ID       int
	AuthorID int
	PostID   int
	Content  string
}

// Like or Dislike >:(
type Reac struct {
	ID        int
	LorD      int
	AuthorID  int
	PostID    int
	CommentID int
}

// Image :$
type Image struct {
	ID       int
	PostID   int
	ImageURL string
}

// >>>>>>>>>> Stuff I'm still figuring out

// Session ?_?
type Session struct {
	ID      int
	UserID  int
	UUID    uuid.UUID
	ExpDate int64
}

// Cooookieeeees :P
type Cookie struct {
	Name    string
	Value   string
	Expires time.Time
	// MaxAge=0 means no 'Max-Age' attribute specified.
	// MaxAge<0 means delete cookie now, equivalently 'Max-Age: 0'
	// MaxAge>0 means Max-Age attribute present and given in seconds
	MaxAge   int
	Secure   bool
	HttpOnly bool
	//SameSite SameSite
	Raw      string
	Unparsed []string
}

//Trying out cookies stuff

var client http.Client

func init() {
	jar, err := cookiejar.New(nil)
	CheckErr(err)
	client = http.Client{
		Jar: jar,
	}
}

func Cookies() {
	cookie := &http.Cookie{
		Name:   "token",
		Value:  "some_token",
		MaxAge: 300,
	}
	req, err := http.NewRequest("GET", "ifjeifjiwej.com", nil)
	CheckErr(err)
	req.AddCookie(cookie)
	resp, err := client.Do(req)
	CheckErr(err)
	defer resp.Body.Close()
}
