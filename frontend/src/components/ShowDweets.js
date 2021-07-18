import React,{useState,useEffect,useContext} from 'react';
import {Button,Container,Row,Col} from 'react-bootstrap'
import socketIOClient from "socket.io-client";
import ReplyBox from './ReplyBox.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart,faBookmark } from '@fortawesome/free-solid-svg-icons'
import {UserContext} from '../context/userContext.js'
import {OtherUserContext} from '../context/OtherUserContext.js'
import {PageContext} from '../context/PageContext.js'


const ShowDweets =(props)=>{
		const ENDPOINT = "http://127.0.0.1:3001";
		const [response, setResponse] = useState("");
		const [user,setUser]=useContext(UserContext)
		const [page,setPage]=useContext(PageContext)
		const [otherUser,setOtherUser]=useContext(OtherUserContext)
		const handleLike=async()=>{
				window.alert("here")
				let likedBy=props.likedBy
				let id=props.id
				const checkLike=likedBy.includes(user.email)
				if(!checkLike){
						likedBy=[user.email,...likedBy]
						const res=await fetch("http://localhost:3001/like",{
								method:"POST",
								headers:{
									"Content-Type":"application/json"
									},
								body:JSON.stringify({likedBy,id})
							}) 
						if(res){
							window.alert("success")
							}
					}else{
							window.alert("already liked!!")
						}
					
			}
			const handleSave=async()=>{
				try{
					let saveDweet=props
					let email=user.email
					const res=await fetch("/save",{
						method:"POST",
						headers:{"Content-Type":"application/json"},
						body:JSON.stringify({saveDweet,email})
						})
					if(res){
							window.alert("dweet saved")
						}else{
							window.alert("dweet save error")
							}
				}catch(e){
						console.log(e)
					}
				
				}
				const userProfile=async(e)=>{
						let userId=e.target.innerText
						const res=await fetch("http://localhost:3001/userprofile",{
							method:"POST",
							headers:{"Content-Type":"application/json"},
							body:JSON.stringify({userId})
							})
						const data=await res.json()
						if(data){
							setOtherUser(data)
							console.log(data)
							setPage("Profile")
							
							}
					}
		return(<>
		

						<div>
						<Container>
						<div className="display-dweet">
						<Row className="dweet-row shadow">
							<Col lg={2}>
								<img className="profile-pic" src="https://via.placeholder.com/75"  alt="user-image"/>
							</Col>
							<Col>
								<Row>
									<h6>{props.by}  <span className="username text-muted" onClick={userProfile}>{props.username}</span></h6>
									<p className="text-left mt-1">
										{props.dweet}
									</p>
								</Row>
								<Row>
								<div className="d-flex justify-content-between">
									<Button variant="" className="text-primary" onClick={handleLike}><span>{props.likes} </span><FontAwesomeIcon icon={faHeart}/></Button>
									<ReplyBox id={props.id} replyCount={props.replyCount}/>
									<Button variant="" className="text-primary" onClick={handleSave}><FontAwesomeIcon icon={faBookmark}/></Button>
								</div>
								</Row>
							</Col>
						</Row>
						<div className="reply-div ">
						{props.reply?
							props.reply.map((replyDweet,index)=>{
									return(<div>
										<Row className="dweet-row">
										<Col lg={2}>
											<img className="profile-pic" src="https://via.placeholder.com/75"  alt="user-image"/>
										</Col>
										<Col>
											<Row>
												<h6>{replyDweet.by}  <span className="username text-muted" onClick={userProfile}>{replyDweet.username}</span></h6>
												<p className="text-left mt-1">
													{replyDweet.dweet}
												</p>
											</Row>
											<Row>
											<div className="d-flex justify-content-between">
										{/*
											todo:-1 individual likes/save for each reply
												  2 recursive reply display
											
												<Button variant="" className="btn" onClick={handleLike}><span>{props.likes} </span><FontAwesomeIcon icon={faHeart}/></Button>
												<Button variant="" className="btn"><FontAwesomeIcon icon={faBookmark}/></Button>
										*/}
											</div>
											</Row>
										</Col>
										</Row>
										</div>);
								}):<div></div>}
						</div>
						</div>
						</Container>
						<hr/>
						</div>
	
		</>)
	}
export default ShowDweets
