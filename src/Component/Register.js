import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  return (
    <div className="coba d-flex align-items-center justify-content-center mt-5">
      <div className="card p-4 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="mb-4 text-center">Register</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="first_name" className="form-label">First Name</label>
            <input type="first_name" className="form-control" id="first_name" placeholder="Enter your first name" />
          </div>
          <div className="mb-3">
            <label htmlFor="last_name" className="form-label">Last Name</label>
            <input type="last_name" className="form-control" id="last_name" placeholder="Enter your last name" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" placeholder="Enter your email" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Enter your password" />
          </div>
          <button type="submit" className="btn btn-primary w-100">Sign Up</button>
        </form>
        <div className="mt-3 text-center">
          <p>Already registered ?<Link to="/login"> Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register;

// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import './SignUp.css';

// export default class SignUp extends Component {
//   render() {
//     return (
//       <div className="login-form-container">
//         <div className="login card p-4 shadow-sm">
//           <div className="login-title">
//             <h1>Sign Up</h1>
//           </div>
//           <form>
//             <div className="login-data">
//               <div className="login-username-container mb-3">
//                 <div className="login-username">
//                   <label htmlFor="name" className="form-label">First Name</label>
//                   <input type="text" className="form-control" placeholder="First name" />
//                 </div>
//               </div>
//               <div className="login-username-container mb-3">
//                 <div className="login-username">
//                   <label htmlFor="name" className="form-label">Last Name</label>
//                   <input type="text" className="form-control" placeholder="Last name" />
//                 </div>
//               </div>
//               <div className="login-username-container mb-3">
//                 <div className="login-username">
//                   <label htmlFor="email" className="form-label">Email</label>
//                   <input type="email" className="form-control" placeholder="Enter email" />
//                 </div>
//               </div>
//               <div className="login-password-container mb-3">
//                 <div className="login-password">
//                   <label htmlFor="password" className="form-label">Password</label>
//                   <input type="password" className="form-control" placeholder="Enter password" />
//                 </div>
//               </div>
//             </div>
//             <div className="login-button">
//               <button type="submit" className="btn btn-primary w-100">Sign Up</button>
//             </div>
//           </form>
//           <div className="mt-3 text-center">
//             <Link to="/sign-in">Already registered? Sign in</Link>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
