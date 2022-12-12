import React, { Component } from "react";
import '../Components/css/TopNav.scss';
import '../Components/css/CreatePost.css';

class TextEditor extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return (
            <textarea className="myTextarea" id="myTextarea" placeholder="Type something"></textarea>
          );
    }
}
 
export default TextEditor;