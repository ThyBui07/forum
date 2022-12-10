import React, { Component } from "react";
import '../Components/css/Home1.css';

import TopNav1 from "../Components/topnav";


//import { useState, useEffect } from "react";

class Home1 extends Component {


  constructor(props) {
    super(props);
    this.state = { data:{categories: [], posts: [], logged: {user:{}, LoggedIn: ''}}, ref:'' };


    this.handleChange = this.handleChange.bind(this)
}

handleChange() {
  this.data.categories.setState({ checked: !this.state.data.categories.checked, });
}


componentDidMount() {
    fetch("http://localhost:8080")
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        this.setState({
          data: result,
        });
      });


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
    
    const { categories } = this.state.data

    return (
      <main>
        <header>
          <TopNav1 />
        </header>
        
          <div className="CategoryList">
            <fieldset>
            <legend>Choose categories:</legend>
              {categories.map((item) => (
                    <div key={item.id}>
                      <input value={item.id} type="checkbox" checked={this.state.data.categories.checked} onChange={this.handleChange} />
                      <span>{item.title}</span>
                    </div>
             ))}
            </fieldset>
          </div> 
        </main>
      
     
    );
  }
}

export default Home1;
