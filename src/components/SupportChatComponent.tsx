import { Client } from "@stomp/stompjs";
import React, { useState } from "react";
import UsernamePlaceholder from "./commonComponents/UsernamePlaceholder";
import SendMessagePlaceholder from "./commonComponents/SendMessagePlaceholder";
import ChatMessagesPlaceholder from "./commonComponents/ChatMessagesPlaceholder";

export default function SupportChatComponent() {
  const [stompClient, setStompClient] = useState();
  const [username, setUsername] = useState();
  const [messagesReceived, setMessagesReceived] = useState([]);

  const setupStompClient = (username) => {
    // stomp client over websockets
    const stompClient = new Client({
      brokerURL: "ws://localhost:8080/ws",
      reconnectDelay: 4000,
      heartbeatIncoming: 3000,
      heartbeatOutgoing: 3000,
    });

    stompClient.onConnect = () => {
      // subscribe to the backend public topic
      stompClient.subscribe("/topic/publicmessages", (data) => {
        console.log(data);
        onMessageReceived(data);
      });

      // subscribe to the backend "private" topic
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
    };
    if (payload.to) {
      stompClient.publish({
        destination: `/user/${payload.to}/queue/inboxmessages`,
        body: JSON.stringify(payload),
      });
    } else {
      stompClient.publish({
        destination: "/topic/publicmessages",
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

  const onUsernameInformed = (username) => {
    setUsername(username);
    setupStompClient(username);
  };

  return (
    <div className="container mt-3 border border-dark">
      <ChatMessagesPlaceholder
        username={username}
        messagesReceived={messagesReceived}
      />
      <br></br>
      <UsernamePlaceholder
        username={username}
        onUsernameInformed={onUsernameInformed}
      />
      <SendMessagePlaceholder username={username} onMessageSend={sendMessage} />
    </div>
  );
}
