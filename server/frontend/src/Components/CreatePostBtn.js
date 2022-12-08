import React, { Component } from "react";
import '../Components/css/TopNav1.css';

class CreatepostBtn extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return (
         <button className="CreatepostBtn">Create Post</button>
          );
    }
}
 
export default CreatepostBtn;