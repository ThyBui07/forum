import React, { Component } from "react";
import ChangeEmailBtn from '../Components/ChangeEmailBtn'
import TopNav from "../Components/TopNav";

//import { useState, useEffect } from "react";

const user = {id: 1, Username: "gin", email: "gin.com", password: "abc123", isLogged: true}
class Home extends Component {
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
        //console.log(json)
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
     <TopNav />

        <h1> Fetch datatabcdfdfdfd </h1>{" "}
        {items.map((item) => (
          <ol className="categoriesList" key={item.id}>Title: {item.title}</ol> 
        ))}
     

      <ChangeEmailBtn data={user.Username}/>
      <ChangeEmailBtn />
      <ChangeEmailBtn />


      </div>
    );
  }
}

export default Home;
