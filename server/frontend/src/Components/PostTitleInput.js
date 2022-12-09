import React, { Component } from "react";
import '../Components/css/CreatePost.css';

class PostTitleInput extends Component {
    constructor(props) {
        super(props);
        this.state = {title: ""}
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({title: e.target.value});
    }

    
    render() { 
        return (
            <intput type="text" id="postTitle" className="titleTextArea" value={this.state.title} onChange={this.handleChange} />       
          );
    }

    
}
 
export default PostTitleInput;