import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../UserContext.jsx';
import NavBar from '../NavBar.jsx';

const HomePage = () => {
  const [location, setLocation] = useState('');

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      navigate(`/${location}`);
    }
  };

  return (
    <div id='home-page-container'>
      <NavBar />
      <div id='home-page'>
        <p>Where to? </p>
        <div id='search-bar'>
          <input
            type='text'
            name='location'
            id='location-search'
            onChange={handleChange}
            value={location}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
