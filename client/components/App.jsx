import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage.jsx';
import NavBar from './NavBar.jsx';
import FeedContainer from '../pages/FeedContainer.jsx';
import ProfileContainer from '../pages/ProfileContainer.jsx';
import Login from './Login.jsx';
import NotFound from './NotFound.jsx';
import UserContext from '../UserContext.jsx';

const App = () => {
  const refreshUser = JSON.parse(sessionStorage.getItem('user'));
  const [user, setUser] = useState(refreshUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path='/' element={<Login action='login' />} />
        <Route path='/signup' element={<Login action='signup' />} />
        <Route path='/user' element={<NavBar />}>
          <Route path='home' element={<HomePage />} />
          <Route path=':location' element={<FeedContainer />} />
          <Route path='profile' element={<ProfileContainer />} />
        </Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
