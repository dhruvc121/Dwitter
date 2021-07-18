import React,{useState,useEffect,useContext} from 'react';
import {Button,Container,FormControl,Row,Col} from 'react-bootstrap'
import ShowDweets from './ShowDweets'
import Search from './Search.js'
import socketIOClient from "socket.io-client";
import {UserContext} from '../context/userContext.js'

const NewDweet =()=>{
	const[newDweet,setNewDweet]=useState("")
	const[dweetArr,setDweetArr]=useState([])
	const ENDPOINT = "http://127.0.0.1:3001";
	const [response, setResponse] = useState("");
	const [user,setUser]=useContext(UserContext)
	
	useEffect(async()=>{
			fetchData()
		},[])
	useEffect(()=>{
		const socket = socketIOClient(ENDPOINT);
			socket.on("mongoStream", received => {
			fetchData()
			});
		},[])
	

	const fetchData=async()=>{
			const res=await fetch("http://localhost:3001/dweets")
			const data=await res.json()
			data.reverse()
			console.log(user.following)
			
			const isFollowing=(username)=>{
					const isPresent=user.following.find(userId=>userId === username)
					if(isPresent!= undefined){
					return true
					}else{
						return false
						}
				}
			
			let filterdata=data.filter(item=>isFollowing(item.username))
			
			console.log(filterdata)
			
			setDweetArr(filterdata)
			
		}
	const dweetSubmit=async()=>{
			let newDweetEntry={
					by:user.name,
					dweet:newDweet,
					username:user.email,
					likes:0,
					likedBy:[],
					isReply:false,
					reply:[],
					
				}
			const res=await fetch("http://localhost:3001/dweet",{
					method:"POST",
					headers:{
						"Content-Type":"application/json"
						},
					body:JSON.stringify(newDweetEntry)
					})
			const resdata=await res.json()
			if(resdata){
				setNewDweet("")
				}else{
					window.alert("failed")
					}
					console.log(dweetArr)
		}
		//console.log(dweetArr)
		return(<>
		<Search/>
		<Container className="">
		<div className="new-dweet shadow-sm">
		<Row>
			<Col lg={2}>
				<img className="profile-pic" src="https://via.placeholder.com/75" alt="user-image"/>
			</Col>
			<Col>
				<Row>
					<textarea type="text" 
					className="dweet-input text-capitalize" 
					placeholder="what's new today!!" 
					value={newDweet}
					onChange={(e)=>{setNewDweet(e.target.value)}}
					></textarea>
				</Row>
				<Row>
					<Button variant="primary" className="dweet-button" onClick={dweetSubmit}>Dweet</Button>
				</Row>
			</Col>
		</Row>
		</div>
		</Container>
		<hr/>
		{dweetArr.map((dweet,index)=>{
			let dweetId
			let dweetLikedBy
			(dweet._id)?dweetId=dweet._id:dweetId="";
			(dweet.likedBy)?dweetLikedBy=dweet.likedBy:dweetLikedBy=[];
			return(
				<ShowDweets 
				key={index}
				id={dweetId}
				by={dweet.by}
				username={dweet.username}
				dweet={dweet.dweet}
				likes={dweet.likes}
				reply={dweet.reply}
				likedBy={dweetLikedBy}
				replyCount={dweet.reply.length}
				/>
			)
			})
		}
		</>)
	}
export default NewDweet
