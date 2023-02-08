import TopNav from '../Components/TopNav'
import Toggles from '../Components/Toggles'
import PostCards from '../Components/PostCards'
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap'
import { PlusLg } from 'react-bootstrap-icons'
import React, { useState, useEffect } from 'react'

const categories = [
  'Apetizer',
  'Beverage',
  'Breakfast',
  'Comfort food',
  'Lunch',
  'Salad',
  'Smothie',
  'Snack',
  'Soup',
  'Vegan',
  'Savoury',
  'Sweet'
]

const Home = () => {
  const [dataFromChild, setDataFromChild] = useState('')
  const [items, setItems] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeUser, setActiveUser] = useState({})

  const receiveDataFromChild = data => {
    setDataFromChild(data)
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
          }
        })
        .catch(error => {
          // Handle any errors
          console.error(error)
        })
    }
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
        setIsLoggedIn(true)
        setActiveUser(data.user)
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
    getData()
  }, [])

  /*   const [likeCount, setLikeCount] = useState(0)
  const [dislikeCount, setDislikeCount] = useState(0) */

  useEffect(() => {
    fetch('http://localhost:8080')
      .then(res => res.json())
      .then(json => {
        setItems(json)

        /* // Keep track of the total number of likes
        let totalLikes = 0
        json.posts.forEach(post => {
          totalLikes += post.likes
        })

        setLikeCount(totalLikes)

        // Keep track of the total number of likes
        let totalDislikes = 0
        json.posts.forEach(post => {
          totalDislikes += post.likes
        })

        setDislikeCount(totalDislikes) */
      })
    checkSession()
  }, [items])

  return (
    <Container fluid>
      <Row>
        <Col lg={2} md={1} className='d-none d-lg-block d-md-block'></Col>
        <Col lg={8} md={10} xs={12}>
          {dataFromChild}
          <TopNav isLoggedIn={isLoggedIn} />
          <Toggles sendData={receiveDataFromChild} />
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
                <PostCards isLoggedIn={isLoggedIn} items={items.posts} />
              ) : (
                <div>Nothing to see here</div>
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
