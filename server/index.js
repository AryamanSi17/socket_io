const express=require('express');
const app=express();
const http=require('http');
const cors=require('cors');
const {Server}=require('socket.io');
app.use(cors());
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
    })
    // We can write our socket event listeners in here...
  });
server.listen(4000,()=>'Server is running on port 4000');
