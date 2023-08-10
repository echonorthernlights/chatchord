import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
const Chat = ({ socket }) => {
  const { room, username } = useParams();
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const receiveMessage = async () => {
    await socket.on("receive_message", (data) => {
      const receivedMessageObj = {
        messageId: data.messageId,
        username: data.username,
        message: data.message,
        createdAt: "DATE",
      };
      //console.log("=========> ", sendMessageObj);
      setMessageList([...messageList, receivedMessageObj]);
      console.log("=========> data /", data);
    });
  };

  useEffect(() => {
    receiveMessage();
    socket.on("receive_message", (data) => {
      console.log("from frontend ", data);
    });
  }, [socket]);

  // const leaveRoomHandler = () => {
  //   socket.emit("disconnect");
  // };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const sendMessageObj = {
      messageId: uuidv4(),
      username,
      message,
      createdAt: "date",
      room,
    };
    await socket.emit("send_message", sendMessageObj);
    //console.log("=========/> ", sendMessageObj);
    setMessageList([...messageList, sendMessageObj]);
  };
  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1>
          <i className="fas fa-smile"></i> ChatCord
        </h1>
        <button type="button" className="btn">
          Leave Room
        </button>
      </header>
      <main className="chat-main">
        <div className="chat-sidebar">
          <h3>
            <i className="fas fa-comments"></i> Room Name:
          </h3>
          <h2 id="room-name">{room}</h2>
          <h3>
            <i className="fas fa-users"></i> Users
          </h3>
          <ul id="users">
            <li>{username}</li>
            <li>Brad</li>
          </ul>
        </div>
        <div className="chat-messages">
          {messageList.map((message, index) => (
            <div className="message" key={index}>
              <p className="meta">
                {message.username} <span>{message.createdAt}</span>
              </p>
              <p className="text">{message.message}</p>
            </div>
          ))}
        </div>
      </main>
      <div className="chat-form-container">
        <form id="chat-form" onSubmit={onSubmitHandler}>
          <input
            id="msg"
            type="text"
            placeholder="Enter Message"
            required
            autoComplete="off"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <button type="submit" className="btn">
            <i className="fas fa-paper-plane"></i> Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
