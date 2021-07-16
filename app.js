/*const express=require('express')
const dotenv=require('dotenv')
const app=express()
const cookieparser=require('cookie-parser')
const cors=require('cors')


dotenv.config({path:'./.env'})
app.use(cors( {origin: true, credentials: true}));
app.use(cookieparser())
app.use(express.json())
require('./db/conn.js')

app.use(require('./routes/auth.js'))
//socket

const http = require("http");
const socketIo = require("socket.io");
const PORT=process.env.PORT
const server = http.createServer(app);

const io = socketIo(server); // < Interesting!

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 10000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});


const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};





//socket -end




app.listen(PORT,()=>{
		console.log("server on at port",PORT)
	})

*/
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors=require("cors")
const cookieparser=require('cookie-parser')
const dotenv=require('dotenv')

const PORT = process.env.PORT || 3001;


const app = express();
const AllDweets=require('./models/AllDweetsSchema.js')

dotenv.config({path:'./.env'})
app.use(cors( {origin: true, credentials: true}));
app.use(cookieparser())
app.use(express.json())
require('./db/conn.js')

app.use(require('./routes/auth.js'))


const server = http.createServer(app);

const io = socketIo(server);

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
//  if (interval) {
  //  clearInterval(interval);
  //}
  interval = setInterval(() => getApiAndEmit(socket), 100000);
  const changeStream = AllDweets.watch();
  changeStream.on('change', (changes) => {
            socket.compress(true).emit('mongoStream',changes);
        });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = socket => {
  const response = new Date();
   //Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));




//app.listen(PORT,()=>{
		//console.log("server on at port",PORT)
	//})
