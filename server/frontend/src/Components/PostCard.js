import { Component } from 'react'
import { Card, Col } from 'react-bootstrap'
import { HandThumbsUp, HandThumbsDown, Chat } from 'react-bootstrap-icons'


class PostCard extends Component {
    render() {
        return (
            <Col key={this.props.id}>
            <Card >
              <Card.Body>
                <Card.Title>{this.props.title}</Card.Title>
                <small className='text-muted'>Posted by: {this.props.author}</small>
                <Card.Text>
                  {this.props.content}
                </Card.Text>
                <div className='d-inline-flex'>
                  <Card.Text className='me-3'>
                    <HandThumbsUp /> 10 Likes
                  </Card.Text>
                  <Card.Text className='me-3'>
                    <HandThumbsDown  /> 10 Dislikes
                  </Card.Text>
                  <Card.Text className='me-3'>
                    <Chat /> 10 Comments
                  </Card.Text>
                </div>
              </Card.Body>
              <Card.Footer>
                <small className='text-muted'>
                  {this.props.categories}
                </small>
              </Card.Footer>
            </Card>
          </Col>  
        )
    }
}


export default PostCard