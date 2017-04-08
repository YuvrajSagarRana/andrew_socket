const express=require('express'),
    path=require('path'),
    app=express(),
    socketIo=require('socket.io');
const port=process.env.PORT||3000;
const {generateMessage}=require('./util/message')
var server=require('http').createServer(app);
const publicPath=path.join(__dirname,'../public');
app.use(express.static(publicPath));
var io=socketIo(server);
io.on('connection',(socket)=>{
    console.log('Some one has connected');
    socket.emit('newMessage',generateMessage("Admin",
       " Welcome to chat app"));
    socket.broadcast.emit('newMessage',{
        from:"Admin",
        text:"new user has been joined"
    });
    socket.on('createMessage',function(message){
        socket.broadcast.emit('newMessage',{user:'message.from',
        text:message.text})
    })


    socket.on('disconnect',()=>{
        console.log("Get disconnected")
    })
})

server.listen(port,()=>{
    console.log('Server is running'+port);
});