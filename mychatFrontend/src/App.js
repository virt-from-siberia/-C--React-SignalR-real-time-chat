import React from "react";
import "./App.css";
import { Lobby } from "./components/Lobby";
import { Chat } from "./components/Chat";
import {
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [connection, setConnection] = React.useState();
  const [messages, setMessages] = React.useState([]);
  const [users, setUsers] = React.useState([]);

  const joinRoom = async (user, room) => {
    try {
      const connection = new HubConnectionBuilder()
        // .withUrl("https://localhost:44383/chat")
        .withUrl("https://localhost:5001/chat")
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("UsersInRoom", (users) => {
        setUsers(users);
      });

      connection.on("ReceiveMessage", (user, message) => {
        setMessages((messages) => [
          ...messages,
          { user, message },
        ]);
      });

      connection.onclose((e) => {
        setConnection();
        setMessages([]);
        setUsers([]);
      });

      await connection.start();
      await connection.invoke("JoinRoom", { user, room });
      setConnection(connection);
    } catch (error) {
      console.log(error);
    }
  };

  const closeConnection = async () => {
    try {
      await connection.stop();
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async (message) => {
    try {
      await connection.invoke("SendMessage", message);
    } catch (error) {
      console.log(error);
    }
  };

  const chatProps = {
    messages,
    sendMessage,
    closeConnection,
    users,
  };

  return (
    <div className="app">
      <h2>My Chat</h2>
      <hr className="line" />
      {!connection ? (
        <Lobby joinRoom={joinRoom} />
      ) : (
        <Chat {...chatProps} />
      )}
    </div>
  );
}

export default App;
