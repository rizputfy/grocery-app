import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const ForgotPassword = () => {
  return (
    <div className="login-form-container">
      <div className="login card p-4 shadow-sm">
        <div className="login-title">
          <h1>Forgot Password</h1>
        </div>
        <form>
          <div className="login-data">
            <div className="login-username-container mb-3">
              <div className="login-username">
                <input type="email" id="email" placeholder="Enter your email" />
              </div>
            </div>
          </div>
          <div className="login-button">
            <button type="submit" className="btn btn-primary w-100">Reset Password</button>
          </div>
        </form>
        <div className="mt-3 text-center">
          <Link to="/login">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
