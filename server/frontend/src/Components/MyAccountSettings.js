import React, { Component } from "react";
import '../Components/css/Buttons.scss'
import '../Components/css/MyAccount.scss';

const user = {id: 1, Username: "gin", email: "gin.com", password: "abc123"}
//import { useState, useEffect } from "react";

class AccountSettings extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
          <div>
              {/* <div className="main">
                <h1 className="headertitle">Account Settings</h1>
                <div className="settings-flex-container">
                  <div className="settings-column">
                    
                    <div className="username">
                      <p><span>UserName:</span> <p className="usernamesub" id="usernameField">{user.Username}</p></p>
                      <div className="usernamebtn">
                        <ChangeUsernameBtn />
                      </div>
                    </div>
                  
                    <div className="email">
                      <p><span>Email:</span> <p className="emailsub" id="emailField">{user.email}</p></p>
                      <div className="usernamebtn">
                        <ChangeEmailBtn />
                      </div>
                    </div> 

                    <div className="password">
                      <p><span>Email:</span> <p className="passwordsub" id="passwordField">{user.password}</p></p>
                      <div className="usernamebtn">
                        <ChangePasswordBtn />
                      </div>
                    </div>

                  </div>
                </div>
              </div> */}
            </div>
      );
    }
}

export default AccountSettings;

function ChangeUsernameBtn() {
  return <button className="changebtn" id="changeUsernameBtn">Change</button>;
}

function ChangeEmailBtn() {
  return <button className="changebtn" id="changeEmailBtn">Change</button>;
}

function ChangePasswordBtn() {
 return <button className="changebtn" id = "changePasswordBtn">Change</button>;
}
