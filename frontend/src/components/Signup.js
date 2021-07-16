import React,{useState} from 'react';
import {Container,Button,Row,Col} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'

const Signup=()=>{
		const history=useHistory()
		const[user,setUser]=useState({
			name:"",
			email:"",
			password:"",
			cpassword:"",
			})
		let name,value
		const inputHandle=(e)=>{
				name=e.target.name
				value=e.target.value
				setUser({...user,[name]:value})
			}
		const formSubmit=async (e)=>{
				e.preventDefault()
				const res=await fetch("http://localhost:3001/signup",{
					method:"POST",
					headers:{"Content-Type":"application/json"},
					body:JSON.stringify(user)
					})
				const UserData=await res.json()
				console.log(UserData,res)
				if(res.status===200){
				history.push("/")
				}
			}
		return(<>
		<Container className="login-container bg-light min-vh-100">
			<Row className="login-row">
			
			<Col xs={12} lg={6} className="text-center">
			<img fluid src="/assets/images/signup.svg" className="w-100 my-5 " alt="signup-image"/>
			</Col>
			
			<Col xs={12} lg={6} >
			<Container className="h-100 w-100">
				<h2 className="text-center">Signup Form</h2>
					<Container>
						<form method="POST" className="" onSubmit={formSubmit}>
						  <div className="mb-3">
							<label htmlFor="name" className="form-label">Name</label><span id="must">*</span>
							<input type="text" className="form-control" name="name" value={user.name} onChange={inputHandle}/>
						  </div>
						  <div className="mb-3">
							<label htmlFor="email" className="form-label">Email address</label><span id="must">*</span>
							<input type="email" className="form-control" name="email" value={user.email} onChange={inputHandle}/>
						  </div>
						  <div className="mb-3">
							<label htmlFor="password" className="form-label">Password</label><span id="must">*</span>
							<input type="password" className="form-control" name="password" value={user.password} onChange={inputHandle}/>
						  </div>
						  <div className="mb-3">
							<label htmlFor="cpassword" className="form-label">Confirm Password</label><span id="must">*</span>
							<input type="password" className="form-control" name="cpassword" value={user.cpassword} onChange={inputHandle}/>
						  </div>
						  <button type="submit" className="btn btn-success form-btn btn-lg w-100">Submit</button>
						</form>
					
					</Container>
			</Container>
			</Col>
			</Row>
		</Container>
		</>)
	}

export default Signup
