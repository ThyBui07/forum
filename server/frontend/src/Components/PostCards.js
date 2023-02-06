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
    let isLoggedIn = this.props.isLoggedIn
    const { items } = this.state
    console.log(items)
    function AddLike (postID, isLoggedIn) {
      if (isLoggedIn) {
        try {
          fetch('http://localhost:8080/add-reaction', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              likeOrDislike: 1,
              session: document.cookie,
              postID: postID
            })
          })
            .then(response => response.json())
            .then(json => {
              if (json === true) {
                console.log('Like successful')
              } else {
                console.log('Error with like.')
              }
            })
        } catch (err) {
          console.log(err)
        }
      } else {
        alert('Login to leave a like.')
      }
    }
    
    function AddDislike (postID, isLoggedIn) {
      if (isLoggedIn) {
        try {
          fetch('http://localhost:8080/add-reaction', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              likeOrDislike: -1,
              session: document.cookie,
              postID: postID
            })
          })
            .then(response => response.json())
            .then(json => {
              if (json === true) {
                console.log('Dislike successful')
              } else {
                console.log('Error with dislike.')
              }
            })
        } catch (err) {
          console.log(err)
        }
      } else {
        alert('Login to leave a dislike.')
      }
    }
    
    function Comment () {
      window.location.href = '/single-post'
    }
    return (
      <Row xs={1} md={1} lg={1} className='g-4'>
        {items.map((item) => (
          <Col key={item.id}>
            <Card >
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <small className='text-muted'>Posted by: {item.author}</small>
                <Card.Text>
                  {item.content}
                </Card.Text>
                <div className='d-inline-flex'>
                  <Card.Text
                    className='me-3'
                    
                  >
                    <HandThumbsUp type='button' onClick={()=> AddLike(item.postID, isLoggedIn)}/> 10 Likes
                  </Card.Text>
                  <Card.Text
                    className='me-3'
                  >
                    <HandThumbsDown type='button' onClick={()=> AddDislike(item.postID, isLoggedIn)} /> 10 Dislikes
                  </Card.Text>
                  <Card.Text className='me-3' onClick={Comment}>
                    <Chat /> 10 Comments
                  </Card.Text>
                </div>
              </Card.Body>
              <Card.Footer>
                <small className='text-muted'>
                  {item.categories}
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


