const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");

const { Server } = require("socket.io");

const app = express();
require("dotenv").config();
const connect = require("./config.js");
connect();

const port = process.env.PORT || 3000;
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

const newserver = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
const io = new Server(newserver, {
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);
  socket.on("send message", (data) => {
    socket.broadcast.emit("receive message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
