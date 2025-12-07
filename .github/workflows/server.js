const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("createRoom", (room) => {
    socket.join(room);
    socket.emit("roomCreated", room);
  });

  socket.on("joinRoom", (room) => {
    socket.join(room);
    socket.emit("roomJoined", room);
    socket.to(room).emit("playerJoined");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("Server running on", PORT));
