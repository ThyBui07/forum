import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TopNav from '../Components/TopNav'
import Login from './LogIn'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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
    if (data.status === 'success') {
      return true
    }
  }
  return false
}

function CreatePost () {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [categories, setCategory] = useState('')
  const [message, setMessage] = useState('')
  const [cats, setCats] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  //CHECKING NOT LOGGED --> THEN REDIRECT TO HOME
  useEffect(() => {
    async function checkSessionAndNavigate () {
      if (await checkSession()) {
        setIsLoggedIn(true)
      } else {
        //NAVIGATE TO LOGIN PAGE
      }
    }
    checkSessionAndNavigate()
  }, [navigate])
  //////////////////////

  function getCookie (name) {
    var value = document.cookie
    var parts = value.split('=')
    if (parts.length === 2) return parts[1]
  }

  let handleSubmit = async e => {
    e.preventDefault()
    try {
      await fetch('http://localhost:8080/create-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          content: content,
          categories: categories,
          session: getCookie('sessionID')
        })
      })
        .then(console.log(getCookie('sessionID')))
        .then(response => response.text())
        .then(text => {
          if (text === 'true') {
            navigate('/', { replace: true })
            console.log('Post successful')
          } else {
            setMessage('Invalid Post')
            console.log('Error with posting post.')
          }
        })
    } catch (err) {
      console.log(err)
    }
  }

  return isLoggedIn ? (
    <div>
      <Row>
        <Col lg={2} md={1} className='d-none d-lg-block d-md-block'></Col>

        <Col lg={8} md={10} xs={12}>
          <TopNav isLoggedIn={isLoggedIn} />
          <Form className='mt-5'>
            <Form.Group className='mb-3' controlId='postForm.ControlInput'>
              <Form.Label className='fs-3'>Recipe Title</Form.Label>
              <Form.Control
                size='lg'
                type='title'
                placeholder='Write a title'
                onChange={e => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='postForm.ControlTextarea'>
              <Form.Label className='fs-3'>Recipe Content</Form.Label>
              <Form.Control
                size='lg'
                as='textarea'
                rows={5}
                placeholder='Write a recipe...'
                onChange={e => setContent(e.target.value)}
              />
            </Form.Group>
            <div>{message}</div>
            <div className='d-flex flex-row justify-content-end'>
              <Button
                variant='outline-primary'
                type='submit'
                className='me-2'
                onClick={handleSubmit}
              >
                Post
              </Button>
              <Button variant='outline-danger' onClick={Cancel}>
                Cancel
              </Button>
            </div>
          </Form>
        </Col>

        <Col lg={2} md={1} className='d-none d-lg-block d-md-block'></Col>
      </Row>
    </div>
  ) : (
    <Login />
  )
}

export default CreatePost

function Cancel () {
  window.location.href = '/'
}
