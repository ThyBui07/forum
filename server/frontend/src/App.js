
import React, { Component } from 'react'
import './App.css';
import { Switch, Route } from 'react-router-dom';

import Home from './Pages/Home'
<<<<<<< HEAD
import UserProfile from './Pages/MyAccountSettings'


=======
import AccountSettings from './Pages/MyAccountSettings'
>>>>>>> 4c378dce13b7576688bf367b55c6f553b88e75a2

class App extends Component {
  render () {
    return (
<<<<<<< HEAD
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
=======
     <Home />
>>>>>>> 4c378dce13b7576688bf367b55c6f553b88e75a2
    );
  }
}

export default App;
