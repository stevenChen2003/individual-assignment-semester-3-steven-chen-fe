import { useState } from "react";
import { Button } from "react-bootstrap";

const SendMessagePlaceholder = (props) => {
  const [message, setMessage] = useState("");

  if (!props.username) {
    return <></>;
  }

  const onMessageSend = () => {
    if (!message.trim()) {
      return;
    }

    props.onMessageSend({ text: message });
    setMessage("");
  };

  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form id="messagePanel" onSubmit={onSubmit}>
      <input
        className="w-50 mx-2"
        id="message"
        type="text"
        onChange={(event) => setMessage(event.target.value)}
        value={message}
      ></input>
      <Button
        variant="primary"
        onClick={onMessageSend}
        disabled={!message.trim()}
      >
        Send
      </Button>
    </form>
  );
};

export default SendMessagePlaceholder;
