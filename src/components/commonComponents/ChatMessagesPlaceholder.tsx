import React from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';

const MessageReceived = (props) => {
    const isSender = props.from === props.username;

    return (
        <ListGroup.Item style={{ textAlign: isSender ? 'right' : 'left' }}>
            <strong>{isSender ? 'You' : props.from}</strong>: {props.text} {props.direct && <strong>(direct)</strong>}
        </ListGroup.Item>
    );
};

const ChatMessagesPlaceholder = (props) => {
    return (
        <Container>
            <h3>Public chat:</h3>
            <hr />
            <Row>
                <Col>
                    <ListGroup>
                        {props.messagesReceived.map(message => (
                            <MessageReceived
                                key={message.id}
                                from={message.from}
                                direct={message.to === props.username}
                                text={message.text}
                                username={props.username}
                            />
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
}

export default ChatMessagesPlaceholder;
