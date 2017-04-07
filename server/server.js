const express=require('express'),
    path=require('path'),
    app=express(),
    socketIo=require('socket.io');
const port=process.env.PORT||3000;
var server=require('http').createServer(app);
const publicPath=path.join(__dirname,'../public');
app.use(express.static(publicPath));
var io=socketIo(server);
io.on('connection',(socket)=>{
    console.log('Some one has connected');
    socket.emit('newMessage',{
        from:"Sagar",
        data:"this is good",
        createdAt:"123"
    })

    socket.on('createMessage',(data)=>{
        console.log(data)
    })
   socket.on("createEmail",(data)=>{
    console.log(data) ;
   })
    socket.on('disconnect',()=>{
        console.log("Get disconnected")
    })
})

server.listen(port,()=>{
    console.log('Server is running'+port);
});