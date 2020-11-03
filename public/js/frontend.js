$(".chat-button").click(() => {
  console.log("click");
});

console.log("Hello");

const socket = io.connect("http://localhost:8080");

console.log(socket);

$("form").submit((e) => {
  e.preventDefault();

  socket.emit("chat_message", $("#txt").val());
  $("#txt").val("");
  return false;
});

socket.on("new-message", (data) => {
  console.log("new message");
  const chatbubble = $("<p>");
  chatbubble.addClass("chat-bubble");
  $(".messages").prepend(chatbubble.html(data));
});
