import React, { Component } from "react";
import '../Components/css/TopNav1.css';
import logoImg from '../Components/img/logo3.png'
import profileImg from '../Components/img/settings.png'

class TopNav1 extends Component {

    constructor(props) {
        super(props);
        this.state = {ref:''}
    }

componentDidMount() {

      var logged = sessionStorage.getItem("logininfo")

      if (logged) {
        console.log("you are logged in")
        document.getElementById("logButton").innerHTML = "LogOut";
        this.setState({ref: '/logout'})
      } else {
        console.log("you are NOT logged in")
        document.getElementById("logButton").innerHTML = "LogIn";
        this.setState({ref: '/login'})
      }
  }


    render() { 
        return (
            <div id="navbar">
            <a href='/'><div className="navbarLogo" >
                <img alt="logo" className="LogoImg" src={logoImg} />
                <h1>Food Forum</h1> 
            </div></a>

            <div id="narbarBtn">
                <a href='/Account'><img alt="acc" className="ProfileImg" src={profileImg} /></a>
                <a href='/create-post'><button className="CreatepostBtn">Create Post</button></a>

                <a href={ this.state.ref }><button id="logButton" className="LogBtn">log</button></a>
            </div>
        </div>
          );
    }
}
 
export default TopNav1;