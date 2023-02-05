import React, { Component } from 'react'
import dislikesIcon from '../Components/img/dislikes.png'
import commentsIcon from '../Components/img/comments.png'
import shareIcon from '../Components/img/share.png'
import '../Components/css/MyAccount.scss'

//import { useState, useEffect } from "react";
const user = [
  { id: 1, Username: 'gin', email: 'gin.com', password: 'abc123' },
  { id: 2, Username: 'nafi', email: 'nafi.com', password: '321abc' }
]

const post = [
  {
    id: 1,
    authorId: 1,
    title: 'Daim Frozen Cake',
    content:
      'Base: Mix Digestive Biscuits with Butter, Middle: Creme Fraiche, whipped cream and caramel sauce, Top: sprinkle cut daim bars',
    Date: '01 June 2022',
    CategoryID: 'dessert'
  },
  {
    id: 2,
    authorId: 2,
    title: 'Sunny side up egg',
    content: 'Crack an egg on a pan over medium heat',
    Date: '02 June 2022',
    CategoryID: 'appetizer'
  },
  {
    id: 3,
    authorId: 2,
    title: 'Yoghurt Muesli',
    content: 'mix yoghurt and muesli with honey and nuts',
    Date: '02 July 2022',
    CategoryID: 'appetizer'
  },
  {
    id: 4,
    authorId: 1,
    title: 'Pasta Salad',
    content:
      'Cut cucumber, cherry tomatoes. Add mini mozarella, salad and cooked pasta. Mix with pesto sauce. Season with pepper and salt',
    Date: '02 November 2022',
    CategoryID: 'appetizer'
  }
]
/* const comments = [
  {id: 1, authorId: 1, postId: 1, content: "Forgot to mention that once cake is ready, put to the fridge overnight"},
  {id: 2, authorId: 2, postId: 2, content: "Cool, will try it for breakfast tomorrow"},
]
const reacs = [
  {id:1, LorD: 0, authorId: 1, postId: 1, commentId:1}, 
  {id:2, LorD: 1, authorId: 1, postId: 2, commentId:0},
  {id:3, LorD: 1, authorId: 2, postId: 2, commentId:0},
  {id:4, LorD: 1, authorId: 1, postId: 3, commentId:0},
] */
// loggedinUser
const userId = 1
user.find(user => user.id === userId)

// all of user's posts

class AllPosts extends Component {
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
    const { items } = this.state

    return (
      <div>
        <div className='main'>
          {post.map(posts => (
            <div className='allpost-flex-container' key={posts.id}>
              <div className='mylikedpost-column'>
                <p className='usernamePost' id='usernameField'>
                  {posts.authorId}
                </p>
                <p className='postTitle' id='postTitleField'>
                  Title: {posts.title}
                </p>
                <p className='postContent' id='postContentField'>
                  {' '}
                  {posts.content}
                </p>

                <div className='socialiconsArea'>
                  <img className='socialicons' src={dislikesIcon} alt='hi' /> 1
                  <span> likes </span>
                  <img className='socialicons' src={commentsIcon} alt='hi' /> 1
                  <span> comments </span>
                  <img className='socialicons' src={shareIcon} alt='hi' />
                  <span> Share </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {items !== null
          ? items.map(item => (
              <div className='allpost-flex-container' key={item.id}>
                <div className='mylikedpost-column'>
                  <p className='usernamePost' id='usernameField'>
                    {item.authorId}
                  </p>
                  <p className='postTitle' id='postTitleField'>
                    Title: {item.title}
                  </p>
                  <p className='postContent' id='postContentField'>
                    {' '}
                    {item.content}
                  </p>

                  <div className='socialiconsArea'>
                    <img className='socialicons' src={dislikesIcon} alt='hi' />{' '}
                    1<span> likes </span>
                    <img
                      className='socialicons'
                      src={commentsIcon}
                      alt='hi'
                    />{' '}
                    1<span> comments </span>
                    <img className='socialicons' src={shareIcon} alt='hi' />
                    <span> Share </span>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    )
  }
}

export default AllPosts
