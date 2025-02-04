import React from "react";
import { Link } from "react-router-dom";
import "../css/styles.css";

const SignUp = () => {
  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form className="auth-form">
        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit" className="auth-button">Sign Up</button>
      </form>
      <p className="switch-auth">
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </div>
  );
};

export default SignUp;
