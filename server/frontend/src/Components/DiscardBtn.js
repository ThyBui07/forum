import React, { Component } from "react";
import '../Components/css/CreatePost.css';

class DiscardBtn extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return (
            <button className="postBtn">Post</button>
          );
    }
}
 
export default DiscardBtn;