import React, { Component } from "react";

class LoginRedirect extends Component {
    constructor(props) {
        super(props);
        this.state = this.state = { data:{usernae:"", password:""} };
    }

    render() {
        return (
            <h1>Success</h1>
        )
    }
}

export default LoginRedirect