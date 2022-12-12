
import React, { Component } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './Pages/Home'
import AccountSettings from './Pages/MyAccountSettings'
import Signin from './Pages/Sigin'
import CreatePost from './Pages/CreatePost';

class App extends Component {
  render () {
    return (
      <Router>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/Account' element={<AccountSettings/>} />
          <Route exact path='/Signin' element={<Signin/>} />
          <Route exact path='/CreatePost' element={<CreatePost/>} />
        </Routes>
      </Router>
    );
  }
}

export default App;
