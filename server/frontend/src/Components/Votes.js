import { Component } from 'react';
import Card from 'react-bootstrap/Card';
import { HandThumbsUp, HandThumbsDown, Chat } from 'react-bootstrap-icons'

class Votes extends Component {
render() {
    return (
        <div className='d-inline-flex'>
                  <p className='me-3'>
                    <HandThumbsUp /> 10 Likes
                  </p>
                  <p className='me-3'>
                    <HandThumbsDown /> 10 Dislikes
                  </p>
                  <p className='me-3'>
                    <Chat /> 10 Comments
                  </p>
</div>
    )
}
}

export default Votes