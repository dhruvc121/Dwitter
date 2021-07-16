import React,{useState,useContext,useEffect} from 'react';
import ShowDweets from './ShowDweets.js';
import {UserContext} from '../context/userContext.js'
import {OtherUserContext} from '../context/OtherUserContext.js'
import {Container} from 'react-bootstrap'


const ProfileContent=(props)=>{
		const option=props.option
		const [user,setUser]=useContext(UserContext)
		const [otherUser,setOtherUser]=useContext(OtherUserContext)
		const [dweets,setDweets]=useState([])
		const [savedDweets,setSavedDweets]=useState([])
		useEffect(()=>{
				userDweets()
				showSavedDweets()
				console.log(option)
			},[])
			const userDweets=()=>{
				if(otherUser.email){
						setDweets(otherUser.dweets)
					}else{
						setDweets(user.dweets)
						}
				}
			const showSavedDweets=()=>{
				console.log(user.saved.length)
					setSavedDweets(user.saved)
				}
		return(<>
		
		{
		option==="Dweets and Replies" && (user.dweets.lenght==0?
			<Container className="text-center"><h3>No Dweets Yet</h3>
			</Container>:(
			dweets.map((dweet,index)=>{
			let dweetId
			let dweetLikedBy
			(dweet._id)?dweetId=dweet._id:dweetId="";
			(dweet.likedBy)?dweetLikedBy=dweet.likedBy:dweetLikedBy=[];
			console.log("here")
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
				/>
			)
			}))
			)
		}
			
			
		{option==="Media" &&	(!user.media?<Container className="text-center"><h3>No media Yet</h3>
			</Container>:<Container className="text-center"><h3>Displaying meddia!!</h3></Container>)
		}
		{option==="Saved" &&	(user.saved.length==0?
			<Container className="text-center"><h3>No Saved Yet</h3>
			</Container>:
			savedDweets.map((dweet,index)=>{
			let dweetId
			let dweetLikedBy
			(dweet._id)?dweetId=dweet._id:dweetId="";
			(dweet.likedBy)?dweetLikedBy=dweet.likedBy:dweetLikedBy=[];
			console.log("here")
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
				/>
			)
			})
			)}
		</>)
	}
export default ProfileContent
