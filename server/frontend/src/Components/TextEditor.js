import React, { Component } from "react";
import '../Components/css/TopNav1.css';
import '../Components/css/CreatePost.css';

class TextEditor extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return (
            <textarea id="myTextarea">Type something</textarea>
          );
    }
}
 
export default TextEditor;