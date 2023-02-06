import { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { HandThumbsUp, HandThumbsDown, Chat } from 'react-bootstrap-icons'

class PostCards extends Component {
  constructor (props) {
    super(props)

    this.state = {
      items: [],
      DataisLoaded: false
    }
  }
  componentDidMount () {
    fetch('http://localhost:8080')
      .then(res => res.json())
      .then(json => {
        this.setState({
          items: json.posts,
          DataisLoaded: true
        })
      })
  }
  render () {
    // when :8080 works then use this posts fetch from api
    const { items } = this.state
    console.log(items)

    return (
      <Row xs={1} md={1} lg={1} className='g-4'>
        {Array.from({ length: 4 }).map((_, idx) => (
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <small className='text-muted'>Posted by: Ali</small>
                <Card.Text>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
                <div className='d-inline-flex'>
                  <Card.Text className='me-3'>
                    <HandThumbsUp /> 10 Likes
                  </Card.Text>
                  <Card.Text className='me-3'>
                    <HandThumbsDown /> 10 Dislikes
                  </Card.Text>
                  <Card.Text className='me-3'>
                    <Chat /> 10 Comments
                  </Card.Text>
                </div>
              </Card.Body>
              <Card.Footer>
                <small className='text-muted'>
                  Apetizer, Beverage, Breakfast
                </small>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    )
  }
}

export default PostCards
