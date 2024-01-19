import React, { useEffect, useState } from 'react';
import './Login.css';
import AuthAPI from '../../api/AuthApi';
import { Link, useNavigate } from 'react-router-dom';
import TokenManager from '../../api/TokenManager';
import { ToastContainer, toast } from 'react-toastify';

export default function LoginForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const checkAuthentication = () => {
      const accessToken = TokenManager.getAccessToken();
      return !!accessToken;
    };

    useEffect(() => {
      if (checkAuthentication()) {
        navigate('/');
      }
    }, [navigate]);

    const handleSubmit = (event) => {
      event.preventDefault();
      AuthAPI.login(email, password)
      .then((response) => {
        console.log(response);
        const claims = TokenManager.getClaims();
        if (claims.roles == "Admin") {
          navigate('/admin/movie');
        } else {
          navigate('/');
        }
        // showToast("Login Successful", "success");
        // setTimeout(() => {
        //   navigate('/');
        // }, 2000)
        
      })
      .catch(() => showToast("Login failed!", "error"))
      .catch(error => console.error(error));
      console.log(`Email: ${email}, Password: ${password}`);
    };

    const showToast = (message, type) => {
      toast[type](message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          background: type === 'success' ? '#4CAF50' : '#FF5733',
          color: "#ffffff",
        },
      });
    }

    return (
        <div className="bg-warning vh-100 d-flex align-items-center justify-content-center background-wrapper">
          <div className="card login-form container login-box">
            <div className="card-body text-white">
              <h1 className="card-title text-center">Login</h1>
              <div className="card-text mt-3">
              <ToastContainer />
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
                    <p className="mb-0">
                      Don't have an account? <Link to="/signup">Sign Up</Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
}
