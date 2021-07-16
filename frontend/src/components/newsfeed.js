import React,{useState,useEffect} from 'react';
import {Container} from 'react-bootstrap'
//import data from '../context/data.js'

const Newsfeed =()=>{
	const key="98ee3bebb3e541d8b254c78fca786d01"
	const newsapi="https://newsapi.org/v2/top-headlines?country=in&apiKey="+key
	const [news,setNews]=useState([])	
	useEffect(()=>{
		fetchNews()
		},[])
		const fetchNews=async()=>{
				const res=await fetch(newsapi)
				const dataArr=await res.json()
				const data=dataArr.articles
				console.log(data)
				setNews(data.slice(0,3))
			}	
	//	console.log(news[0].title)
		return(<>
		<h3 className="p-3">What's happening around!! </h3>
		<hr/>
		{
			news.map((news,index)=>{
				return(
				<div className="mt-2">
				<Container className="p-1 shadow-sm">
				<p className="news-title"><b>{news.title}</b></p>
				<center><img width="90%" src={news.urlToImage}/></center>
				<p className="news-description">{news.description}<span><a href={news.url}>read more..</a></span></p>
				</Container>
				</div>)
			})
		}
		</>)
	}
export default Newsfeed
