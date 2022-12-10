import React, { Component } from "react";
import PostTitleInput from '../Components/PostTitleInput'
import PostCategoryInput from "../Components/PostCategoryInput";
import TextEditor from "../Components/TextEditor";
import DiscardBtn from  "../Components/DiscardBtn"

import '../Components/css/CreatePost.css';




//import { useState, useEffect } from "react";

class CreatePost extends Component {

 
  onSubmit = (e) => {
    e.preventDefault();
    // get form data out of state
    let np_content = document.getElementById("postContent")
    let np_title = document.getElementById("postTitle")
    let np_categoryid = document.getElementById("postCategoryId")
    let post = {title: {np_title}, content: {np_content}, categoryId: {np_categoryid}}

        fetch('http://localhost:8000' , {
          method: "POST",
          headers: {
          'Content-type': 'application/json'
          },
          body: JSON.stringify(post)
        })
      .then((res) => res.json())
      .then((result) => {
        
        console.log(result)
      })
}
 
  render() {
    //const { items } = this.state;
    return (
          <div>
            {/* <TopNav1 /> */}
            <div className="main">
            <h1 className="headertitle">Create a post</h1>
            <div className="contentArea">
              <form action="/post-success" method="POST" id="addpost">
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
              {/* <PostBtn /> */}
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
