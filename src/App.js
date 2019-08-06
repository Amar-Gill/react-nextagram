import React from 'react';
import { Route } from 'react-router-dom'

import HomePage from './pages/HomePage';
import UserProfilePage from './pages/UserProfilePage';
import MyNavbar from './containers/MyNavbar';
import MyProfilePage from './pages/MyProfilePage'

import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    console.log(localStorage.getItem("JWT"))
    return (
      <div>
        <MyNavbar />
        <Route exact path="/" component={HomePage} />
        <Route path="/users/:id" component={UserProfilePage} />
        <Route exact path='/profile' component={MyProfilePage}/>

      </div>
    )
  }
}

export default App;
