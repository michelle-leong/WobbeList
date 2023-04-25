import React, { useState, useContext } from 'react';
import EditReview from './EditReview.jsx';
import axios from 'axios';
import EditPic from '../../public/edit.svg';
import CityPic from '../../public/location.svg';
import BuildingPic from '../../public/building.svg';
import UserContext from '../UserContext.jsx';

const Review = ({
  reviewId,
  locationName,
  address,
  type,
  rating,
  city,
  ratingNum,
  description,
  userName,
  windowLocation,
  activeButton,
  fetchFeed,
}) => {
  const { user } = useContext(UserContext);
  const [openEdit, setOpenEdit] = useState(false);
  const [inputsReview, setInputsReview] = useState({
    review_type: type,
    rating: ratingNum,
    comments: description,
  });

  const [inputName, setInputName] = useState(locationName);
  const [inputCity, setInputCity] = useState(city);
  const [inputAddress, setInputAddress] = useState(address);
  const handleClick = () => {
    setOpenEdit(true);
  };

  const handleChange = (e) => {
    setInputsReview({ ...inputsReview, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setOpenEdit(false);
    axios
      .put(`/api/review/${reviewId}`, {
        user_id: user._id,
        city: inputCity,
        review_type: inputsReview.category,
        name: inputName,
        rating: inputsReview.rating,
        address: inputAddress,
        comments: inputsReview.comments,
      })
      .then((res) => {
        if (inputsReview.review_type === activeButton) {
          fetchFeed();
        }
      });
  };

  return (
    <div className='review-post'>
      {windowLocation.includes('user/profile') && (
        <button className='edit-button' onClick={() => handleClick()}>
          <img src={EditPic} width='30px' height='30px' />
        </button>
      )}
      <ul className='review-info'>
        <li className='review-heading'>
          <h3 className='location-post'>{locationName}</h3>
          <span className='star-container'>{rating}</span>
        </li>
        <li className='addresss'>
          <img className='address-icon' src={CityPic} /> {address}
        </li>
        {windowLocation.includes('user/profile') && (
          <li className='city-review'>
            <img
              className='city-icon'
              height='20px'
              width='20px'
              src={BuildingPic}
            />
            <strong>{city}</strong>
          </li>
        )}
        <li className='description'>{description}</li>
        <li>
          <span>Posted by</span> {userName}
        </li>
      </ul>
      {openEdit ? (
        <EditReview
          title={'Edit'}
          change={handleChange}
          submit={handleSubmit}
          cancel={() => setOpenEdit(false)}
          current={inputsReview}
          setName={setInputName}
          setAddress={setInputAddress}
          setCity={setInputCity}
          name={inputName}
          address={inputAddress}
          city={inputCity}
        />
      ) : null}
    </div>
  );
};
export default Review;
