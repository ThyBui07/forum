import React, { Component } from "react";
import '../Components/css/Buttons.scss';
import '../Components/css/TopNav1.scss';
import logoImg from '../Components/img/logo5.png'
import profileImg from '../Components/img/settings.png'
import {useState} from 'react'
const isLogged = true

class TopNav1 extends Component {
    constructor(props) {
        super(props);
    }
 
    render() { 
        return (
            <div className="navbar">
                <div className="navbarLogo" >
                    <img className="LogoImg" src={logoImg} />
                    <h1 className="navbarTitle">Food Forum</h1> 
                </div>
                <div className="navbarBtn">
                    {isLogged && (
                        <div>
                            <img className="ProfileImg" src={profileImg} />
                            <CreatePostBtn />
                            <LogoutBtn />
                        </div>
                    )}
                    {!isLogged && (
                        <div >
                            <LoginBtn />
                            <SignupBtn />
                        </div>
                    )}
                </div>
            </div>
          );
    }
}
export default TopNav1;

  function CreatePostBtn() {
    return <button className="CreatepostBtn">Create Post</button>;
  }

  function LogoutBtn() {
    return <button className="LogoutBtn">Logout</button>;
  }

  function LoginBtn() {
    return <button className="LoginBtn">Log in</button>;
  }

  function SignupBtn() {
    return <button className="SignupBtn">Sign up</button>;
  }