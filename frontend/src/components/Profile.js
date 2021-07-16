import React,{useState,useEffect,useContext} from 'react'
import Menu from './menu.js'
import Newsfeed from './newsfeed.js'
import {Button,Container,Row,Col} from 'react-bootstrap'
import ProfileContent from './ProfileContent.js'
import {UserContext} from '../context/userContext.js'
import {OtherUserContext} from '../context/OtherUserContext.js'
import SetProfile from './SetProfile.js'

const Profile=()=>{
	const [menuOption,setMenuOption]=useState("Dweets and Replies")
	const [user,setUser]=useContext(UserContext)
	const [otherUser,setOtherUser]=useContext(OtherUserContext)
	const [displayProfile,setDisplayProfile]=useState({})
	useEffect(()=>{
			if(otherUser.name){
					setDisplayProfile(otherUser)
				}else{
					setDisplayProfile(user)
					}		
					console.log(user)
		},[])
	
	const handle=(e)=>{
		setMenuOption(e.target.innerText)
		console.log(menuOption)
	}
	
	
	
		return(<>
		
		<Container className="">
			<div className="profile-image-div">
			<img className="profile-background" src="https://via.placeholder.com/200"/>
			<img className="profile-image" src="https://via.placeholder.com/100"/>
			</div>
			<SetProfile/>
			<div className="profile-name-div">
			<h5>{displayProfile.name}</h5>
			<h6 className="text-muted">{displayProfile.email}</h6>
			{user.profile && <h6 className="text-muted">{user.profile.bio}</h6>}
			<h6 >0<span className="text-muted">Following</span> 0<span className="text-muted">Followers</span></h6>
			</div>
			<div className="profile-menu-div">
			<h6 className="profile-menu-option" name="Dweets" onClick={handle}>Dweets and Replies</h6>
			<h6 className="profile-menu-option" name="Media" onClick={handle}>Media</h6>
			<h6 className="profile-menu-option" name="Likes" onClick={handle}>Saved</h6>
			</div>
		</Container>
		<hr/>
		
			<ProfileContent option={menuOption}/>
		</>)
		
	}

export default Profile;
