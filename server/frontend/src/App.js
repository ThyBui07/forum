
import React, { Component } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './Pages/Home'
import AccountSettings from './Pages/MyAccountSettings'
import Signin from './Pages/Sigin'
import CreatePost from './Pages/CreatePost';
import MyLikes from './Pages/MyLikes';
//import MyPosts from './Pages/MyPosts';
//import SinglePost from './Pages/SinglePost';



class App extends Component {
  render () {
    return (
      <Router>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/account' element={<AccountSettings/>} />
          <Route exact path='/signin' element={<Signin/>} />
          <Route exact path='/create-post' element={<CreatePost/>} />
          <Route exact path='/my-likes' element={<MyLikes/>} />
{/*           
          <Route exact path='/my-posts' element={<MyPosts/>} />
          
          <Route exact path='/single-post' element={<SinglePost/>} /> */}
          
        </Routes>
      </Router>
    );
  }
}

export default App;
