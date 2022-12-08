import React, { Component } from "react";
import '../Components/css/TopNav1.css';
import CreatepostBtn from "./CreatePostBtn";
import LogoutBtn from "./LogoutBtn";
import logoImg from '../Components/img/logo5.png'
import profileImg from '../Components/img/settings.png'

class TopNav1 extends Component {
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
                    <CreatepostBtn />
                    <LogoutBtn />
                </div>
            </div>
          );
    }
}
 
export default TopNav1;