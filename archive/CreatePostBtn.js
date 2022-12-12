import React, { Component } from "react";
import '../Components/css/Buttons.scss';

class CreatepostBtn extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return (
         <button className="CreatepostBtn">Create </button>
          );
    }
}
 
export default CreatepostBtn;