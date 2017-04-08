
var socket= io();
socket.on('connect',function (){
    console.log("connected to user");

});

socket.on('disconnect',function (){
    console.log('Disconnected');
});
socket.on('newMessage',function(message){
    var li=jQuery('<li></li>');
    li.text(`from user:${message.text}`);
    jQuery('#messages').append(li);
    console.log(message)
})

jQuery('#message-form').on('submit',function(e){
    e.preventDefault();
    socket.emit('createMessage',{
        from:"User",
        text:jQuery('[name=message]').val(),function(){

        }
    });
})