const jwt=require("jsonwebtoken");
const User=require('../models/schema.js')
const authenticate=async(req,res,next)=>{
	try{
		const token=req.cookie.DwitterToken
		const verifyToken= jwt.verify(token,process.env.SECRETKEY)
		
		const rootUser=await User.findOne({_id:verifyToken._id,"tokens.token":token})
		if(!rootUser){throw new Error("user not found")}
		req.token=token;
		req.rootUser=rootUser
		
		next();
		}catch(e){
			res.status(401).send("Unauthorized user.")
			console.log(e)
			}
	}

module.exports=authenticate;
