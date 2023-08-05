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

// app.get("/", (req, res) => {
//   res.send("API Running...");
// });

io.on("connection", (socket) => {
  console.log("User connected : ", socket.id);
  socket.on("send_message", (data) => {
    console.log(data.message);
  });
});
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
