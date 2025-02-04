import React from "react";
import "./css/styles.css";
import image from "./css/images/image.png";

const teamMembers = [
  { name: "Ognjen Obradovic", role: "Frontend Developer", img: {image} },
  { name: "Aleksandar Djokic", role: "Backend Developer", img: "css/images/unnamed.jpg" },
  { name: "Mihajlo Spasic", role: "UI/UX Designer", img: "css/images/charlie.jpg" },
  { name: "Arsenije Djokic", role: "UI/UX Designer", img: "css/images/charlie.jpg" },
  { name: "Janko Jakovljevic", role: "UI/UX Designer", img: "css/images/charlie.jpg" }];

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About Our Project</h1>
      <p className="about-description">
        Forms FINK is a simple and efficient form-building platform created for easy collaboration and data collection.
      </p>
      
      <div className="team-section">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-card">
            <img src={member.img} alt={member.name} className="team-image" />
            <h2 className="team-name">{member.name}</h2>
            <p className="team-role">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
