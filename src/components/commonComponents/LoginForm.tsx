import React, { useState } from 'react';
import './Login.css';
import AuthAPI from '../../api/AuthApi';

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        AuthAPI.login(email, password)
        .catch(() => alert("Login failed!"))
        .catch(error => console.error(error));
        console.log(`Email: ${email}, Password: ${password}`);
    };

    return (
        <div className="bg-warning vh-100 d-flex align-items-center justify-content-center background-wrapper">
          <div className="card login-form container login-box">
            <div className="card-body text-white">
              <h1 className="card-title text-center">Login</h1>
              <div className="card-text mt-3">
                <form className="login-form" method="post" onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label>Email Address</label>
                    <input
                      type="email"
                      className="form-control form-control-sm"
                      id="Email"
                      name="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
      
                  <div className="form-group mb-3">
                    <label>Password</label>
                    <div className="password-input-container">
                      <input
                        type='password'
                        className="form-control form-control-sm"
                        id="Password"
                        name="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
      
                  <div className="container-fluid text-center mt-4">
                    <button type="submit" className="btn btn-primary btn-block mb-5">
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
}
