package utils

import (
	"net/http"
	"net/http/cookiejar"
	"time"

	"github.com/gofrs/uuid"
)

// User :)
type User struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Mobile   string `json:"mobile"`
}

// Category :O
type Category struct {
	Id       int    `json:"id"`
	Title    string `json:"title"`
	NumPosts int    `json:"numPosts"`
	Posts    []Post `json:"posts"`
}

// Post :D
type Post struct {
	ID          int       `json:"id"`
	AuthorID    int       `json:"author id"`
	Title       string    `json:"title"`
	Content     []byte    `json:"content"`
	CategoryIDs string    `json:"category ids"`
	Categories  string    `json:"categories"`
	Date        string    `json:"date"`
	ImageURL    string    `json:"image src"`
	Reactions   []Reac    `json:"reactions"`
	Comments    []Comment `json:"comments"`
}

// Comment c:
type Comment struct {
	ID        int    `json:"id"`
	AuthorID  int    `json:"author id"`
	PostID    int    `json:"post id"`
	Content   string `json:"content"`
	Reactions []Reac `json:"reactions"`
}

// Like or Dislike >:(
type Reac struct {
	ID        int `json:"id"`
	LorD      int `json:"like or dislike"`
	AuthorID  int `json:"author id"`
	PostID    int `json:"post id"`
	CommentID int `json:"comment id"`
}

// Image :$
type Image struct {
	ID       int    `json:"id"`
	PostID   int    `json:"post id"`
	ImageURL string `json:"image src"`
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
