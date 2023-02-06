import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

function Signup () {
  const [username, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  let handleSubmit = async e => {
    e.preventDefault()
    try {
      let res = await fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain'
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
          mobile: mobileNumber
        })
      })
        .then(res => res.json())
        .then(json => console.log(json))

      if (res.status === 200) {
        setName('')
        setEmail('')
        setMobileNumber('')
        setPassword('')
        setMessage('User logged in successfully')
      } else {
        setMessage('Some error occured')
      }
    } catch (err) {
      console.log(err)
    }
    HandleSignup()
  }

  let HandleSignup = async e => {
    fetch('http://localhost:8080/signup')
      .then(res => res.json())
      .then(json => {
        console.log(json)
        if (json.success === true) {
          navigate('/', { replace: true })
          console.log('Signup successful')
        } else {
          if (json.wrong.includes('username')) {
            setMessage(`Username must only include alphanumericals and '_'.`)
          }
          if (json.wrong.includes('password')) {
            setMessage('Password must be at least 4 characters long.')
          }
          if (json.wrong.includes('email')) {
            setMessage('Invalid e-mail.')
          }
          console.log('Something went wrong')
        }
      })
  }

    return (
      
      // <div >
      //   <div className="login-flex-container">
      //     <div className="login-column" id="right">
      //       <img alt="forum img" className="forumImg" src={forumImg} />
      //     </div>
      //     <div className="login-column" id="left">
      //       <div className="heading">
      //         <h1 className="heading-title" id="heading-title-signup">Sign Up</h1>
      //       </div>   
      //       <div className="form-area">
      //         <form onSubmit={handleSubmit}>
      //           <h3 className="username-title">Username</h3>
      //           <input
      //             type="text"
      //             value={username}
      //             onChange={(e) => setName(e.target.value)}
      //           />
      //           <h3 className="email-title">Email</h3>
      //           <input
      //             type="text"
      //             value={email}
      //             onChange={(e) => setEmail(e.target.value)}
      //           />
      //           <h3 className="mobilenumber-title">Mobile Number</h3>
      //           <input
      //             type="text"
      //             value={mobileNumber}
      //             onChange={(e) => setMobileNumber(e.target.value)}
      //           />
      //           <h3 className="password-title">Password</h3>
      //           <input
      //             id="password1"
      //             type="password"
      //             value={password}
      //             onChange={(e) => setPassword(e.target.value)}
      //           />
      //           <div className="btn-area">
      //             <button className="loginpageBtn" type="submit" >Sign Up</button>
      //           </div>
      //           <div>
      //            <h5>Already a member?</h5>
      //            <a href="/login"><h5>Log In</h5></a>
      //           </div>
                
      //           <div className="message">{message ? <p>{message}</p> : null}</div>
      //         </form>
      //         </div>
      //     </div>   
      //   </div>
      // </div>


      <div style={styles.back}>
      <div style={styles.divCenter} className="border border-light shadow bg-white rounded">
        <div style={styles.divContent}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fs-4">Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label className="fs-4">Username</Form.Label>
            <Form.Control type="email" placeholder="Enter username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="fs-4">Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            
            <Button variant="outline-primary" type="submit" className="me-2">
            Sign Up
            </Button>
            <Button variant="outline-danger" type="submit">
            Cancel
            </Button>
          </Form>
        </div>
      </div>
    </div>
    );
}

export default Signup
