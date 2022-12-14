
import React, { Component } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './Pages/Home'
import MyAccountPage from './Pages/MyAccountPage'
import Signin from './Pages/Sigin-copy'
import CreatePost from './Pages/CreatePost'
import MyPosts from './Components/MyPosts';
import MyLikes from './Components/MyLikes';
import Login from './Pages/LogIn'
import Signup from './Pages/Signup'
import TopNav from './Components/TopNav'
//import MyPosts from './Pages/MyPosts';
//import SinglePost from './Pages/SinglePost';



class App extends Component {
  render () {
    return (
      <Router>
        <Routes>
<<<<<<< Updated upstream
          <Route exact path='/login' element={<LogIn />} /> 
=======
>>>>>>> Stashed changes
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/account' element={<MyAccountPage/>} />
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