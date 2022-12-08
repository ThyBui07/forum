import React, { Component } from "react";
import TopNav1 from '../Components/TopNav1'
import PostTitleInput from '../Components/PostTitleInput'
import TextEditor from "../Components/TextEditor";
import DiscardBtn from  "../Components/DiscardBtn"
import PostBtn from "../Components/PostBtn";
import '../Components/css/CreatePost.css';




//import { useState, useEffect } from "react";

class CreatePost extends Component {
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
            <TopNav1 />
            <div className="main">
            <h1 className="headertitle">Create a post</h1>
            <div className="contentArea">
              <div className="titleArea">
              <label className="postTitle">Title:</label> <PostTitleInput />
              </div>
              <div className="textarea">
              <TextEditor />
            </div>
            </div>
           
            <div className="buttonarea">
              <DiscardBtn />
              <PostBtn />
            </div>
          </div> 
          </div> 
    );
  }
}

export default CreatePost;
