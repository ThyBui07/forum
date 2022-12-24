import React, { Component } from "react";
import TopNav from '../Components/TopNav'
import Categories from '../Components/Categories';
import AllPosts from '../Components/Allposts';

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
        console.log(json)
        this.setState({
          items: json,
          DataisLoaded: true,
        });
      });
  }

  render() {
    return (
      <div>
        <TopNav />
        <Categories />
        <AllPosts />
      </div>
    );
  }
}

export default Home;
