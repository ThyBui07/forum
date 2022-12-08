import React, { Component } from "react";
import '../Components/css/CreatePost.css';

class PostBtn extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return (
            <button className="discardBtn">Discard</button>
          );
    }
}
 
export default PostBtn;