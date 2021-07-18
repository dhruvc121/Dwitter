const express=require('express')
const router=express.Router()
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')

//require('../db/conn.js')
const DwitterUser=require('../models/schema.js')
const AllDweets=require('../models/AllDweetsSchema.js')
const authenticate=require('../middleware/authenticate.js')

//logout
router.get('/logout',async(req,res)=>{
		console.log("here")
		res.clearCookie("DwitterToken",{path:'/'})
		res.status(200).send("logout")
	})

//auto login
router.get('/autologin',async(req,res)=>{
		try{
		const token=req.cookies.DwitterToken;
		if(token){
		const verifyToken=jwt.verify(token,process.env.SECRETKEY)
		const user=await DwitterUser.findOne({_id:verifyToken._id})
		console.log(verifyToken._id)
		res.send(user)
		}
	}catch(err){
		console.log(err)
		}
	})


//search for other users
router.post("/search",async(req,res)=>{
		const {search}=req.body
		const details=await DwitterUser.findOne({email:search})
		res.send(details)		
	})

//follow handle
router.post("/followhandle",async(req,res)=>{
		const {addtofollow,otherEmail,userEmail}=req.body
		console.log(addtofollow,otherEmail,userEmail)
		if(!addtofollow){
		await DwitterUser.updateOne({email:userEmail},{$addToSet : {following : otherEmail}},(err,res)=>{
			if(err) throw err
			console.log(res)
			})
		await DwitterUser.updateOne({email:otherEmail},{$addToSet:{followers: userEmail}},(err,res)=>{
			if(err) throw err
			console.log(res)
			})
		}else{
			await DwitterUser.updateOne({email:userEmail},{$pull:{following:otherEmail}},(err,res)=>{
				if(err) throw err
				console.log("1 document updated")
				})
			await DwitterUser.updateOne({email:otherEmail},{$pull:{followers:userEmail}},(err,res)=>{
				if(err) throw err
				console.log("1 document updated")
				})
			}
		res.json({message:"done"})
	})

//set profile
router.post("/setprofile",async(req,res)=>{
		const {profile,email}=req.body
		await DwitterUser.updateOne({email},{$set:{profile:profile}},(err,res)=>{
				if(err) throw err
				console.log("1 document updated")
			})
		res.json({message:"profile updated"})
	})

//fetch other user data
router.post("/userprofile",async(req,res)=>{
	try{
		const email=req.body.userId
		//console.log(email)
		const userData=await DwitterUser.findOne({email})
		//console.log(userData)
		res.send(userData)
		}catch(e){
				console.log(e)
			}
		
	})

//save dweet
router.post("/save",async(req,res)=>{
		const {saveDweet,email}=req.body
		await DwitterUser.updateOne({email},{$addToSet:{saved:saveDweet}},(err,res)=>{
			if(err) throw err;
			})
		console.log("1 document updated")
		res.json({message:"dweet saved"})
	})


//update likes
router.post("/like",async(req,res)=>{
		const{likedBy,id}=req.body
		const updatedLength=likedBy.length
		let newvalues = { $set: {likes: updatedLength, likedBy:likedBy } };
		await AllDweets.findByIdAndUpdate(id,newvalues,(err,res)=>{
		if (err) throw err;
			console.log("1 document updated");
		})
		res.json({message:"like success"})
	})

//retrive dweets
router.get('/dweets',async(req,res)=>{
		const allDweets=await AllDweets.find({})
		res.send(allDweets)
	})


//save dweets
router.post('/dweet',async(req,res)=>{
	try{
		const NewDweet=req.body
		if(NewDweet.replyTo){
				let newvalues = { $addToSet: {reply: NewDweet } };
				await AllDweets.findByIdAndUpdate(NewDweet.replyTo,newvalues,(err,res)=>{
				if (err) throw err;
					console.log("1 document updated");
			})
			res.json({message:"updated successfully"})
		}else{
		const Dweet=new AllDweets(NewDweet)
		const result= await Dweet.save()
		//save dweet to user object
		let myquery = { email: NewDweet.username };
		let newvalues = { $addToSet: {dweets: NewDweet } };
		await DwitterUser.updateOne(myquery,newvalues,(err,res)=>{
		if (err) throw err;
			console.log("1 document updated");
		})
		res.send(result)
	}
		}catch(e){
			console.log(e)
			}
	
	})


//login
router.post('/login',async(req,res)=>{
		const {email,password}=req.body
		try{
		const User=await DwitterUser.findOne({email})
		//const userInfo=await User.json()
		if(!User){
				res.status(400)
			}else{  
					const token=await User.generateAuthToken();
						res.cookie("DwitterToken",token,{
							httpOnly:true,
							})		
					const isMatch=await bcrypt.compare(password,User.password)
					if(isMatch){				
						res.status(201).json(User)
						}else{
							res.status(400)
							}
						
				}
		}catch(err){
				console.log(err)
			}
	})


//signup --works 
router.post('/signup',async (req,res)=>{
	try{
		const {name,email,password,cpassword}=req.body
		if(!name||!email||!password||!cpassword){
				res.json("please fill all fields")
			}
		const userExist=await DwitterUser.findOne({email})
		if(userExist){
				res.json("user already exist")
			}
		if(password!==cpassword){
			res.json("passwords do not match")
			}else{
					const user=new DwitterUser({email,name,password})
					const result= await user.save()
					res.status(201)
				}
		}catch(err){
				console.log(err)
			}
	})

router.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});
module.exports=router
