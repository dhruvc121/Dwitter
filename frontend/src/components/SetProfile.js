import React,{useState,useEffect,useContext} from 'react'
import {Button,Container,FormControl,Modal} from 'react-bootstrap'
import {UserContext} from '../context/userContext.js'
import {OtherUserContext} from '../context/OtherUserContext.js'

const SetProfile=()=>{
	const [show, setShow] = useState(false);
	const [addtofollow,setAddToFollow]=useState(false)
	const [user,setUser]=useContext(UserContext)
	const [otherUser,setOtherUser]=useContext(OtherUserContext)
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [profile,setprofile]=useState({
			image:"",
			header:"",
			bio:"",
		})
	const profileButtonHandle=async (e)=>{
		const otherEmail=otherUser.email
		const userEmail=user.email
		if(e.target.innerText==="Set Profile"){
			handleShow()
			}else if(e.target.innerText==="Follow"){
					setAddToFollow(true)
					window.alert("follow")
					console.log("true",addtofollow)
					const res=await fetch("http://localhost:3001/followhandle",{
							method:"POST",
							headers:{
								"Content-Type":"application/json"
								},
							body:JSON.stringify({addtofollow,otherEmail,userEmail})
						})
					console.log(res)
					e.target.innerText="Unfollow"
				}else{
					setAddToFollow(false)
					window.alert("unfollow")
					console.log("false",addtofollow)
					const res=await fetch("http://localhost:3001/followhandle",{
							method:"POST",
							headers:{
								"Content-Type":"application/json"
								},
							body:JSON.stringify({addtofollow,otherEmail,userEmail})
						})
					const resdata=await res.json()
					console.log(res)
					e.target.innerText="Follow"
					}
			
		}
	const setprofilehandle=(e)=>{
		const email=user.email
		const res=fetch("http://localhost:3001/setprofile",{
					method:"POST",
					headers:{
						"Content-Type":"application/json"
						},
					body:JSON.stringify({profile,email})
			})
		if(res){
			window.alert("updated")
			}else{
				window.alert("update failed")
				}
			setprofile({
				image:"",
				header:"",
				bio:"",
				})
			handleClose()
		}
	
	
		return(<>
		 <Button variant="outline-primary" className="profile-setprofile-btn" onClick={profileButtonHandle}>{otherUser.name?"Follow":"Set Profile"}</Button>

		  <Modal show={show} onHide={handleClose}>
			<Modal.Body>
				<Container>
					<lable className="p-2 text-capitalize d-block">set profile pic</lable><FormControl type="file"/>
					<lable className="p-2 text-capitalize d-block">Set profile header</lable><FormControl type="file"/>
					<lable className="p-2 text-capitalize d-block">Set Bio</lable>
						<textarea type="text" 
						value={profile.bio} 
						className="setprofile-textarea" 
						placeholder="Your Bio" 
						onChange={e=>{setprofile({...profile,bio:e.target.value})}}>
						</textarea>
					 <Button variant="primary" className="reply-btn" onClick={setprofilehandle}>
					  Set Profile
					 </Button>
				</Container>
			</Modal.Body>
		  </Modal>
		</>)
}
export default SetProfile;
