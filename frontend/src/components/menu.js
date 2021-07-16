import React,{useState,useContext} from 'react';
import {NavLink} from 'react-router-dom';
import {PageContext} from '../context/PageContext.js'
import {OtherUserContext} from '../context/OtherUserContext.js'

const Menu =()=>{
		const [page,setPage]=useContext(PageContext)
		const [otherUser,setOtherUser]=useContext(OtherUserContext)
		const handle=(e)=>{
				setPage(e.target.innerText)
				if(e.target.innerText==="Home"){
						setOtherUser({})
					}
			}
		return(<>
		<div className="menu-div">
		<h3 className="text-left p-3">Dwitter</h3>
		<ul className="list-group">
			<li className="menu-list list-group-item bg-light border-0" name="Home" onClick={handle}>
				<NavLink to="/home" style={{color:"black",textDecoration:"none"}}>Home</NavLink></li>
				
			<li className="menu-list list-group-item bg-light border-0" name="Profile" onClick={handle}>Profile</li>
			
			<li className="menu-list list-group-item bg-light border-0" >
				<NavLink to="/" style={{color:"black",textDecoration:"none"}}>Logout</NavLink></li>
		</ul>
		</div>
		</>)
	}
export default Menu
