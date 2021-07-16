import React,{useState} from 'react';

export const OtherUserContext=React.createContext()

const OtherUserContextProvider=(props)=>{
		const [otherUser,setOtherUser]=useState({})
		return(
			<OtherUserContext.Provider value={[otherUser,setOtherUser]}>
			{props.children}
			</OtherUserContext.Provider>
		)
	}
export default OtherUserContextProvider
