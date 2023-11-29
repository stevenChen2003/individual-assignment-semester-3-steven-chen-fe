import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import UserApi from '../api/UserApi';
import { ToastContainer, toast } from 'react-toastify';

export default function EditUserForm({ user, onClose, getUserInformation }) {
  const [editedUser, setEditedUser] = useState({
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    dateOfBirth: user.dateOfBirth,
    password: user.password,
    role: user.role,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    UserApi.updateUser(editedUser)
    .then(response => {
        onClose();
        getUserInformation();
      })
      .catch(error => {
        toast.error("Update failed")
      })
  };

  return (
    <>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          value={editedUser.email}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter first name"
          name="firstName"
          value={editedUser.firstName}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter last name"
          name="lastName"
          value={editedUser.lastName}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formDateOfBirth">
        <Form.Label>Date of Birth</Form.Label>
        <Form.Control
          type="date"
          name="dateOfBirth"
          value={editedUser.dateOfBirth}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Save Changes
      </Button>
    </Form>
    </>
  );
}

