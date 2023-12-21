const MessageReceived = (props) => {
    return (
        <div>
            <b>{props.from}</b>: {props.text} {props.direct ? <b>(direct)</b> : ''}
        </div>
    );
};

const ChatMessagesPlaceholder = (props) => {
    return (
        <>
            <h3>Public chat:</h3>
            <hr/>
            {props.messagesReceived
                .map(message => <MessageReceived key={message.id} from={message.from} direct={message.to === props.username} text={message.text} />)}
        </>
    );
}

export default ChatMessagesPlaceholder;