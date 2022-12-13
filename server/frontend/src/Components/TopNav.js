import React, { Component } from "react";
import '../Components/css/Buttons.scss';
import '../Components/css/Nav.scss';
import logoImg from '../Components/img/logo5.png'
import profileImg from '../Components/img/settings.png'
import {useState} from 'react'
import { useNavigate } from "react-router-dom";



class TopNav extends Component {
    constructor(props) {
        super(props);

        
    }
 
    render() { 
      let isLogged = sessionStorage.getItem("loggedIn")
        console.log(isLogged)
        return (
            <div className="navbar">
                <div className="navbarLogo" >
                    <img className="LogoImg" src={logoImg} />
                    <h1 className="navbarTitle">Food Forum</h1> 
                </div>
                <div className="navbarBtn">
                    {isLogged && (
                        <div>
                            <CreatePostBtn />
                            <LogoutBtn />
                            <img className="ProfileImg" src={profileImg} />
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
export default TopNav;

  function CreatePostBtn() {
    return <button className="CreatepostBtn">Create Post</button>;
  }

  function LogoutBtn() {
    sessionStorage.setItem("loggedIn", false)
    return <a href='/'><button className="LogoutBtn">Logout</button></a>;
  }

  function LoginBtn() {
    return <a href="/login"><button className="LoginBtn">Log in</button></a>;
  }

  function SignupBtn() {
    return <button className="SignupBtn">Sign up</button>;
  }