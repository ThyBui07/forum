import React, { Component } from "react";
import TopNav1 from '../Components/TopNav1'
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
            <div className="textarea">
              <textarea id="myTextarea">Type something</textarea>
            </div>
            <div className="buttonarea">
              <button class="discardBtn">Discard</button>
              <button class="postBtn">Post</button>
            </div>
          </div> 
          </div> 
    );
  }
}

export default CreatePost;
