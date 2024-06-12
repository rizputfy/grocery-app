import React from 'react';
import { Link } from 'react-router-dom';
import  './login.css';

const Login = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 mt-5">
      <div className="card p-4 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="mb-4 text-center">Login</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" placeholder="Enter your email" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Enter your password" />
            <p className="forgot-password text-right">
              <Link to="/forgotpassword">Forgot Password?</Link>
            </p>
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <div className="mt-3 text-center">
          <p>Don't have an account ?<Link to="/register"> Register</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;


