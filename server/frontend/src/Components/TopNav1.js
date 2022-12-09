import React, { Component } from "react";
import '../Components/css/TopNav1.css';
import CreatepostBtn from "./CreatePostBtn";
import LogoutBtn from "./LogoutBtn";
import logoImg from '../Components/img/logo5.png'
import profileImg from '../Components/img/settings.png'

class TopNav1 extends Component {
 
    render() { 
        return (
            <div id="navbar">
                <a href='/'><div className="navbarLogo" >
                    <img className="LogoImg" src={logoImg} />
                    <h1>Food Forum</h1> 
                </div></a>

                <div id="narbarBtn">
                    <a href='/Account'><img className="ProfileImg" src={profileImg} /></a>
                    <a href='/create-post'><CreatepostBtn /></a>
                    <LogoutBtn />
                </div>
            </div>
          );
    }
}
 
export default TopNav1;