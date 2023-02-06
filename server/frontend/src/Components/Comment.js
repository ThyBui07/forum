import {Component} from 'react';
import Card from 'react-bootstrap/Card';
import { HandThumbsUp, HandThumbsDown } from 'react-bootstrap-icons'

const image = {
    width: '5%',
    height: '4vw',
    objectFit: 'cover'
}
class Comment extends Component {
render() {
    return (
        <Card className='mb-3'>
            <Card.Body>
                <div className='d-flex mb-3'>
                <Card.Img style={image} src="http://bootdey.com/img/Content/user_1.jpg"  alt="user profile image" className='me-2' />
                <Card.Text className='d-inline-flex'><p className="fw-bold me-2">Ali</p><p className='fw-light'> made a post</p></Card.Text>
                </div>
                <Card.Text>This is great recipe. I will make it today.</Card.Text>
                <div className='d-flex flex-row-reverse'>
                  <p className='me-3'>
                    <HandThumbsUp /> 10 Likes
                  </p>
                  <p className='me-3'>
                    <HandThumbsDown /> 10 Dislikes
                  </p>
                </div>
            </Card.Body>
        </Card>
    )
}
}

export default Comment;