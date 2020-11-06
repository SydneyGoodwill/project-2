const socket = io.connect("/");

$(".chat-button").click((e) => {
  e.preventDefault();

  socket.emit("chat_message", $("#txt").val());
  $("#txt").val("");
  return false;
});

socket.on("new-message", (data) => {
  $(".messages").append($("<p>").html(data));
});

$(".channel-1-button").click(() => {
  socket.emit("join-room-1");
  $(".messages").html("");
});

$(".channel-2-button").click(() => {
  socket.emit("join-room-2");
  $(".messages").html("");
});

$(".channel-3-button").click(() => {
  socket.emit("join-room-3");
  $(".messages").html("");
});

$(".channel-4-button").click(() => {
  socket.emit("join-room-4");
  $(".messages").html("");
});

let timeout;

function timeoutFunction() {
  socket.emit("typing", false);
}

$(".input-messages").keyup(() => {
  socket.emit("typing", "is typing.....");
  clearTimeout(timeout);
  timeout = setTimeout(timeoutFunction, 750);
});

socket.on("typing", (data) => {
  if (data) {
    $(".typing").html(data);
  } else {
    $(".typing").html("");
  }
});
