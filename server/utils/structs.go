package utils

import (
	"github.com/gofrs/uuid"
)

// User :)
type User struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Mobile   string `json:"mobile"`
	Logout   bool   `json:"logout"`
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
	Author      string    `json:"author"`
	Session     uuid.UUID `json:"session"`
	Liked       bool      `json:"liked"`
	Disliked    bool      `json:"disliked"`
	Title       string    `json:"title"`
	Content     string    `json:"content"`
	CategoryIDs string    `json:"category ids"`
	Categories  string    `json:"categories"`
	Date        int64     `json:"date"`
	ImageURL    string    `json:"image src"`
	Likes       []Reac    `json:"Likes"`
	Dislikes    []Reac    `json:"Dislikes"`
	Comments    []Comment `json:"comments"`
}

// Comment c:
type Comment struct {
	ID       int       `json:"id"`
	AuthorID int       `json:"authorId"`
	Author   string    `json:"author"`
	Session  uuid.UUID `json:"session"`
	Liked    bool      `json:"liked"`
	Disliked bool      `json:"disliked"`
	PostID   int       `json:"postId"`
	Content  string    `json:"content"`
	Likes    []Reac    `json:"likes"`
	Dislikes []Reac    `json:"dislikes"`
}

// Like or Dislike >:(
type Reac struct {
	ID        int       `json:"id"`
	LorD      int       `json:"likeOrDislike"`
	AuthorID  int       `json:"authorId"`
	Author    string    `json:"author"`
	Session   uuid.UUID `json:"session"`
	PostID    int       `json:"postId"`
	CommentID int       `json:"commentId"`
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

/* // Cooookieeeees :P
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
*/
