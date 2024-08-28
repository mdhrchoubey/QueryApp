import React, { useState } from 'react';
// import { YouTube } from 'lucide-react';
import "./MainHeader.css"
import img from "./image/logo.png"
import MiddelPart from './MiddelPart';

const MainHeadr = () => {
  const [fontSize, setFontSize] = useState('normal');

  const changeFontSize = (size) => {
    setFontSize(size);
  };

  return (
    <>
    <header className={`rgpv-header font-${fontSize}`}>
      <div className="main-header">
        <img src={img} alt="RGPV Logo" className="rgpv-logo" />
        <div className="university-title">
          <h1>APS</h1>
          <h2>Aryans Public Higher Secondry School</h2>
          <p>Aiims , Saket Nagar, Bhopal (M.P.)</p>
          <p>An ISO 9001:2015 Certified Organization</p>
        </div>
      </div>
      
      <nav className="main-nav">
        <ul>
          <li><a href="#" className="home-link">Home</a></li>
          {/* <li><a href="#">The University</a></li> */}
          <li><a href="#">Academics</a></li>
          <li><a href="#">Admissions</a></li>
          <li><a href="#">Student's Life</a></li>
          {/* <li><a href="#">Governance</a></li> */}
          <li><a href="#">Research & Innovation</a></li>
          <li><a href="#">Login/Signup</a></li>
        </ul>
      </nav>
    </header>
    
    </>
  );
};

export default MainHeadr;