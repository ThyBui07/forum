
import React, { Component } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home1 from './Pages/Home1'
import AccountSettings from './Pages/MyAccountSettings'
import CreatePost from './Pages/CreatePost';

class App extends Component {
  render () {
    return (
      <Router>
        <Routes>
          <Route exact path='/' element={<Home1/>} />
          <Route exact path='/Account' element={<AccountSettings/>} />
          <Route exact path='/CreatePost' element={<CreatePost/>} />
        </Routes>
      </Router>
    );
  }
}

export default App;
