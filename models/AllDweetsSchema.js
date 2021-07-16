const mongoose=require('mongoose')


const AllDweetsSchema=new mongoose.Schema({},{strict:false})

const AllDweets=mongoose.model("AllDweets",AllDweetsSchema)

module.exports=AllDweets
