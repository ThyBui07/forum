import React, { Component } from "react";
import SettingsNav from '../Components/SettingsNav'
import TopNav1 from '../Components/TopNav1'
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
                      <p className="usernamesub"><span>UserName:</span>NafiRanta</p>
                      <div className="usernamebtn">
                        <button className="changebtn">Change</button>
                      </div>
                    </div>  
                
                  <div className="email">
                    <p className="emailsub"><span>Email:</span>nafi@hello.com</p>
                    <div className="emailbtn">
                      <button className="changebtn">Change</button>
                    </div>
                  </div>  
              
                  <div className="password">
                    <p className="passwordsub"><span>Password:</span>*****</p>
                      <div className="passwordbtn">
                        <button className="changebtn">Change</button>
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
