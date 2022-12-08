
import React, { Component } from 'react'
import './App.css';
import { Switch, Route } from 'react-router-dom';

import Home from './Pages/Home'
import UserProfile from './Pages/MyAccountSettings'



class App extends Component {
  render () {
    return (
    //   <Layout>
    //   <Switch>
    //     <Route path='/' exact>
    //       <HomePage />
    //     </Route>
    //     <Route path='/auth'>
    //       <AuthPage />
    //     </Route>
    //     <Route path='/profile'>
    //       <UserProfile />
    //     </Route>
    //   </Switch>
    // </Layout>

    <Layout>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/profile">
          <UserProfile />
        </Route>
      </Switch>
      </Layout>
    );
  }
}

export default App;
