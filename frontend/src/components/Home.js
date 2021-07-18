import React,{useState,useContext,useEffect} from 'react';
import {Container,Col,Row} from 'react-bootstrap'
import Menu from './menu.js'
import Newsfeed from './newsfeed.js'
import Content from './content.js'
import Profile from './Profile.js'
import {UserContext} from '../context/userContext.js'
import {Route,useHistory} from 'react-router-dom'


const Home=()=>{
	const history=useHistory()
	const [user,setUser]=useContext(UserContext)
	useEffect(()=>{
			if(!user.name){
					history.push("/")
				}
		})
	
		return(<>
		<Container className="bg-light ">
		<Row className="home-row">
		 <Col className="menu  min-vh-100"><Menu/></Col>
		 <Col xs={6} className="content min-vh-100 shadow-sm">
		 <Route exact path="/home">
		 <Content/>
		 </Route>
		 </Col>
		 <Col className="news-feed min-vh-100"><Newsfeed/></Col>
		</Row>
		</Container>
		</>)
	}

export default Home
