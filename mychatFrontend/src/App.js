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

  const joinRoom = async (user, room) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:5001/chat")
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("ReciveMessage", (user, message) => {
        setMessages((messages) => [
          ...messages,
          { user, message },
        ]);
      });

      await connection.start();
      await connection.invoke("JoinRoom", { user, room });
      setConnection(connection);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app">
      <h2>My Chat</h2>
      <hr className="line" />
      {!connection ? (
        <Lobby joinRoom={joinRoom} />
      ) : (
        <Chat messages={messages} />
      )}
    </div>
  );
}

export default App;
