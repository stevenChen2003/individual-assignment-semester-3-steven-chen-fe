import React, { useEffect, useRef } from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';

const MessageReceived = (props) => {
    const isSender = props.from === props.username;

    return (
        <ListGroup.Item style={{ textAlign: isSender ? 'right' : 'left' }}>
            <strong>{isSender ? 'You' : props.from}</strong>: {props.text}
        </ListGroup.Item>
    );
};

const ChatMessagesPlaceholder = (props) => {

    const containerRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom when messages are updated
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [props.messagesReceived]);

    return (
        <Container style={{ height: '300px', overflowY: 'auto' }}  ref={containerRef}>
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
