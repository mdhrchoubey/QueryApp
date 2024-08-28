import React from 'react';
import { useNavigate } from 'react-router-dom';
import img from "./image/logo.png"
const userName=window.localStorage.getItem("name");
const Header = ({ lastLogin }) => {
    
    
  const navigate = useNavigate();


  const Logout=()=>{
    window.localStorage.clear();
    navigate("/")
  }
  return (
    <header className="university-header">
      <div className="top-header">
        <img src={img} alt="University Logo" className="university-logo" />
        <div className="university-info">
          <h1>Aryans Public Higher Secondry School</h1>
          <p>Aiims , Saket Nagar, Bhopal (M.P.)</p>
          <p className="university-subtitle">(Affilated by MP Government.)</p>
        </div>
      </div>
      
      <div className="user-info-bar">
        <div className="user-details">
          <span className="welcome-text">Welcome :</span>
          <span className="student-name">{userName}</span>
          {/* <span className="role">Role: [{role}]</span> */}
          {/* <span className="department">Department: [{department}]</span> */}
        </div>
        <div className="login-info">
          <span>Last Login:{lastLogin}</span>
          {/* <button className="logout-button">Logout</button> */}
          <button className="logout-button" onClick={Logout}>Logout</button>
        </div>
      </div>
      
      <nav className="main-nav">
        <ul>
          <li><a href="#">STUDENT SERVICES</a></li>
          <li><a href="#">HELP DESK/Grievance System</a></li>
          <li><a href="#">TRAINING & PLACEMENT</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;