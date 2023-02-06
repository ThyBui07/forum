// pagge for one single full post + comment

import React, { Component } from 'react'
import TopNav from '../Components/TopNav'
import Votes from '../Components/Votes'
import Comment from '../Components/Comment'


import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const image = {
  width: '5%',
  height: '4vw',
  objectFit: 'cover'
}

class Article extends Component {
    render() {
        return (
        <Row>
          <Col lg={2} md={1} className="d-none d-lg-block d-md-block"></Col>
          
          <Col lg={8} md={10} xs={12}>
            <TopNav />
            <article >
              <h2 className="mb-1">New feature</h2>
              <p className="">December 14, 2020 by <a href="#">Chris</a></p>

              <p>This is some additional paragraph placeholder content. It has been written to fill the available space and show how a longer snippet of text affects the surrounding content. We'll repeat it often to keep the demonstration flowing, so be on the lookout for this exact same string of text.</p>
              <ul>
              <li>First list item</li>
              <li>Second list item with a longer description</li>
              <li>Third list item to close it out</li>
              </ul>
              <p>This is some additional paragraph placeholder content. It's a slightly shorter version of the other highly repetitive body text used throughout.</p>
              <Votes />
            </article>
            <hr />
            <Card className='mb-3'>
              <Card.Body>
                <div className='d-flex mb-3'>
                <Card.Img style={image} src="http://bootdey.com/img/Content/user_1.jpg"  alt="user profile image" className='me-2' />
                <div class="input-group">
                  <textarea class="form-control" aria-label="With textarea"></textarea>
                </div>
                </div>
                <div className='d-flex flex-row-reverse'>
                  <Button variant="outline-dark">Comment</Button>
                </div>
              </Card.Body>
            </Card>
            <Comment />
            <Comment />
            <Comment />


          </Col>

          <Col lg={2} md={1} className="d-none d-lg-block d-md-block"></Col>
        </Row>
        )
    }
}

export default Article