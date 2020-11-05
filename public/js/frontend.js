const socket = io.connect("/");

console.log(socket);
$(".chat-button").click(() => {
  $(".chat-form").submit((e) => {
    e.preventDefault();

    socket.emit("chat_message", $("#txt").val());
    $("#txt").val("");
    return false;
  });
});

socket.on("new-message", (data) => {
  console.log("new message");
  const chatbubble = $("<p>");
  chatbubble.addClass("chat-bubble");
  $(".messages").append(chatbubble.html(data));

  $(".channel-1-button").click(() => {
    socket.emit("join-room-1");
    chatbubble.html("");
  });

  $(".channel-2-button").click(() => {
    socket.emit("join-room-2");
    chatbubble.html("");
  });

  $(".channel-3-button").click(() => {
    socket.emit("join-room-3");
    chatbubble.html("");
  });

  $(".channel-4-button").click(() => {
    socket.emit("join-room-4");
    chatbubble.html("");
  });
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
