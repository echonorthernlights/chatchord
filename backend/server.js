import express from "express";
import http from "http";
import dotenv from "dotenv";
import { Server } from "socket.io";
import cors from "cors";
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    method: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected : ", socket.id);

  socket.on("join_room", (data) => {
    // const getClients = async (room) => {
    //   console.log("current room ", room);
    //   var clients = await io.in(room).fetchSockets();
    //   if (clients) console.log("clients : ", clients);
    // };

    socket.join(data);
    //getClients(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    console.log("data", data);
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

// const getClients = async () => {
//   var clients = await io.in(data.room).fetchSockets();
//   if (clients) console.log(clients);
// };
// getClients();

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
