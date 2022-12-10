
import React, { Component } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home1 from './Pages/Home1'
import AccountSettings from './Pages/MyAccountSettings'
import CreatePost from './Pages/CreatePost';
import PostSuccess from './Pages/post-success';
import LoginRedirect from './Pages/LoginRedirect'
import Login from './Pages/login';

class App extends Component {
  render () {
    return (
      <Router>
        <Routes>
          <Route exact path='/' element={<Home1/>} />
          <Route exact path='/Account' element={<AccountSettings/>} />
          <Route exact path='/create-post' element={<CreatePost/>} />
          <Route exact path='/post-success' element={<PostSuccess/>} />
          <Route exact path='/loginredirect' element={<LoginRedirect/>} />
          <Route exact path='/login' element={<Login/>} />
        </Routes>
      </Router>
    );
  }
}

export default App;
