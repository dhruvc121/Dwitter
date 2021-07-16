import React,{useState} from 'react';

export const PageContext=React.createContext()

const PageContextProvider=(props)=>{
		const [page,setPage]=useState("Home")
		return(
			<PageContext.Provider value={[page,setPage]}>
			{props.children}
			</PageContext.Provider>
		)
	}
export default PageContextProvider
