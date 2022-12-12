import React, { Component } from "react";
import '../Components/css/MyAccount.scss';
import dislikesIcon from '../Components/img/dislikes.png'
import commentsIcon from '../Components/img/comments.png'
import shareIcon from '../Components/img/share.png'

//import { useState, useEffect } from "react";
const user = [
  {id: 1, Username: "gin", email: "gin.com", password: "abc123"},
  {id: 2, Username: "nafi", email: "nafi.com", password: "321abc"},
]
const category = [
  {id: 1, Name: "appetizer"},
  {id: 2, Name: "main"},
  {id: 3, Name: "dessert"},
]
const post = [
  {id: 1, authorId: 1, title: "Daim Frozen Cake", content: "Base: Mix Digestive Biscuits with Butter, Middle: Creme Fraiche, whipped cream and caramel sauce, Top: sprinkle cut daim bars", Date: "01 June 2022", CategoryID: category[2].Name },
  {id: 2, authorId: 2, title: "Sunny side up egg", content: "Crack an egg on a pan over medium heat", Date: "02 June 2022", CategoryID: category[0].Name },
  {id: 3, authorId:2, title: "Yoghurt Muesli", content: "mix yoghurt and muesli with honey and nuts", Date: "02 July 2022", CategoryID: category[0].Name },
]
const comments = [
  {id: 1, authorId: 1, postId: 1, content: "Forgot to mention that once cake is ready, put to the fridge overnight"},
  {id: 2, authorId: 2, postId: 2, content: "Cool, will try it for breakfast tomorrow"},
]
const reacs = [
  {id:1, LorD: 0, authorId: 1, postId: 1, commentId:1}, 
  {id:2, LorD: 1, authorId: 1, postId: 2, commentId:0},
  {id:3, LorD: 1, authorId: 2, postId: 2, commentId:0},
  {id:4, LorD: 1, authorId: 1, postId: 3, commentId:0},
]
// loggedinUser
const userId = 1;
const loggedinUser = user.find(user => user.id === userId);


// show reactions from logged in user
const userLikedReacs = reacs.filter(reac => reac.authorId === loggedinUser.id && reac.LorD === 1);
const userLikedReacsPostsId = userLikedReacs.map(reac=> reac.postId)

const postsWithIds = userLikedReacsPostsId.map(id => {
  const postContent = post.find(post => post.id === id);
  return postContent;
});

console.log("hello");
console.log("Username:", loggedinUser.Username); //gin
console.log("User reactions:", userLikedReacs) //len=2,  {id:2, LorD: 1, authorId: 1, postId: 2, commentId:0},{id:4, LorD: 1, authorId: 1, postId: 3, commentId:0},
console.log("User reacs post idssss:", userLikedReacsPostsId) // len=2, postid:2, postid:3
console.log("postwithIds", postsWithIds) //len=2, {id: 2, authorId: 2, title: 'Sunny side up egg', content: 'Crack an egg on a pan over medium heat', Date: '02 June 2022', …}, {id: 3, authorId: 2, title: 'Yoghurt Muesli', content: 'mix yoghurt and muesli with honey and nuts', Date: '02 July 2022', …}

for (const postContent of postsWithIds) {
  console.log(`Title: ${postContent.title}\nContent: ${postContent.content}\n`);
}

class MyLikedPost extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
          <div>
            <div className="main">
              <h1 className="headertitle">My Liked Post</h1>
              {postsWithIds.map((post) => 
                  <div className="mylikedpost-flex-container">
                   <div className="mylikedpost-column">
                   <p className="usernamePost" id="usernameField">{post.authorId}</p>
                   <p className="postTitle" id="postTitleField">Title: {post.title}</p>
                   <p className="postContent" id="postContentField"> {post.content}</p>
                
                   <div className="socialiconsArea"> 
                     <img className="socialicons" src={dislikesIcon} /> 1<span> likes </span>
                     <img className="socialicons" src={commentsIcon} /> 1<span> comments </span>
                     <img className="socialicons" src={shareIcon} /><span> Share </span>
                   </div>  
                 </div>      
                  </div>
             )}
                </div>
          </div>
    );
  }
}

export default MyLikedPost;



