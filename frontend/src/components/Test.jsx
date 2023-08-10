import React, { useState } from "react";
import { useEffect } from "react";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

const socket = io.connect("http://localhost:5000");

const Test = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([{}]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      const messageObj = {
        messageId: uuidv4(),
        username: data.username,
        message: data.message,
        createdAt: Date.now(),
      };
      setMessages([...messages, messageObj]);
    });
  }, [socket]);

  const joinRoomHandler = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const onClickHandler = () => {
    socket.emit("send_message", { message, room, username });
  };

  return (
    <>
      username
      <input
        type="text"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      room
      <input
        type="text"
        name="room"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={joinRoomHandler}>Join Room</button>
      <br />
      message
      <textarea
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={onClickHandler}>send</button>
      <hr />
      <h2>Received Message :</h2>
      {messages &&
        messages.map((message) => (
          <div key={message.messageId}>
            <p>{message.username}</p>
            <p>{message.createdAt}</p>
            <strong>{message.room}</strong>
            <p>{message.message}</p>
          </div>
        ))}
    </>
  );
};

export default Test;
