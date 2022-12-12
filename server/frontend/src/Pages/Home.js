import React, { Component } from "react";
import TopNav from '../Components/TopNav'
import Categories from '../Components/Categories';
import AllPosts from '../Components/Allposts';

//import { useState, useEffect } from "react";

class Home extends Component {
  constructor(props) {
    super(props);
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
