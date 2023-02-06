import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TopNav from '../Components/TopNav'
import Login from './LogIn'
//import '../Components/css/CreatePost.css';

async function getCookie (name) {
  var value = '; ' + document.cookie
  var parts = value.split('; ' + name + '=')
  if (parts.length === 2) return parts.pop().split(';').shift()
}

async function checkSession () {
  const sessionID = await getCookie('sessionID')
  console.log('sessionID', sessionID)
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
    console.log(data.status)
    if (data.status === 'success') {
      return true
    }
  }
  return false
}

function CreatePost () {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [categories, setCategory] = useState([])
  const [message, setMessage] = useState('')
  const [cats, setCats] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  //CHECKING IF ALREADY LOGGED IN --> THEN REDIRECT TO HOME
  useEffect(() => {
    async function checkSessionAndNavigate () {
      if (await checkSession()) {
        setIsLoggedIn(true)
      }
    }
    checkSessionAndNavigate()
  }, [navigate])
  //////////////////////

  fetch('http://localhost:8080/')
    .then(function (u) {
      return u.json()
    })
    .then(function (json) {
      setCats(json)
    })

  let HandlePostCreation = async e => {
    fetch('http://localhost:8080/create-post')
      .then(res => res.json())
      .then(json => {
        console.log(json)
        if (json === true) {
          navigate('/', { replace: true })
          console.log('Post successful')
        } else {
          setMessage('Invalid Post')
          console.log('Error with posting post.')
        }
      })
  }

  let HandleSubmit = async e => {
    e.preventDefault()
    try {
      await fetch('http://localhost:8080/create-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          content: content,
          categories: categories,
          session: document.cookie
        })
      })
        .then(response => response.json())
        .then(json => console.log(json))
    } catch (err) {
      console.log(err)
    }
    HandlePostCreation()
  }

  return isLoggedIn ? (
    <Login />
  ) : (
    <div>
      <TopNav />
      <div className='main'>
        <h1 className='headertitle'>Create a post</h1>
        <div className='contentArea'>
          <div className='titleArea'>
            Title:{' '}
            <input
              value={title}
              className='titleTextArea'
              id='postTitle'
              onChange={e => setTitle(e.target.value)}
            ></input>
          </div>
          <div className='categoryArea'>
            Category:{' '}
            <div>
              {cats.map(item => (
                <div key={item.id}>
                  <input
                    value={categories}
                    type='checkbox'
                    onChange={e => setCategory(e.target.value)}
                  />
                  <span>{item.title}</span>
                </div>
              ))}
            </div>
          </div>
          <div className='textarea'>
            <textarea
              value={content}
              className='myTextarea'
              id='myTextarea'
              placeholder='Type something'
              onChange={e => setContent(e.target.value)}
            ></textarea>
          </div>
          <div className='buttonarea'>
            <DiscardBtn />
            <button className='postBtn' onClick={HandleSubmit}>
              Post
            </button>
          </div>
          <div className='message'>{message ? <p>{message}</p> : null}</div>
        </div>
      </div>
    </div>
  )
}

export default CreatePost

function DiscardBtn () {
  return <button className='discardBtn'>Discard</button>
}
