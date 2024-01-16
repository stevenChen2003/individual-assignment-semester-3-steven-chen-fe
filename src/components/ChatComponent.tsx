import { Client } from "@stomp/stompjs";
import React, { useEffect, useState } from "react";
import SendMessagePlaceholder from "./commonComponents/SendMessagePlaceholder";
import ChatMessagesPlaceholder from "./commonComponents/ChatMessagesPlaceholder";
import MovieSelect from "./MovieSelect";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import TokenManager from "../api/TokenManager";
import { ToastContainer, toast } from "react-toastify";
import ChatApi from "../api/ChatApi";

export default function ChatComponent() {
  const [movieId, setMovieId] = useState();
  const [movie, setMovie] = useState();
  const [stompClient, setStompClient] = useState();
  const [username, setUsername] = useState();
  const [messagesReceived, setMessagesReceived] = useState([]);
  const claims = TokenManager.getClaims();

  useEffect(() => {
    if (movieId) {
      fetchMessages();
    }
  }, [movieId]);

  const fetchMessages = () => {
    ChatApi.getAllChatMessages(movieId)
      .then((messages) => setMessagesReceived(messages))
      .catch((error) => console.error("Error fetching messages", error));
  };

  const handleSelect = (selectedMovie) => {
    setMovie(selectedMovie);
    setMovieId(selectedMovie.value);
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
      date: new Date(),
    };

    ChatApi.sendChatMessage(payload)
      .then(() => {
        // Optionally update the UI or perform additional actions after sending the message
      })
      .catch((error) => console.error("Error sending message", error));
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
      style={{ height: "550px" }}
    >
      <ToastContainer />
      {username ? (
        <>
          <Container>
            <h3>Public chat:</h3>
            <hr />
            <Row>
              <Col className="border-end border-3 border-grey">
                <Card.Title>Title: {movie.label}</Card.Title>
                <hr />
                <Card.Img
                  variant="top"
                  src={movie.image}
                  style={{
                    height: "280px",
                    width: "200px",
                    objectFit: "cover",
                  }}
                />
                <div className="mt-3">
                  <Button variant="danger" onClick={handleLeaveChat}>
                    Leave Chat
                  </Button>
                </div>
              </Col>
              <Col md="9">
                <ChatMessagesPlaceholder
                  username={username}
                  messagesReceived={messagesReceived}
                />
                <hr />
                <div className="container">
                  <SendMessagePlaceholder
                    username={username}
                    onMessageSend={sendMessage}
                  />
                </div>
              </Col>
            </Row>
          </Container>
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
