import React, { Component } from "react";
import '../Components/css/MyAccount.scss';

class ChangeEmailBtn extends Component {
    constructor(props) {
        super(props);
        console.log(props)
    }
    state = {  }
    render() { 
        return (
            <button className="changebtn" id="changeEmailBtn">{this.props.data}</button>
          );
    }
}
 
export default ChangeEmailBtn;