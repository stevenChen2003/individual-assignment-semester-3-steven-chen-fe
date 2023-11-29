import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UserApi from '../api/UserApi';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

export default function PersonalPage() {

  const { id } = useParams();
  const [user, setUser] = useState({
    email: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
  });

  useEffect(() => {
    const getUserInformation = async () => {
      try {
        const data = await UserApi.getUser(id);
        console.log(data);
        setUser({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          dateOfBirth: data.dateOfBirth,
        });
      } catch (error) {
        console.error('Error fetching user details:', error);
        ///go to unauthorized page or something
      }
      
    };
    getUserInformation();
  }, [id]);


  return (
    <Container className="mt-5">
     <Row className="justify-content-md-center">
       <Col xs lg="6">
         <Card>
           <Card.Body>
             <Card.Title>{user.firstName} {user.lastName}</Card.Title>
             <Card.Text>
               Email: {user.email} <br />
               Date of Birth: {user.dateOfBirth}
             </Card.Text>
             <Button variant="primary">Edit Profile</Button>
           </Card.Body>
         </Card>
       </Col>
     </Row>
   </Container>
  )
}
