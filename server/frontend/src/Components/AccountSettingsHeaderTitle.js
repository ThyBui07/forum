import React, { Component } from "react";
import '../Components/css/MyAccount.scss';

class AccountSettingsHeaderTitle extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return (
            <button className="commentBtn">Comment</button>
          );
    }
}
 
export default CommentBtn;

function ChangeUsernameBtn() {
    return <h1 className="headertitle">{this.props.data}</h1>
  }