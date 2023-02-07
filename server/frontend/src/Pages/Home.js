import React, { Component } from 'react'
import TopNav from '../Components/TopNav'
import Toggles from '../Components/Toggles'
import PostCards from '../Components/PostCards'

import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { PlusLg } from 'react-bootstrap-icons'

class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
      items: [],
      DataisLoaded: false,
      isLoggedIn: false
    }
  }

  componentDidMount () {
    this.checkSession()
    fetch('http://localhost:8080')
      .then(res => res.json())
      .then(json => {
        this.setState({
          items: json,
          DataisLoaded: true
        })
      })
  }

  async getCookie (name) {
    var value = document.cookie
    var parts = value.split('=')
    if (parts.length === 2) return parts[1]
  }

  async checkSession () {
    let sessionID = await this.getCookie('sessionID')
    console.log('sessionID', sessionID)
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
            this.setState({ isLoggedIn: true })
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
        this.setState({ isLoggedIn: true })
      }
    }
  }

  render () {
    const { isLoggedIn } = this.state
    return (
      <Container fluid>
        <Row>
          <Col lg={2} md={1} className='d-none d-lg-block d-md-block'></Col>
          <Col lg={8} md={10} xs={12}>
            <TopNav isLoggedIn={isLoggedIn} />
            <Toggles />
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
                <PostCards isLoggedIn={isLoggedIn} />
              </Col>
            </Row>
          </Col>

          <Col lg={2} md={1} className='d-none d-lg-block d-md-block'></Col>
        </Row>
      </Container>
    )
  }
}

export default Home

function CreatePost () {
  window.location.href = '/create-post'
}
