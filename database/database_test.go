package database

import (
	"testing"
)

func TestGetCategories(t *testing.T) {
	db := GetDB("forum.db")
	cats := GetCategories(db)
	if len(cats) == 0 {
		t.Error("No categories found")
	}
}

func TestGetCategoriesNames(t *testing.T) {
	db := GetDB("forum.db")
	cats := GetCategoriesNames(db)
	if len(cats) == 0 {
		t.Error("No categories found")
	}
}

func TestGetDB(t *testing.T) {
	db := GetDB("forum.db")
	if db == nil {
		t.Error("Database is nil")
	}
}

func TestGetComs(t *testing.T) {
	db := GetDB("forum.db")
	coms := GetComs(db, 1)
	if len(coms) == 0 {
		// t.Error("No comments found")
	}
}

func TestCountComs(t *testing.T) {
	db := GetDB("forum.db")
	n := CountComs(db, 1)
	if n == 0 {
		// t.Error("No comments found")
	}
}

func TestGetPosts(t *testing.T) {
	db := GetDB("forum.db")
	posts := GetPosts(db)
	if len(posts) == 0 {
		// t.Error("No posts found")
	}
}

func TestGetPostsByAuthor(t *testing.T) {
	db := GetDB("forum.db")
	posts := GetPostsByAuthor(db, 1)
	if len(posts) == 0 {
		// t.Error("No posts found")
	}
}

func TestGetPostByID(t *testing.T) {
	db := GetDB("forum.db")
	post := GetPostByID(db, 1)
	if post.ID == 0 {
		// t.Error("No post found")
	}
}

func TestInsertPost(t *testing.T) {
}

func TestCountReacsPost(t *testing.T) {
	db := GetDB("forum.db")
	n := CountReacsPost(db, 1, 1)
	if n == 0 {
		// t.Error("No reactions found")
	}
}

func TestCountReacsCom(t *testing.T) {
	db := GetDB("forum.db")
	n := CountReacsCom(db, 1, 1)
	if n == 0 {
		// t.Error("No reactions found")
	}
}

func TestInsertReac(t *testing.T) {

}

func TestGetReacsPost(t *testing.T) {
	db := GetDB("forum.db")
	reacs := GetReacsPost(db, 1, 1)
	if len(reacs) == 0 {
		// t.Error("No reactions found")
	}
}

func TestGetReacsCom(t *testing.T) {
	db := GetDB("forum.db")
	reacs := GetReacsCom(db, 1, 1)
	if len(reacs) == 0 {
		// t.Error("No reactions found")
	}
}

func TestDeleteReaction(t *testing.T) {

}

func TestGetLikedPostsIDs(t *testing.T) {
	db := GetDB("forum.db")
	ids := GetLikedPostsIDs(db, 1)
	if len(ids) == 0 {
		// t.Error("No liked posts found")
	}
}

func TestInsertSession(t *testing.T) {

}

func TestUpdateSession(t *testing.T) {

}

func TestUpdateSessionTime(t *testing.T) {

}

func TestIsExpired(t *testing.T) {

}

func TestGetSession(t *testing.T) {

}

func TestDeleteSession(t *testing.T) {

}

func TestUserAuth(t *testing.T) {

}

func TestUserExists(t *testing.T) {

}

func TestEmailExists(t *testing.T) {

}

func TestInsertInUsers(t *testing.T) {

}

func TestGetUser(t *testing.T) {

}

func TestGetUserByID(t *testing.T) {

}

func TestGetUserByUsername(t *testing.T) {

}

func TestPrintTable(t *testing.T) {

}

func TestGetUserIDBySesh(t *testing.T) {

}
