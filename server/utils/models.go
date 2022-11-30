package utils

type JSON_User struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type JSON_Category struct {
	ID    int         `json:"id"`
	Title string      `json:"title"`
	Posts []JSON_Post `json:"posts"`
}

type JSON_Post struct {
	ID       int             `json:"id"`
	AuthorID int             `json:"author id"`
	Title    string          `json:"title"`
	Content  string          `json:"content"`
	Comments []JSON_Comment  `json:"comments"`
	Reacs    []JSON_Reaction `json:"reactions"`
}

type JSON_Comment struct {
	ID       int             `json:"id"`
	AuthorID int             `json:"author id"`
	Content  string          `json:"content"`
	Reacs    []JSON_Reaction `json:"reactions"`
}

type JSON_Reaction struct {
	ID        int `json:"id"`
	AuthorID  int `json:"author id"`
	LorD      int `json:"like or dislike"`
	PostID    int `json:"post id"`
	CommentID int `json:"comment id"`
}
