import React,{useState,useContext} from 'react';
import NewDweet from './NewDweet.js'
import Profile from './Profile.js'
import {PageContext} from '../context/PageContext.js'

const Content =()=>{
		const [page,setPage]=useContext(PageContext)
		return(<>
		{
		page==="Home" && <NewDweet/>
		}
		{
		page==="Profile" && <Profile/>
		}
		
		</>)
	}
export default Content
