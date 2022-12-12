import React, { Component } from "react";
import TopNav from '../Components/TopNav'
import SettingsNav from '../Components/SettingsNav';
import AccountSettings from '../Components/MyAccountSettings';


//import { useState, useEffect } from "react";

class MyAccountPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
          <div>
            <TopNav />
            <SettingsNav />
            <AccountSettings />
          </div>
      );
    }
}

export default MyAccountPage;
