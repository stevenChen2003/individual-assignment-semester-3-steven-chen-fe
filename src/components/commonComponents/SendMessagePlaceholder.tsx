import { useState } from "react";

const SendMessagePlaceholder = (props) => {
  const [message, setMessage] = useState('');

  if (!props.username) {
    return <></>;
  }

  const onMessageSend = () => {
    if (!message.trim()) {
      return;
    }

    props.onMessageSend({ text: message });
    setMessage('');
  };

  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form id="messagePanel" onSubmit={onSubmit}>
      <input
        id='message'
        type='text'
        onChange={(event) => setMessage(event.target.value)}
        value={message}
      ></input>
      <button
        onClick={onMessageSend}
        disabled={!message.trim()}
      >
        Send
      </button>
    </form>
  );
};

export default SendMessagePlaceholder;
