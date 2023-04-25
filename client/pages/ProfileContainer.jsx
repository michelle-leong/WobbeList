import React, { useState, useContext } from 'react';
import Feed from '../components/Feed.jsx';
import { useLocation } from 'react-router-dom';
import EditProfile from '../components/EditProfile.jsx';
import axios from 'axios';
import UserContext from '../UserContext.jsx';
import BuildingPic from '../../public/building.svg';
import ProfileStock from '../../public/profile-stock.jpg';
import EditPic from '../../public/edit.svg';

const ProfileContainer = () => {
  const location = useLocation();
  const { user, setUser } = useContext(UserContext);
  const [state, setState] = useState({
    activeButton: 'Activities',
    feedList: [],
  });
  const id = user._id;

  const [open, setOpen] = useState(false);

  //determine which type of review to show based on active tab
  const handleClick = (e) => {
    setState({
      ...state,
      activeButton: e.target.value,
    });
  };

  const [inputs, setInputs] = useState({
    username: user.username,
    favorite_city: user.favorite_city,
    description: user.description,
  });

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const submitForm = () => {
    setOpen(false);
    const userInfo = {
      userId: id,
      ...inputs,
    };

    axios.patch(`/api/user/update`, userInfo).then((res) => {
      if (res.status === 200) {
        setUser({
          ...user,
          username: inputs.username,
          favorite_city: inputs.favorite_city,
          description: inputs.description,
        });
      }
    });
  };

  //fetch user feed and set feedList in state
  const fetchUserFeed = () => {
    axios
      .get(
        `http://localhost:3000/api/review/user/${id}/type/${state.activeButton}`
      )
      .then((res) => {
        setState({ ...state, feedList: res.data });
      });
  };

  return (
    <div id='profile-page'>
      <div id='sidebar'>
        <button id='edit-profile-button' onClick={() => setOpen(!open)}>
          <img src={EditPic} />
        </button>
        <div id='sidebar-header'>
          <img
            height='200px'
            width='200px'
            id='profile-picture'
            src={ProfileStock}
          />
          <h2>{user.username}</h2>
        </div>
        <ul>
          <li>
            <img height='25px' width='25px' src={BuildingPic} />
            {user.favorite_city}
          </li>
          <li>Bio: </li>
          {user.description}
        </ul>
      </div>
      {open ? (
        <EditProfile
          change={handleChange}
          cancel={() => setOpen(false)}
          submit={submitForm}
          inputs={inputs}
        />
      ) : null}
      <div id='profile-feed' className='profile-feed'>
        <Feed
          fetchFeed={fetchUserFeed}
          location={'Posts'}
          handleClick={handleClick}
          feedList={state.feedList}
          activeButton={state.activeButton}
          windowLocation={location.pathname}
        />
      </div>
    </div>
  );
};

export default ProfileContainer;
