import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Review from './Review.jsx';
import EditReview from './EditReview.jsx';

const Feed = ({
  fetchFeed,
  handleClick,
  feedList,
  location,
  activeButton,
  windowLocation,
}) => {
  useEffect(() => {
    fetchFeed();
  }, [activeButton]);

  const [open, setOpen] = useState(false);

  const [inputs, setInputs] = useState({
    category: 'Activities',
    rating: 1,
    comments: '',
  });

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');

  console.log(address);
  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const reviewObj = {
    category: inputs.category,
    name: name,
    Address: address,
    city: city,
    rating: inputs.rating,
    comments: inputs.comments,
  };

  const handleSubmit = (e) => {
    setOpen(false);
    setInputs({
      category: 'Activities',
      rating: 1,
      comments: '',
    });
    axios.post('/api/review', {
      user_id: user._id,
      city: city,
      review_type: inputs.category,
      name: name,
      rating: inputs.rating,
      address: address,
      comments: inputs.comments,
    });
  };

  const posts = [];
  feedList.forEach((review) => {
    const stars = [];
    for (let i = 0; i < review.rating; i++) {
      stars.push(<span className='star'>&#9733;</span>);
    }
    if (review.rating < 5) {
      for (let i = 0; i < 5 - review.rating; i++) {
        stars.push(<span className='empty-star'>&#9734;</span>);
      }
    }
    posts.push(
      <Review
        windowLocation={windowLocation}
        key={review._id}
        reviewId={review._id}
        city={review.city}
        locationName={review.name}
        address={review.address}
        rating={stars}
        ratingNum={review.rating}
        type={review.review_type}
        description={review.comments}
        userName={review.username}
      />
    );
  });

  return (
    <div className='feed-container'>
      <div id='feed-header'>
        <h2>{location}</h2>
        <button id='new-review' onClick={() => setOpen(true)}>
          New Review
        </button>
      </div>
      <div id='button-container'>
        <button
          value='Activities'
          onClick={handleClick}
          className={activeButton === 'Activities' ? 'active' : ''}
        >
          Activities
        </button>
        <button
          value='Landmarks'
          id='landmark'
          onClick={handleClick}
          className={activeButton === 'Landmarks' ? 'active' : ''}
        >
          Landmarks
        </button>
        <button
          value='Restaurants'
          onClick={handleClick}
          className={activeButton === 'Restaurants' ? 'active' : ''}
        >
          Restaurants
        </button>
      </div>
      {open ? (
        <EditReview
          title={'New'}
          current={reviewObj}
          change={handleChange}
          cancel={() => setOpen(false)}
          submit={handleSubmit}
          name={name}
          setName={setName}
          address={address}
          setAddress={setAddress}
          city={city}
          setCity={setCity}
        />
      ) : null}
      <div id='posts-container'>{posts}</div>
    </div>
  );
};

export default Feed;
