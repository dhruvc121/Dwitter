import React,{useState,useContext,useEffect} from 'react';
import {Container,Button,Row,Col} from 'react-bootstrap'
import {useHistory,NavLink} from 'react-router-dom'
import {UserContext} from '../context/userContext.js'


const Login=()=>{
	const history=useHistory()
	const [email,setEmail]=useState("")
	const [password,setPassword]=useState("")
	const [user,setUser]=useContext(UserContext)
	useEffect(()=>{
			autoLogin()
		},[])		
		const formSubmit=async(e)=>{
				e.preventDefault()
				const res=await fetch("http://localhost:3001/login",{
					method:"POST",
					headers:{
						"Content-Type":"application/json"
						},
					withCredentials: true,
					credentials: 'include',
					body:JSON.stringify({
						email,password
						})
					})
				const UserData=await res.json()
				setUser(UserData)
				console.log(user)
				if(res.status===201){
				history.push("/home")
					}else{
						window.alert("invalid login details")
						console.log("here")
						}
			}
		const autoLogin= async()=>{
				const res=await fetch("http://localhost:3001/autologin",{
					method:"GET",
					headers:{
						Accept:"application/json",
						"Content-Type":"application/json"
						},
					credentials:"include"
					})
				const data=await res.json()
				setUser(data)
				history.push("/home")
			}
			
		
		return(<>
		<Container className="login-container bg-light min-vh-100">
			<Row className="login-row">
			
			<Col xs={12} lg={6} className="text-center">
			<img fluid src="/assets/images/login.svg" className="w-100 my-3" alt="login-image"/>
			</Col>
			
			<Col xs={12} lg={6} >
			<Container className="h-100 w-100">
				<h2 className="text-center">Login Form</h2>
					<Container>
						<form className="" onSubmit={formSubmit}>
						  <div className="mb-3">
							<label htmlFor="email" className="form-label">Email address</label><span id="must">*</span>
							<input type="email" className="form-control" name="email" value={email} onChange={e=>setEmail(e.target.value)}/>
						  </div>
						  <div className="mb-3">
							<label htmlFor="password" className="form-label">Password</label><span id="must">*</span>
							<input type="password" className="form-control" name="password" value={password} onChange={e=>setPassword(e.target.value)}/>
						  </div>
						  <button type="submit" className="btn btn-success form-btn btn-lg w-100" >Submit</button>
						  <hr/>
						  <p className="text-center text-muted">Not Registered? <NavLink to="/signup">Signup</NavLink></p>
						</form>
					
					</Container>
			</Container>
			</Col>
			</Row>
		</Container>

		
		</>)
	}

export default Login 
