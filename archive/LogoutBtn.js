import React, { Component } from "react";
import '../Components/css/TopNav1.css';

class LogoutBtn extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return (
         <button className="LogoutBtn">Logout</button>
          );
    }
}
 
export default LogoutBtn;