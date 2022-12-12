import React, { Component } from "react";
import SettingsNav from '../server/frontend/src/Components/SettingsNav'
import '../Components/css/Buttons.scss'
import TopNav1 from '../server/frontend/src/Components/TopNav1'
import UsernameField from "./UsernameField";
import EmailField from "./EmailField";
import PasswordField from "./PasswordField";
import ChangeUsernameBtn from '../../../../archive/Components/ChangeUsernameBtn'
import ChangeEmailBtn from "./ChangeEmailBtn";
import ChangePasswordBtn from "./ChangePasswordBtn";
import '../Components/css/MyAccount.css';

//import { useState, useEffect } from "react";

class AccountSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      DataisLoaded: false,
    };
  }
  componentDidMount() {
    fetch("http://localhost:8080")
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        this.setState({
          items: json,
          DataisLoaded: true,
        });
      });
  }
  render() {
    const { items } = this.state;
    return (
          <div>
            <TopNav1 />
            <SettingsNav/>
            <div className="main">
            <h1 className="headertitle">Account Settings</h1>
                <div className="flex-container">
                  <div className="column" id="r1c2">
                
                    <div className="username">
                    <p><span>UserName:</span><UsernameField /></p>
                      <div className="usernamebtn">
                        <ChangeUsernameBtn />
                      </div>
                    </div>  
                
                  <div className="email">
                    <p><span>Email:</span><EmailField /></p>
                    <div className="emailbtn">
                      <ChangeEmailBtn />
                    </div>
                  </div>  
              
                  <div className="password">
                    <p><span>Password:</span><PasswordField /></p>
                      <div className="passwordbtn">
                        <ChangePasswordBtn />
                      </div>
                  </div>
                </div>
              </div>
              </div>
      </div> 
    );
  }
}

export default AccountSettings;
