import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'

import '../Components/css/Buttons.scss'
import '../Components/css/Nav.scss'

import logoImg from '../Components/img/logo6.png'
import profileImg from '../Components/img/settings.png'

const BlogHeaderLogo = {
  fontFamily: 'Playfair Display, Georgia, Times New Roman, serif',
  fontSize: '1.25rem',
  textDecoration: 'underline'
}

class TopNav extends Component {
  render () {
    let isLogged = this.props.isLoggedIn
    //console.log('isLogged in topNav: ', isLogged)
    let useInfo = this.props.userInfo
    return (
      <Navbar expand='lg' className='mt-3 mb-4'>
        <Container>
          <Navbar.Brand style={BlogHeaderLogo} href='/'>
            Food Recipes Blog
          </Navbar.Brand>

          <Navbar.Toggle />
          <Navbar.Collapse className='justify-content-end'>
            {isLogged && (
              <Nav>
                <Button
                  variant='outline-dark'
                  className='me-2'
                  onClick={() => Profile(useInfo)}
                >
                  Profile
                </Button>
                <Button variant='outline-danger' onClick={Logout}>
                  Log Out
                </Button>
              </Nav>
            )}
            {!isLogged && (
              <Nav>
                <Button variant='outline-dark' className='me-2' onClick={Login}>
                  Log In
                </Button>
                <Button
                  variant='outline-secondary'
                  className='me-2'
                  onClick={Signup}
                >
                  Sign Up
                </Button>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }
}
export default TopNav

function Logout () {
  fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ Logout: true })
  })
    .then(() => {
      // Delete the cookie
      document.cookie =
        'sessionID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=None; path=/;Secure=false'
    })
    .then(() => {
      window.location.href = '/'
    })
}

function Login () {
  window.location.href = '/login'
}

function Signup () {
  window.location.href = '/signup'
}

function Profile (ui) {
  const modifyUser = {
    email: ui.email,
    username: ui.mobile,
    myLikedPosts: ['later'],
    myLikedPosts: ['later'],
    myCommentedPosts: ['later']
  }
//   email
// : 
// "test@test.com"
// id
// : 
// 1
// logout
// : 
// false
// mobile
// : 
// ""
// password
// : 
// "$2a$10$cFmP4rYCH3kyvxixOHv0iuRJtRx7vSPusOf5vfwlDcCeL244PIgtG"
// username
// : 
// "test"
// window.location.href = '/account'
  window.location.href = `/account?user=${encodeURIComponent(
    JSON.stringify(modifyUser)
  )}`
}
