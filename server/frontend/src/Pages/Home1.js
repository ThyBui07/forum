import React, { Component } from "react";
import TopNav1 from '../Components/TopNav1'
import '../Components/css/Home1.css';
import CatList from '../Components/CategoryList'


//import { useState, useEffect } from "react";

class Home1 extends Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    
    return (
      <main>
        <header>
        <div>
          <TopNav1/>
        </div>
      </header>
      <body>
        <CatList/>
      </body>
      </main>
      
     
    );
  }
}

export default Home1;
