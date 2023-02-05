import React, { Component } from 'react'
import TopNav from '../Components/TopNav'
import Categories from '../Components/Categories'
import AllPosts from '../Components/Allposts'
/* import { useState, useEffect } from "react";
 */

class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
      items: [],
      DataisLoaded: false,
      isLoggedIn: false
    }
  }

  componentDidMount () {
    this.checkSession()
    fetch('http://localhost:8080')
      .then(res => res.json())
      .then(json => {
        this.setState({
          items: json,
          DataisLoaded: true
        })
      })
  }

  async getCookie (name) {
    var value = '; ' + document.cookie
    var parts = value.split('; ' + name + '=')
    if (parts.length === 2) return parts.pop().split(';').shift()
  }

  async checkSession () {
    const sessionID = await this.getCookie('sessionID')
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
      console.log('yooo')

      const data = await res.json()
      console.log('hee', data)
      console.log(data.status)
      if (data.status === 'success') {
        this.setState({ isLoggedIn: true })
      }
    }
    console.log(this.state.isLoggedIn)
  }

  render () {
    const { isLoggedIn } = this.state
    return (
      <div>
        <TopNav isLoggedIn={isLoggedIn} />
        <Categories isLoggedIn={isLoggedIn} />
        <AllPosts isLoggedIn={isLoggedIn} />
      </div>
    )
  }
}

export default Home
