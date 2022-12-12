import React, { Component } from "react";
import TopNav from '../Components/TopNav'
import UsernameField from '../Components/UsernameField'
import PostTitleField from '../Components/PostTitleField'
import PostContentField from '../Components/PostContentField'
import NoOfLikesField from '../Components/NoOfLikesField'
import NoOfCommentField from '../Components/NoOfCommentField'
import CommentTextEditor from '../Components/CommentTextEditor'
import CommentBtn from '../Components/CommentBtn'
import dislikesIcon from '../Components/img/dislikes.png'
import commentsIcon from '../Components/img/comments.png'
import shareIcon from '../Components/img/share.png'



//import { useState, useEffect } from "react";

class SinglePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      DataisLoaded: false,
    };
  }
  componentDidMount() {
    fetch("http://localhost:8080")
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        this.setState({
          items: json,
          DataisLoaded: true,
        });
      });
  }
  render() {
    const { items } = this.state;
    return (
          <div>
            <TopNav />
            <div className="main">
              <h1 className="headertitle">Post</h1>
                  <div className="mypost">
                    <div className="postcontentArea">
                      <p className="postUsername"><UsernameField /></p>
                      <p className="postTitle" id="postTitleField">Title: <PostTitleField /></p>
                      <p className="postContent" id="postContentField"> <PostContentField /></p>
                   
                      <div className="socialiconsArea">
                        <img className="socialicons" src={dislikesIcon} /> <NoOfLikesField /><span> likes </span>
                        <img className="socialicons" src={commentsIcon} /> <NoOfCommentField /><span> comments </span>
                        <img class="socialicons" src={shareIcon} /><span> Share </span>
                      </div>

                      <div className="commentArea">
                        <div className="commentTextEditorArea">
                          <CommentTextEditor />
                        </div>
                        <div className="commentBtnArea">
                        <CommentBtn />
                        </div>
                      </div>  
                    </div>
                  </div>
                </div>
          </div> 
    );
  }
}

export default SinglePost;
