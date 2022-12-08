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
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: '',
      category: ''
    };
  }
 
  render() {
    const { items } = this.state;
    return (
          <div>
            <TopNav1 />
            <div className="main">
            <h1 className="headertitle">Create a post</h1>
            <div className="contentArea">
              <div className="titleArea">
              Title: <PostTitleInput />
              </div>
              <div className="categoryArea">
                Category: <PostCategoryInput />
              </div>
              <div className="textarea">
              <TextEditor />
            </div>
            <div className="buttonarea">
              <DiscardBtn />
              <PostBtn />
            </div>
            </div>
           
           
          </div> 
          </div> 
    );
  }
}

export default CreatePost;
