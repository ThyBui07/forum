import React, { Component } from 'react'
import '../Components/css/Buttons.scss'
import '../Components/css/Nav.scss'
import logoImg from '../Components/img/logo6.png'
import profileImg from '../Components/img/settings.png'

class TopNav extends Component {
  render () {
    let isLogged = this.props.isLoggedIn
    console.log('topnav', isLogged)
    console.log('after', document.cookie)
    return (
      <div className='navbar'>
        <div className='navbarLogo'>
          <img alt='logo' className='LogoImg' src={logoImg} />
          <h1 className='navbarTitle'>Food Forum</h1>
        </div>
        <div className='navbarBtn'>
          {isLogged && (
            <div>
              <CreatePostBtn />
              <LogoutBtn />
              <img alt='prof' className='ProfileImg' src={profileImg} />
            </div>
          )}
          {!isLogged && (
            <div>
              <LoginBtn />
              <SignupBtn />
            </div>
          )}
        </div>
      </div>
    )
  }
}
export default TopNav

function CreatePostBtn () {
  return (
    <a href='/create-post'>
      <button className='CreatepostBtn'>Create Post</button>
    </a>
  )
}

//FIX (deletes cookie)

function LogoutBtn () {
  const handleClick = () => {
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

  return (
    <button className='LogoutBtn' onClick={handleClick}>
      Logout
    </button>
  )
}

function LoginBtn () {
  return (
    <a href='/login'>
      <button className='LoginBtn'>Log in</button>
    </a>
  )
}

function SignupBtn () {
  return (
    <a href='/signup'>
      <button className='SignupBtn'>Sign up</button>
    </a>
  )
}
