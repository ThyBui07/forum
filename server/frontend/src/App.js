
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
import Article from './Pages/Article';
//import MyPosts from './Pages/MyPosts';
//import SinglePost from './Pages/SinglePost';

const categories = ['Apetizer', 'Beverage', 'Breakfast', 'Comfort food', 'Lunch', 'Salad', 'Smothie', 'Snack', 'Soup', 'Vegan', 'Savoury', 'Sweet'];


class App extends Component {
  render () {
    return (
      <Router>
        <Routes>
          <Route exact path='/signup' element={<Signup />} /> 
          <Route exact path='/' element={<Home categories={categories}/>} />
          <Route exact path='/account' element={<MyAccountPage/>} />
          <Route exact path='/login' element={<LogIn/>} />
          <Route exact path='/create-post' element={<CreatePost categories={categories}/>} />
          <Route exact path='/article' element={<Article/>} />
          
        </Routes>
      </Router>
    );
  }
}

export default App;