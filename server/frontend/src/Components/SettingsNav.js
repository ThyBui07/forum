import React, { Component } from "react";
import '../Components/css/SettingsNav.css';


class SettingsNav extends Component {
 
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