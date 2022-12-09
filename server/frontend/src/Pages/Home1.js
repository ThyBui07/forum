import React, { Component } from "react";
import TopNav1 from '../Components/TopNav1'
import '../Components/css/Home1.css';
import CatList from '../Components/CategoryList'
import 


//import { useState, useEffect } from "react";

class Home1 extends Component {

  render() {
    
    return (
      <body>
        <header>
        <div>
          <TopNav1/>
        </div>
      </header>
      <main>
        <div>
          <CatList/>
        </div> 
      </main>
      </body>
      
     
    );
  }
}

export default Home1;
