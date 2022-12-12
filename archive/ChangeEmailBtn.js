import React, { Component } from "react";
import '../Components/css/Buttons.scss';

class ChangeEmailBtn extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return (
            <button className="changeEmailbtn" id="changeEmailBtn">Change</button>
          );
    }
}
 
export default ChangeEmailBtn;