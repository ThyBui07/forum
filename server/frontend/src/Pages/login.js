import React, { Component } from "react";

import TopNav1 from "../Components/topnav";




//import { useState, useEffect } from "react";

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {username: "", password: ""}

    this.handleChange=this.handleChange.bind(this)
  }

handleChange(e) {
    if (e.target.id === "usernameInput") {
      this.setState({username: e.target.value});
    }
    if (e.target.id === "passwordInput") {
      this.setState({password: e.target.value});
    }
  
  }


  onSubmit = (e) => {
    e.preventDefault();

       const result = fetch('http://localhost:8080/loginredirect' , {
          method: "POST",
          headers: {
          'Content-type': 'application/json'
          },
          body: JSON.stringify(this.state)
        })
      const resultInJson = result.json();
        console.log(resultInJson);
      }

 
  render() {
   // const { items } = this.state;
    return (
      <main>
            <TopNav1 />
            <div className="main">
            <h1 className="headertitle">Login</h1>
            <div className="contentArea">
            <form action='/loginredirect' method="POST" id="login">
              <div>
              <label htmlFor="usernameInput">Username:</label>
                  <input type="text" id="usernameInput" onChange={this.handleChange} />
              </div>
              <br></br>
              <div>
              <label htmlFor="passwordInput">Password:</label>
                  <input type="text" id="passwordInput" onChange={this.handleChange} />       

              </div>

              <div className="buttonarea">
                <input type="submit" form_id="2" className="loginBtn" value="LogIn"></input>
                <button action="/register" className="registerBtn">Register</button>
              </div>
            </form>
            </div>
           
           
          </div> 
      </main>
          
    );
  }

}

export default Login;
