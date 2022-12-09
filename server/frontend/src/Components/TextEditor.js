import React, { Component } from "react";
import '../Components/css/TopNav1.css';
import '../Components/css/CreatePost.css';

class TextEditor extends Component {
 
    render() { 
        return (
            <textarea className="postContent" id="myTextarea" placeholder="Type something"></textarea>
          );
    }
}
 
export default TextEditor;