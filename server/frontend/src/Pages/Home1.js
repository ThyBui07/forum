import React, { Component } from "react";
import TopNav1 from '../Components/TopNav1'

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
      <div>
      <TopNav1/>
      </div>
     
    );
  }
}

export default Home1;
