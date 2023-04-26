import React, { useContext, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import UserContext from '../UserContext.jsx';

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, []);

  const logout = () => {
    setUser(null);
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <div id='nav-bar'>
      <ul id='nav-links'>
        <li>
          <Link to='/user/home'>WobbeList</Link>
        </li>
        <li id='my-profile'>
          <Link to='/user/profile'>Profile</Link>
        </li>
        <li>
          <button onClick={logout} id='logout'>
            Logout
          </button>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default NavBar;
