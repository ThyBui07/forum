import React, { Component } from 'react'
import TopNav from '../Components/TopNav'
import AccountSettings from '../Components/MyAccountSettings'

import { useLocation } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Tab from 'react-bootstrap/Tab'
import PostCard from '../Components/PostCard'

//import { useState, useEffect } from "react";

function MyAccountPage () {
  const location = useLocation()
  const userInfo = JSON.parse(decodeURIComponent(location.search.split('=')[1]))

  return (
    <Row>
      <Col lg={2} md={1} className='d-none d-lg-block d-md-block'></Col>

      <Col lg={8} md={10} xs={12}>
        <TopNav isLoggedIn={true} />
        <Tab.Container id='left-tabs-example' defaultActiveKey='myAccount'>
          <Row>
            <Col sm={3}>
              <Nav variant='pills' className='flex-column'>
                <Nav.Item>
                  <Nav.Link className='bg-light text-dark' eventKey='myAccount'>
                    Account
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className='bg-light text-dark' eventKey='myPosts'>
                    My Posts
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    className='bg-light text-dark'
                    eventKey='myLikedPosts'
                  >
                    My Liked Posts
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    className='bg-light text-dark'
                    eventKey='MyCommentedPosts'
                  >
                    My Commented Posts
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey='myAccount'>
                  <p>myAccount content</p>
                </Tab.Pane>
                <Tab.Pane eventKey='myPosts'>
                  <p>myPosts content</p>
                  {/* items range later here */}
                  <PostCard
                    id='1'
                    title='hello'
                    content='world'
                    author='gin'
                    categories='Sweet, Savoury'
                  />
                </Tab.Pane>
                <Tab.Pane eventKey='myLikedPosts'>
                  <p>myLikedPosts content</p>
                  {/* items range later here */}
                  <PostCard
                    id='1'
                    title='hello'
                    content='world'
                    author='gin'
                    categories='Sweet, Savoury'
                  />
                </Tab.Pane>
                <Tab.Pane eventKey='MyCommentedPosts'>
                  <p>MyCommentedPosts content</p>
                  {/* items range later here */}
                  <PostCard
                    id='1'
                    title='hello'
                    content='world'
                    author='gin'
                    categories='Sweet, Savoury'
                  />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Col>

      <Col lg={2} md={1} className='d-none d-lg-block d-md-block'></Col>
    </Row>
  )
}

export default MyAccountPage
