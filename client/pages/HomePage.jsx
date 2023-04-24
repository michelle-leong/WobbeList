import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../UserContext.jsx';
import Autocomplete from 'react-google-autocomplete';

const HomePage = () => {
  const googleKey = process.env.API_KEY;

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  return (
    <div id='home-page-container'>
      <div id='home-page'>
        <p>Where to? </p>
        <div id='search-bar'>
          <Autocomplete
            apiKey={googleKey}
            onPlaceSelected={(place) => {
              navigate(`/user/${place.formatted_address.split(', ')[0]}`);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
