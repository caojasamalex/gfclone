import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./css/styles.css";
import Home from "./IndexPage";
import About from "./About";
import GuestForms from "./Forms/GuestForm";
import SignUp from "./Authentication/SignUp";
import LogIn from "./Authentication/LogIn";

const Navbar = () => (
  <nav className="navbar">
    <div className="logo">Forms FINK</div>
    <div className="nav-links">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/forms">Forms</Link>
    </div>
  </nav>
);

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/forms" element={<GuestForms />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </Router>
  );
}

export default App;
