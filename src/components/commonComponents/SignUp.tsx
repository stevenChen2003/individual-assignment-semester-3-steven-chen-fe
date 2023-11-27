import React, { useState } from 'react';
import UserApi from '../../api/UserApi';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import AuthAPI from '../../api/AuthApi';

export default function SignUp() {

  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    password: '',
    role: 'Customer',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    UserApi.addUser(user)
    .then(response => {
      AuthAPI.login(user.email, user.password)
      .then((response) => {
        console.log(response);
        navigate('/');
      })
    })
    
    .catch(error => {
      toast.error("Failed to create account");
    });
  }



 return (
  <div className='bg-warning vh-100 pt-5'>
      <div className="container bg-white p-4">
        <ToastContainer position="top-center" toastStyle={{ marginTop: '50px' }} />
        <form onSubmit={handleSubmit}>
          <h3>Sign Up</h3>
          <div className="mb-3">
            <label>First name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              value={user.firstName}
              onChange={(e) => setUser((prevUser) => ({ ...prevUser, firstName: e.target.value }))}
            />
          </div>
          <div className="mb-3">
            <label>Last name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              value={user.lastName}
              onChange={(e) => setUser((prevUser) => ({ ...prevUser, lastName: e.target.value }))}
            />
          </div>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={user.email}
              onChange={(e) => setUser((prevUser) => ({ ...prevUser, email: e.target.value }))}
            />
          </div>
          <div className="mb-3">
            <label>Date of Birth</label>
            <input
              type="date"
              className="form-control"
              placeholder="Enter date of birth"
              value={user.dateOfBirth}
              max={(new Date()).toISOString().split('T')[0]}
              onChange={(e) => setUser((prevUser) => ({ ...prevUser, dateOfBirth: e.target.value }))}
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={user.password}
              onChange={(e) => setUser((prevUser) => ({ ...prevUser, password: e.target.value }))}
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
        </form>

      </div>
    </div>
 );
}
