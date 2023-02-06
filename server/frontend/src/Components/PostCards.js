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

    function getCookie (name) {
      var value = document.cookie
      var parts = value.split('=')
      if (parts.length === 2) return parts[1]
    }

    function AddLike (postID, isLoggedIn) {
      console.log('heya', postID)
      if (isLoggedIn) {
        try {
          fetch('http://localhost:8080/add-reaction', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              likeOrDislike: 1,
              session: getCookie('sessionID'),
              postID: postID,
              commentID: 0
            })
          })
            .then(response => response.text())
            .then(text => {
              console.log(text)
              if (text === 'true') {
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
              session: getCookie('sessionID'),
              postID: postID,
              commentID: 0
            })
          })
            .then(response => response.text())
            .then(text => {
              if (text === 'true') {
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
    return items ? (
      <Row xs={1} md={1} lg={1} className='g-4'>
        {items.map(item => (
          <Col key={item.id}>
            <Card>
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <small className='text-muted'>Posted by: {item.author}</small>
                <Card.Text>{item.content}</Card.Text>
                <div className='d-inline-flex'>
                  <Card.Text className='me-3'>
                    <HandThumbsUp
                      type='button'
                      onClick={() => AddLike(item.id, isLoggedIn)}
                    />{' '}
                    {getNLikes(item.Likes)} Likes
                  </Card.Text>
                  <Card.Text className='me-3'>
                    <HandThumbsDown
                      type='button'
                      onClick={() => AddDislike(item.id, isLoggedIn)}
                    />{' '}
                    {getNDislikes(item.Dislikes)} Dislikes
                  </Card.Text>
                  <Card.Text className='me-3' onClick={Comment}>
                    <Chat /> 10 Comments
                  </Card.Text>
                </div>
              </Card.Body>
              <Card.Footer>
                <small className='text-muted'>{item.categories}</small>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    ) : (
      <div>Nothing to see here</div>
    )
  }
}

export default PostCards

function getNDislikes (i) {
  if (i === null) {
    return 0
  } else {
    return i.length
  }
}

function getNLikes (i) {
  if (i === null) {
    return 0
  } else {
    return i.length
  }
}