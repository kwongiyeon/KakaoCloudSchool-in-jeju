import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Menu.css';

const Menu: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleBookmarkClick = () => {
    navigate('/bookmark');
  };

  return (
    <div className="menu-container">
        <button className="back-button" onClick={handleBackClick}>
            <span className="back-button-text">X</span>
        </button>
        <h1>메뉴</h1>
        <hr className="menu-separator" />
        <div className="menu-item" onClick={handleHomeClick}>홈</div>
        <hr className="menu-separator" />
        <div className="menu-item" onClick={handleBookmarkClick}>북마크</div>
        <hr className="menu-separator" />
    </div>
  );
};

export default Menu;
