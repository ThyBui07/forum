import React, { Component } from "react";
import TopNav1 from '../Components/TopNav1'
import '../Components/css/MyPosts.css';
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
            <TopNav1 />
            <div className="main">
              <h1 className="headertitle">My Posts</h1>
              <div className="flex-container">
                <div className="column" id="r1c2">
                  <div className="mypost">
                    <h6>NafiRanta</h6>
                    <h4>Title: <span>Daim Frozen Cake Recipe</span></h4>
                    <p><span>How do we show the data here?</span></p>
                    <img className="socialicons" src={dislikesIcon} />
                      <span>10</span><span> likes</span>
                    <img className="socialicons" src={commentsIcon} />
                      <span>100</span>
                    <span> comments</span>
                    <img class="socialicons" src={shareIcon} />
                    <span> Share</span>
                  </div>  
                </div>
              </div>
            </div>
          </div> 
    );
  }
}

export default SinglePost;
