import React, { useState, useEffect } from 'react'

import { Container,Row, Col, Card,Button, Form, Spinner } from 'react-bootstrap'
import { PlusLg } from 'react-bootstrap-icons'

import TopNav from '../Components/TopNav'
import Toggles from '../Components/Toggles'
import PostCards from '../Components/PostCards'


const Home = ({ receivedLoggedIn }) => {
  const [categories, setDataFromToggle] = useState([])
  const [items, setItems] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  //console.log('isLoggedIn home.js: ', isLoggedIn)
  const [activeUser, setActiveUser] = useState({})

  const receiveCategoryFromToggle = data => {
    if (data.condition === true) {
      setDataFromToggle([...categories, data.value])
    } else {
      setDataFromToggle(categories.filter(item => item !== data.value))
    }
  }

  const getCookie = async name => {
    var value = document.cookie
    var parts = value.split('=')
    if (parts.length === 2) return parts[1]
  }

  const checkSession = async () => {
    let sessionID = await getCookie('sessionID')
    if (sessionID === undefined) {
      fetch('http://localhost:8080/login', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data.success === true) {
            setIsLoggedIn(true)
            setActiveUser(data.user)
            sessionStorage.setItem('userInfo', JSON.stringify(data.user))
            sessionStorage.setItem('isLoggedIn', true)
          }
        })
        .catch(error => {
          // Handle any errors
          console.error(error)
        })
    } else if (sessionID !== undefined) {
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
        setIsLoggedIn(true)
        setActiveUser(data.user)
        sessionStorage.setItem('userInfo', JSON.stringify(data.user))
        sessionStorage.setItem('isLoggedIn', true)
      }
    }
  }

  function getData () {
    fetch('http://localhost:8080')
      .then(res => res.json())
      .then(json => {
        setItems(json)
      })
  }

  useEffect(() => {
    checkSession()
    getData()
    if (!isLoggedIn) {
      sessionStorage.setItem('isLoggedIn', false)
      sessionStorage.setItem('userInfo', null)
    }
  }, [])

  useEffect(() => {
    fetch('http://localhost:8080')
      .then(res => res.json())
      .then(json => {
        setItems(json)
      })
  }, [items])
  return (
    <Container fluid>
      <Row>
        <Col lg={2} md={1} className='d-none d-lg-block d-md-block'></Col>
        <Col lg={8} md={10} xs={12}>
          <TopNav isLoggedIn={isLoggedIn} userInfo={activeUser} />
          <Toggles sendData={receiveCategoryFromToggle} />
          {isLoggedIn && (
            <div className='text-end mb-4'>
              <Button variant='outline-primary' onClick={CreatePost}>
                <PlusLg /> Create Post
              </Button>
            </div>
          )}
          <Row>
            <Col lg={3} className='mb-4'>
              <Card bg={'light'} className='mb-4'>
                <Card.Body>
                  <Card.Title>About</Card.Title>
                  <Card.Text>
                    This blog is a place to share food recipes. Made by Ali,
                    Jacob, Gin, Nafi and Ashley.
                  </Card.Text>
                </Card.Body>
              </Card>

              {isLoggedIn && (
                <Card border='dark'>
                  <Card.Body>
                    <Form>
                      <Form.Check
                        type='switch'
                        id='custom-switch'
                        label='My Liked Posts'
                      />
                      <Form.Check
                        type='switch'
                        id='custom-switch'
                        label='My Commented Posts'
                      />
                    </Form>
                  </Card.Body>
                </Card>
              )}
            </Col>
            <Col lg={9} xs={12} md={12}>
              {items ? (
                <PostCards
                  isLoggedIn={isLoggedIn}
                  items={items.posts}
                  userInfo={activeUser}
                  categoriesFromToggle={categories}
                />
              ) : (
                <Spinner animation='border' role='status'>
                  <span className='visually-hidden'>Loading...</span>
                </Spinner>
              )}
            </Col>
          </Row>
        </Col>

        <Col lg={2} md={1} className='d-none d-lg-block d-md-block'></Col>
      </Row>
    </Container>
  )
}

export default Home

function CreatePost () {
  window.location.href = '/create-post'
}
