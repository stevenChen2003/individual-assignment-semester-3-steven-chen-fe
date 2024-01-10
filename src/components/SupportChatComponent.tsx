import { Client } from "@stomp/stompjs";
import React, { useState } from "react";
import SendMessagePlaceholder from "./commonComponents/SendMessagePlaceholder";
import ChatMessagesPlaceholder from "./commonComponents/ChatMessagesPlaceholder";
import MovieSelect from "./MovieSelect";
import { Button } from "react-bootstrap";
import TokenManager from "../api/TokenManager";
import { ToastContainer, toast } from "react-toastify";

export default function SupportChatComponent() {
  const [movieId, setMovieId] = useState();
  const [stompClient, setStompClient] = useState();
  const [username, setUsername] = useState();
  const [messagesReceived, setMessagesReceived] = useState([]);
  const claims = TokenManager.getClaims();

  const handleSelect = (selectedMovieId) => {
    setMovieId(selectedMovieId);
    console.log("Movie Id", movieId);
  };

  const setupStompClient = (username) => {
    // stomp client over websockets
    const stompClient = new Client({
      brokerURL: "ws://localhost:8080/ws",
      reconnectDelay: 4000,
      heartbeatIncoming: 3000,
      heartbeatOutgoing: 3000,
    });

    stompClient.onConnect = () => {
      // subscribe to the backend public topic and base on the movie id
      stompClient.subscribe(`/topic/movie/${movieId}`, (data) => {
        console.log(data);
        onMessageReceived(data);
      });
    };

    // initiate client
    stompClient.activate();
    console.log(stompClient);

    // maintain the client for sending and receiving
    setStompClient(stompClient);
  };

  // send the data using Stomp
  const sendMessage = (newMessage) => {
    const payload = {
      from: username,
      text: newMessage.text,
      movieId: movieId,
    };

    stompClient.publish({
      destination: `/topic/movie/${movieId}`,
      body: JSON.stringify(payload),
    });
  };

  // display the received data
  const onMessageReceived = (data) => {
    console.log("Test", data);
    const message = JSON.parse(data.body);
    setMessagesReceived((messagesReceived) => [...messagesReceived, message]);
  };

  const handleJoinChat = () => {
    if (!movieId) {
      toast.dismiss();
      toast.error("Please select a movie before joining the chat.");
      return;
    }
    setUsername(claims.sub);
    setupStompClient(claims.sub);
  };

  const handleLeaveChat = () => {
    stompClient.deactivate();
    setMovieId(null);
    setStompClient(null);
    setUsername(null);
    setMessagesReceived([]);
  };

  return (
    <div
      className="container mt-3 border border-dark"
      style={{ height: "500px" }}
    >
      <ToastContainer />
      {username ? (
        <>
          <h3>Public chat:</h3>
          <hr />
          <ChatMessagesPlaceholder
            username={username}
            messagesReceived={messagesReceived}
          />
          <br></br>
          <SendMessagePlaceholder
            username={username}
            onMessageSend={sendMessage}
          />
          <div className="d-grid mt-3">
            <Button variant="danger" onClick={handleLeaveChat}>
              Leave Chat
            </Button>
          </div>
        </>
      ) : (
        <div className="container">
          <h2>Public Chat</h2>
          <hr />
          <h3>Select Movie:</h3>
          <MovieSelect onSelect={handleSelect} />
          <div className="d-grid mt-3">
            <Button variant="primary" onClick={handleJoinChat}>
              Join Chat
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
