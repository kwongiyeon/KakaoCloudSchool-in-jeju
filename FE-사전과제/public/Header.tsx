import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleMenuClick = () => {
    navigate('/menu');
  };

  return (
    <header className="header-content">
      <hr className="horizontal-rule" />
      <div className="profile-container">
        <img src="/profile-pic.png" alt="Profile" className="profile" />
        <div className="username">유니콘</div>
        <div className="hamburger-menu" onClick={handleMenuClick}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  );
};

export default Header;
