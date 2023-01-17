
import React, { Component } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './Pages/Home'
import MyAccountPage from './Pages/MyAccountPage'
/* import Signin from './Pages/Sigin-copy' */
import CreatePost from './Pages/CreatePost'
import MyLikes from './Components/MyLikes';
import LogIn from './Pages/LogIn'
import Signup from './Pages/Signup'
//import MyPosts from './Pages/MyPosts';
//import SinglePost from './Pages/SinglePost';



class App extends Component {
  render () {
    return (
      <Router>
        <Routes>
          <Route exact path='/signup' element={<Signup />} /> 

          <Route exact path='/' element={<Home/>} />
          <Route exact path='/account' element={<MyAccountPage/>} />
          <Route exact path='/login' element={<LogIn/>} />
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