import React, { Component } from "react";
import '../Components/css/TopNav.scss';
//import '../Components/css/MyPosts.css';

class CommentTextEditor extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return (
            <textarea id="myTextarea">Comment!!!!</textarea>
          );
    }
}
 
export default CommentTextEditor;