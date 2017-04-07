
var socket= io();
socket.on('connect',function (){
    console.log("connected to user");

});
socket.on('disconnect',function (){
    console.log('Disconnected');
});
socket.on('newMessage',function(email){
    console.log(email)
})