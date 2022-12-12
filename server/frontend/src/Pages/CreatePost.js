import React, { Component } from "react";
import TopNav from '../Components/TopNav'
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
            <TopNav />
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

function PostTitleInput() {
  return  <textarea className="titleTextArea" id="postTitle"></textarea>
}

function PostCategoryInput() {
  return  <textarea className="titleTextArea" id="postTitle"></textarea>
}

function TextEditor() {
  return   <textarea className="myTextarea" id="myTextarea" placeholder="Type something"></textarea>
}

function PostBtn() {
  return <button className="postBtn">Post</button>
}

function DiscardBtn() {
  return <button className="discardBtn">Discard</button>
}