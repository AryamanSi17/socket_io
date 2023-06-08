const express=require('express');
const app=express();
const http=require('http');
const cors=require('cors');
const {Server}=require('socket.io');
app.use(cors());
const CHAT_BOT='ChatBot';
let chatRoom='';
let allUsers=[];

const server=http.createServer(app);
app.get('/', (req, res) => {
    res.send('Hello world');
  });
  const io=new Server(server,{
    cors:{
        origin:'http://localhost:3000',
        methods:['GET','POST']
    }
  })
  io.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`);
    socket.on('join_room',(data)=>{
        const{username,room}=data;
        socket.join(room);
   
    let _createdtime_=DATE.now();
    socket.to(room).emit('receive_message',{
        message:'${username}',
        username:CHAT_BOT,
        _createdtime_,
    });
    socket.emit('receive_message',{
      message:'Welcome ${username}',
      username:CHAT_BOT,
      _createdtime_,
    })
    // We can write our socket event listeners in here...
  //ading new user to room logic
  chatRoom=room;
  allUsers.push({id:socket.id,username,room});
  chatRoomUsers=allUsers.filter((user)=>user.room===room);
  socket.to(room).emit('chatroom_users',chatRoomUsers);
  });
});
server.listen(4000,()=>'Server is running on port 4000');
