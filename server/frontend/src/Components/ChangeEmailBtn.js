import React, { Component } from "react";
import '../Components/css/MyAccount.css';

class ChangeEmailBtn extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return (
            <button className="changebtn" id="changeEmailBtn">Change</button>
          );
    }
}
 
export default ChangeEmailBtn;