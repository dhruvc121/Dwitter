import React,{useEffect,useState} from 'react'
import './App.css';
import {Route,Switch,NavLink} from 'react-router-dom'
import Home from './components/Home.js'
import Login from './components/Login.js'
import Signup from './components/Signup.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import socketIOClient from "socket.io-client";
import Profile from './components/Profile.js'

const App=()=> {

  return (
    <>
    <Route exact path="/"><Login/></Route>
    <Route exact path="/home"><Home/></Route>
    <Route exact path="/signup"><Signup/></Route>
    </>
  );
}

export default App;
