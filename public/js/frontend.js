$('.chat-button').click(function(){
console.log("click")
})

console.log("Hello")

let socket = io.connect('http://localhost:8080');

console.log(socket)

$('form').submit(function (e) {

    e.preventDefault();

    socket.emit('chat_message', $('#txt').val());
    $('#txt').val('')
    return false
});

socket.on('new-message', function (data){
    console.log('new message')
    let chatbubble = $('<p>')
    chatbubble.addClass("chat-bubble")
    $('.messages').prepend(chatbubble.html(data))
});