import React, { Component } from "react";
import TopNav1 from '../Components/TopNav1'
import PostTitleInput from '../Components/PostTitleInput'
import PostCategoryInput from "../Components/PostCategoryInput";
import TextEditor from "../Components/TextEditor";
import DiscardBtn from  "../Components/DiscardBtn"
import PostBtn from "../Components/PostBtn";
import '../Components/css/CreatePost.css';




//import { useState, useEffect } from "react";

class CreatePost extends Component {

  handleSubmit(event) {
    let np_content = document.getElementById("postContent")
    let np_title = document.getElementById("postTitle")
    let np_categoryid = document.getElementById("postCategoryId")
    let post = {title: {np_title}, content: {np_content}, categoryId: {np_categoryid}}
    JSON.stringify(post)
    event.preventDefault();
    
  }
 
  render() {
    const { items } = this.state;
    return (
          <div>
            <TopNav1 />
            <div className="main">
            <h1 className="headertitle">Create a post</h1>
            <div className="contentArea">
              <form action="/post-success" method="POST" id="addpost" onSubmit="preppost()">
              <div className="titleArea">
              Title: <PostTitleInput />
              </div>
              <div className="categoryArea">
                Category: <PostCategoryInput />
              </div>
              <div>
              <TextEditor />
            </div>
            <div className="buttonarea">
            <a href="/post-success"><PostBtn /></a>
              <DiscardBtn />
            </div>
            </form>
            </div>
           
           
          </div> 
          </div> 
    );
  }
}

export default CreatePost;
