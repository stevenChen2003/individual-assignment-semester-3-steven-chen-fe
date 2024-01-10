import { Client } from "@stomp/stompjs";
import React, { useState } from "react";
import SendMessagePlaceholder from "./commonComponents/SendMessagePlaceholder";
import ChatMessagesPlaceholder from "./commonComponents/ChatMessagesPlaceholder";
import MovieSelect from "./MovieSelect";
import { Button } from "react-bootstrap";
import TokenManager from "../api/TokenManager";

export default function SupportChatComponent() {
  const [movieId, setMovieId] = useState();
  const [stompClient, setStompClient] = useState();
  const [username, setUsername] = useState();
  const [messagesReceived, setMessagesReceived] = useState([]);
  const claims = TokenManager.getClaims();
  
  const handleSelect = (selectedMovieId) => {
    setMovieId(selectedMovieId);
    console.log("Movie Id", movieId);
  }

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

      // subscribe to the backend "private" topic
      //not needed?
      stompClient.subscribe(`/user/${username}/queue/inboxmessages`, (data) => {
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
      to: newMessage.to,
      text: newMessage.text,
      movieId: movieId,
    };
    if (payload.to) {
      stompClient.publish({
        destination: `/user/${payload.to}/queue/inboxmessages`,
        body: JSON.stringify(payload),
      });
    } else {
      stompClient.publish({
        destination: `/topic/movie/${movieId}`,
        body: JSON.stringify(payload),
      });
    }
  };

  // display the received data
  const onMessageReceived = (data) => {
    console.log("Test", data);
    const message = JSON.parse(data.body);
    setMessagesReceived((messagesReceived) => [...messagesReceived, message]);
  };

  const handleJoinChat = () => {
    setUsername(claims.sub);
    setupStompClient(claims.sub);
  };

  return (
    <div className="container mt-3 border border-dark" style={{height: '500px'}}>
      {username ? (
        <>
          <ChatMessagesPlaceholder
            username={username}
            messagesReceived={messagesReceived}
          />
          <br></br>
          <SendMessagePlaceholder username={username} onMessageSend={sendMessage} />
        </>
      ) : (
        <div className="container">
          <h2>Public Chat</h2>
          <hr/>
          <h3>Select Movie:</h3>
          <MovieSelect onSelect={handleSelect}/>
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
