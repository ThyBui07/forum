import React, { Component } from "react";
import '../Components/css/Nav.scss';


class SettingsNav extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return (
          <div className="sidenav">
            <div className="sidelinks">
              <a href={'../Pages/MyAccountSettings'}>Account</a>
              <a href="/static/template/mypost.html">My Posts</a>
              <a href="/static/template/mylikes.html">My Liked Posts</a>
            </div>
          </div>
          );
    }
}
 
export default SettingsNav;