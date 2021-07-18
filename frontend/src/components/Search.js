import React,{useState,useEffect,useContext} from 'react';
import {Button,Container,FormControl} from 'react-bootstrap'
import {PageContext} from '../context/PageContext.js'
import {OtherUserContext} from '../context/OtherUserContext.js'

const Search =()=>{
	const [search,setSearch]=useState("")
	const [page,setPage]=useContext(PageContext)
	const [otherUser,setOtherUser]=useContext(OtherUserContext)
	const handleSearch=async()=>{
			const res=await fetch("http://localhost:3001/search",{
							method:"POST",
							headers:{"Content-Type":"application/json"},
							body:JSON.stringify({search})
							})
						const data=await res.json()
						console.log(data)
						if(data.name){
							setSearch("")
							//window.alert("found")
							setOtherUser(data)
							//console.log(otherUser)
							setPage("Profile")	
							}else{
								window.alert("Not Found")
								setSearch("")
								}
		}
		return(<>
		<Container className="searchContainer">
		<FormControl type="text" className="Search " value={search} onChange={(e)=>{setSearch(e.target.value)}} placeholder="Enter Username"/>
		<Button className="search-btn" onClick={handleSearch}>Search</Button>		
		</Container>
		<hr/>
		</>)
	}

export default Search
