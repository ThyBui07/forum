import React, { Component } from "react";
//import '../Components/css/MyPosts.css';

class CommentBtn extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return (
            <button className="commentBtn">Comment</button>
          );
    }
}
 
export default CommentBtn;