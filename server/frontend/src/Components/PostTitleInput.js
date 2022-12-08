import React, { Component } from "react";
import '../Components/css/CreatePost.css';

class PostTitleInput extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    
    render() { 
        return (
            <textarea className="titleTextArea" id="postTitle"></textarea>
           
          );
    }
}
 
export default PostTitleInput;