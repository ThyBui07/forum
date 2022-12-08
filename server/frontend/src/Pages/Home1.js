import React, { Component } from "react";
import TopNav1 from '../Components/TopNav1'
import '../Components/css/Home1.css';


//import { useState, useEffect } from "react";

class Home1 extends Component {
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
      <main>
        <header>
        <div>
          <TopNav1/>
        </div>
      </header>
      <body>
        <div>
          <h1> Fetch datatabcdfdfdfd </h1>{" "}
          {items.map((item) => (
          <div className="CategoryTitles" key={item.id}>Title: {item.title}</div> 
           ))}
        </div>
      </body>
      </main>
      
     
    );
  }
}

export default Home1;
