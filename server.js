// Requiring necessary npm packages
require("dotenv").config();
const express = require("express");
const passport = require("./passport-config");
const flash = require("express-flash");
const expressSession = require("express-session");
const methodOverride = require("method-override");

// Requiring passport as we've configured it

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;

// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(
  expressSession({
    secret: process.env.APP_SECRET,
    resave: false,
    saveUninitialize: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
app.use(flash());
// We need to use sessions to keep track of our user's login status

const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Requiring our routes

const routes = require("./routes/routes.js");

const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.static(__dirname + "/node_modules"));
app.use(express.static(__dirname + "/views"));

io.on("connection", (socket) => {
  socket.join("room1");
  socket.room = "room1";

  socket.on("join-room-1", () => {
    socket.leave(socket.room);
    socket.join("room1");
    socket.room = "room1";
  });

  socket.on("join-room-2", () => {
    socket.leave(socket.room);
    socket.join("room2");
    socket.room = "room2";
  });

  socket.on("join-room-3", () => {
    socket.leave(socket.room);
    socket.join("room3");
    socket.room = "room3";
  });

  socket.on("join-room-4", () => {
    socket.leave(socket.room);
    socket.join("room4");
    socket.room = "room4";
  });

  socket.on("chat_message", (data) => {
    console.log(socket.room, data);
    io.to(socket.room).emit("new-message", data);
  });

  socket.on("typing", (data) => {
    io.to(socket.room).emit("typing", data);
  });
});

app.use(routes);

// Syncing our database and logging a message to the user upon success

server.listen(PORT, () => {
  console.log(
    "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
    PORT,
    PORT
  );
});
