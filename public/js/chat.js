var socket = io();
function scrollToDown(){
  var message=jQuery('#messages');
  var lastMessage=message.children('li:last-child');
    var clientHeight=message.prop('clientHeight');
    var scrollTop=message.prop('scrollTop');
    var scrollHeight=message.prop('scrollHeight');
    var lastMessageHeight=lastMessage.innerHeight();
    var secondMessageHeight=lastMessage.prev().innerHeight();
    if(clientHeight+scrollTop+secondMessageHeight+lastMessageHeight>=scrollHeight){
      message.scrollTop(scrollHeight);
    }
}

socket.on('connect', function () {
  var params=jQuery.deparam(window.location.search);
  socket.emit('join',params,function(err){
    if(err){
    alert(err);
    window.location.href='/';
    }else{
     console.log('No error')
    }

  })
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});
socket.on('userUpdateList',function(users){
  console.log('userlist',users)
})
socket.on('newMessage', function (message) {
  var formattedTime=moment(message.createdAt).format('h:mm a')
  var template=jQuery('#message-template').html();
  var html=Mustache.render(template,{
    text:message.text,
      from:message.from,
      create:formattedTime,
  });
    jQuery('#messages').append(html);
    scrollToDown();
 /*
  console.log('newMessage', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from} ${formattedTime}: ${message.text}`);

  jQuery('#messages').append(li);*/
});

socket.on('newLocationMessage', function (message) {
    var formattedTime=moment(message.createdAt).format('h:mm a')
    var template=jQuery('#location-message-template').html();
    var html=Mustache.render(template,{
        url:message.url,
        from:message.from,
        create:formattedTime,
    });
    jQuery('#messages').append(html);
    scrollToDown();
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('')
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.');
  });
});
