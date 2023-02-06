import { useState, useEffect } from 'react'
import '../Components/css/LoginSignup.scss'
import '../Components/css/Buttons.scss'
import forumImg from '../Components/img/signin.png'
import { useNavigate } from 'react-router-dom'
import Home from './Home'

async function getCookie (name) {
  var value = '; ' + document.cookie
  var parts = value.split('; ' + name + '=')
  if (parts.length === 2) return parts.pop().split(';').shift()
}

async function checkSession () {
  const sessionID = await getCookie('sessionID')
  console.log('sessionID', sessionID)
  if (sessionID !== undefined) {
    const res = await fetch('http://localhost:8080/check-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        mode: 'cors'
      },
      body: JSON.stringify({ sessionID })
    })

    const data = await res.json()
    console.log(data.status)
    if (data.status === 'success') {
      return true
    }
  }
  return false
}

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const styles = {
  back: {
    backgroundColor: 'white',
    width: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0
  },
  divCenter: {
    width: 400,
    height: 400,
    backgroundColor: '#fff',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
    overflow: 'auto', 
    padding: '1em 2em',
    borderBottom: '2px solid #ccc',
    display: 'table'
  },
  divContent: {
    display: 'table-cell',
    verticalAlign: 'middle'
  }

}
function Login () {
  const [username, setName] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  //CHECKING IF ALREADY LOGGED IN --> THEN REDIRECT TO HOME
  useEffect(() => {
    async function checkSessionAndNavigate () {
      if (await checkSession()) {
        setIsLoggedIn(true)
      }
    }
    checkSessionAndNavigate()
  }, [navigate])
  //////////////////////

  let HandleSubmit = async e => {
    e.preventDefault()
    try {
      console.log(1)
      await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain'
        },
        credentials: 'include',
        body: JSON.stringify({
          username: username,
          password: password,
          logout: false
        })
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          if (data.success === true) {
            sessionStorage.setItem('loggedIn', true)
            console.log(document.cookie)
            navigate('/', { replace: true })
            console.log('Login successful')
          } else {
            sessionStorage.setItem('loggedIn', false)
            setMessage('Username or password incorrect')
            console.log('U or P incorrect')
          }
        })
    } catch (err) {
      console.log(err)
    }
  }
  return isLoggedIn ? (
    <Home />
  ) : (
    // <div>
    //   <div className='login-flex-container'>
    //     <div className='login-column' id='right'>
    //       <img alt='forum img' className='forumImg' src={forumImg} />
    //     </div>
    //     <div className='login-column' id='left'>
    //       <div className='heading'>
    //         <h1 className='heading-title' id='heading-title-login'>
    //           Login
    //         </h1>
    //       </div>
    //       <div className='form-area'>
    //         <form onSubmit={HandleSubmit}>
    //           <h3 className='username-title'>Username</h3>
    //           <input
    //             type='text'
    //             value={username}
    //             onChange={e => setName(e.target.value)}
    //           />
    //           <h3 className='password-title'>Password</h3>
    //           <input
    //             id='password1'
    //             type='password'
    //             value={password}
    //             onChange={e => setPassword(e.target.value)}
    //           />
    //           <div className='btn-area'>
    //             <button className='loginpageBtn' type='submit'>
    //               Login
    //             </button>
    //           </div>
    //           <div>
    //             <h5>Not a member?</h5>
    //             <a href='/signup'>
    //               <h5>Sign Up</h5>
    //             </a>
    //           </div>

    //           <div className='message'>{message ? <p>{message}</p> : null}</div>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div style={styles.back}>
      <div style={styles.divCenter} className="border border-light shadow bg-white rounded">
        <div style={styles.divContent}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label className="fs-4">Username</Form.Label>
            <Form.Control type="email" placeholder="Enter username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="fs-4">Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            
            <Button variant="outline-primary" type="submit" className="me-2">
            Login
            </Button>
            <Button variant="outline-danger" type="submit">
            Cancel
            </Button>
          </Form>
        </div>
      </div>
    </div>
    
  )
}

export default Login
