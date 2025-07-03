const express=require('express')
const {Server}=require('socket.io')
const cors=require('cors')
const http=require('http')
const app=express()

const server=http.createServer(app)
app.use(cors())
const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173",
    }
})

const users=new Set()

io.on('connection',(socket)=>{
    console.log("user is connected successfully")
    socket.on('join',(username)=>{
        users.add(username)
        socket.username=username
        io.emit("userList",Array.from(users))
        io.emit('userJoined',username)
        console.log(users)
    })

    socket.on('sendMessage',(input)=>{
        const msg = {
    username: socket.username, // get username from socket
    msg: input
  };
        io.emit('addMessage',msg)
    })
    socket.on('disconnect',()=>{
        users.delete(socket.username)
        io.emit('userList',Array.from(users))
        console.log("Dissconnected:",socket.id)
    })
})

server.listen(3000,()=>{
    console.log("Server is running")
})

