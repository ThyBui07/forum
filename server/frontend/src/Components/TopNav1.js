import React, { Component } from "react";
import '../Components/css/TopNav1.css';
import logoImg from '../Components/img/logo5.png'
import profileImg from '../Components/img/settings.png'

class TopNav extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return (
            <div id="navbar">
                <div className="navbarLogo" >
                    <img className="LogoImg" src={logoImg} />
                    <h1>Food Forum</h1> 
                </div>

                <div id="narbarBtn">
                    <img className="ProfileImg" src={profileImg} />
                    <button className="CreatepostBtn">Create Post</button>
                    <button className="LogoutBtn">Log Out</button>
                </div>
            </div>
          );
    }
}
 
export default TopNav;