import React, { Component } from "react";
import '../Components/css/TopNav1.css';
import '../Components/css/MyPosts.css';

class CommentTextEditor extends Component {

    render() { 
        return (
            <textarea id="myTextarea">Comment!!!!</textarea>
          );
    }
}
 
export default CommentTextEditor;