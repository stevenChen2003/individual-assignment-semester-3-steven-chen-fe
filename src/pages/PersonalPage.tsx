import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, Col, Container, Row, Modal } from 'react-bootstrap';

import UserApi from '../api/UserApi';
import EditUserForm from '../components/EditUserForm';
import UserBookingPage from './UserBookingPage';

export default function PersonalPage() {
  const { id } = useParams();
  const [user, setUser] = useState({
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    password: '',
    role: '',
  });
  const [showEditModal, setShowEditModal] = useState(false);

  const getUserInformation = async () => {
      try {
        const data = await UserApi.getUser(id);
        console.log(data);
        setUser({
          id: data.userId,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          dateOfBirth: data.dateOfBirth,
          password: data.password,
          role: data.role,
        });
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

  useEffect(() => {
    getUserInformation();
  }, [id]);

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleModalClose = () => {
    setShowEditModal(false);
  };

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
              <Button variant="primary" onClick={handleEditClick}>
                Edit Profile
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {user.role === 'Customer' && <UserBookingPage />}

      {/* Edit User Modal */}
      <Modal show={showEditModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditUserForm user={user} onClose={handleModalClose} getUserInformation={getUserInformation} />
        </Modal.Body>
      </Modal>
    </Container>
  );
}

