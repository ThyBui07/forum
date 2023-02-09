import React, { useEffect, useState, useMemo } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

import Home from './Pages/Home'
import MyAccountPage from './Pages/MyAccountPage'
import CreatePost from './Pages/CreatePost'
import MyLikes from './Components/MyLikes'
import LogIn from './Pages/LogIn'
import Signup from './Pages/Signup'
import Article from './Pages/Article'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/' element={<Home />} />
        {/* route /account is protected. If user is not logged in, they will be redirected to /login */}
        {/* <Route exact path='/account' element={<div>{accountPage}</div>} /> */}
        <Route
          exact
          path='/account'
          element={
            sessionStorage.getItem('isLoggedIn') ? (
              <MyAccountPage />
            ) : (
              <Navigate to='/login' />
            )
          }
        />

        {/* <Route exact path='/account' element={<MyAccountPage />} /> */}
        <Route exact path='/login' element={<LogIn />} />
        <Route exact path='/create-post' element={<CreatePost />} />

        {/* route /create-post is protected. If user is not logged in, they will be redirected to /login */}
        {/* <Route exact path="/create-post" element={isLoggedIn ? <CreatePost />: <Navigate to="/login" />} /> */}
        <Route exact path='/articles/:id' element={<Article />} />
      </Routes>
    </Router>
  )
}

export default App
