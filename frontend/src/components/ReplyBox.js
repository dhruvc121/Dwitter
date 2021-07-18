import React,{useState,useContext} from 'react';
import {Button,Container,FormControl,Modal} from 'react-bootstrap'
import {UserContext} from '../context/userContext.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'

function ReplyBox(props) {
  const [show, setShow] = useState(false);
  const [userReply,setUserReply]=useState("")
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [user,setUser]=useContext(UserContext)
  const submitReply=async()=>{
			const reply={
					by:user.name,
					dweet:userReply,
					username:user.email,
					likes:0,
					isReply:true,
					replyTo:props.id
				}
			const res=await fetch("http://localhost:3001/dweet",{
					method:"POST",
					headers:{
						"Content-Type":"application/json"
						},
					body:JSON.stringify(reply)
					})
			const resdata=await res.json()
			if(resdata){
				setUserReply("")
				}else{
					window.alert("failed")
					}
			
			setShow(false)
	  }
  return (
    <>
      <Button variant="" className="text-primary" onClick={handleShow}>
       <span>{props.replyCount} </span><FontAwesomeIcon icon={faComment} />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
			<Container>
				<FormControl type="text" placeholder="what do you wish to reply" value={userReply} onChange={(e)=>{setUserReply(e.target.value)}}/>
				 <Button variant="primary" className="reply-btn" onClick={submitReply}>
				  Reply
			     </Button>
			</Container>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default ReplyBox
