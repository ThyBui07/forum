import React, { Component } from "react";
import '../Components/css/Buttons.scss';
import '../Components/css/Nav.scss';
import logoImg from '../Components/img/logo5.png'
import profileImg from '../Components/img/settings.png'



class TopNav extends Component {
 
    render() { 
      let isLogged = sessionStorage.getItem("loggedIn")
        //console.log(isLogged)
        return (
            <div className="navbar">
                <div className="navbarLogo" >
                    <img alt="logo" className="LogoImg" src={logoImg} />
                    <h1 className="navbarTitle">Food Forum</h1> 
                </div>
                <div className="navbarBtn">
                    {isLogged && (
                        <div>
                            <CreatePostBtn />
                            <LogoutBtn />
                            <img alt="prof" className="ProfileImg" src={profileImg} />
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
    return <a href='/create-post'><button className="CreatepostBtn">Create Post</button></a>;
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