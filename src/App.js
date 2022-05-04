import React, { Fragment }  from 'react';
import logo from './logo.svg';
import './App.css';
//import {Link, Switch, Redirect} from 'react-router-dom';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import {createBrowserHistory} from 'history';


import {HomePage} from './components/home/HomePage';
import {LoginPage} from './components/login/LoginPage';
import {RegisterPage} from './components/register/RegisterPage';
import {ProfilePage} from './components/profile/ProfilePage';
import {AboutPage} from './components/about/AboutPage';

import {Role} from './models/role';

import UserService from './services/user.service';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser, faUserPlus, faSignInAlt, faHome, faSignOutAlt, faUserShield} from '@fortawesome/free-solid-svg-icons';

class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      history: createBrowserHistory(),
      currentUser: null,
      isAdmin: false,
      currentLocation: window.location.pathname
    };
  }


  render(){
    const {currentUser, isAdmin, history, currentLocation} = this.state;
    return (
      <div className="App">
        <Router>
          <Fragment>
            {/* <Navbar></Navbar> */}

            <div className="container">
              <Routes>
                  {/* <Route exact path="/" element={<HomePage/>}/>
                  <Route exact path="/home" element={<HomePage/>}/> */}
                  <Route exact path="/login" element={<LoginPage/>}/>
                  <Route exact path="/register" element={<RegisterPage/>}/>
                  <Route exact path="/about" element={<AboutPage/>}/>
                </Routes>
            </div>
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>Hello world</p>
            </header>
          </Fragment>
        </Router>
      </div>
    );
  }
}

export default App;

