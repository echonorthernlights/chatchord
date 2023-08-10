import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
const Chat = ({ socket }) => {
  const { room, username } = useParams();
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    const messageHandler = (data) => {
      setMessageList((list) => [...list, data]);
    };
    socket.on("receive_message", messageHandler);
    return () => {
      socket.off("receive_message", messageHandler);
    };
  }, [socket]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const sendMessageObj = {
      messageId: uuidv4(),
      username,
      message,
      createdAt: new Date().toLocaleString(),
      room,
    };
    await socket.emit("send_message", sendMessageObj);
    setMessageList((list) => [...list, sendMessageObj]);
    setMessage("");
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
