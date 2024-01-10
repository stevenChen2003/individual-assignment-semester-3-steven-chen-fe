import { useEffect, useRef } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";


const MessageReceived = (props) => {
   const isSender = props.from === props.username;

   return (
       <Card className="mb-2" style={{ textAlign: isSender ? 'right' : 'left' }}>
           <Card.Body>
               <Card.Text><strong>{isSender ? 'You:' : props.from}</strong> {props.text}</Card.Text>
           </Card.Body>
       </Card>
   );
};

const ChatMessagesPlaceholder = (props) => {
   const containerRef = useRef(null);

   useEffect(() => {
       if (containerRef.current) {
           containerRef.current.scrollTop = containerRef.current.scrollHeight;
       }
   }, [props.messagesReceived]);

   return (
       <Container style={{ height: '350px', overflowY: 'auto' }} ref={containerRef}>
           <Row>
               <Col>
                  {props.messagesReceived.map(message => (
                      <MessageReceived
                          key={message.id}
                          from={message.from}
                          text={message.text}
                          username={props.username}
                      />
                  ))}
               </Col>
           </Row>
       </Container>
   );
}

export default ChatMessagesPlaceholder;
