import React, { Component } from "react";
//import { useState, useEffect } from "react";

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
        <h1> Fetch data from an api in react </h1>{" "}
        {items.map((item) => (
          <ol key={item.id}>
            Title: {item.title}
          </ol>
        ))}
      </div>
    );
  }
}

export default Home;
