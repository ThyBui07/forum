import React, { Component } from "react";
import '../Components/css/MyAccount.css';

class EmailField extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return (
            <p className="emailsub" id="emailField">nafi@hello.com</p>
          );
    }
}
 
export default EmailField;