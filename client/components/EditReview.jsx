import React from 'react';
import Autocomplete from 'react-google-autocomplete';
{
  /* <Autocomplete
            apiKey={googleKey}
            onPlaceSelected={(place) => {
              // navigate(`/user/${place.formatted_address.split(', ')[0]}`);
              console.log(place);
            }}
            options={{
              types: ['establishment'],
            }} /> */
}

const EditReview = ({
  title,
  change,
  submit,
  cancel,
  current,
  setName,
  setAddress,
  setCity,
  name,
  address,
  city,
}) => {
  const googleKey = process.env.API_KEY;
  return (
    <div id='edit-review-box'>
      <h1> {title} Review</h1>

      <table>
        <tr>
          <td>
            <label>Category: </label>
          </td>
          <td>
            <select
              name='category'
              id='category'
              onChange={change}
              value={current.review_type}
            >
              <option value='Activities'>Activity</option>
              <option value='Landmarks'>Landmark</option>
              <option value='Restaurants'>Restaurant</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>
            <label>Name: </label>
          </td>
          <td>
            {current.review_type === 'Activities' ? (
              <input
                type='text'
                name='name'
                id='name'
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            ) : (
              <Autocomplete
                apiKey={googleKey}
                value={name}
                onChange={(e) => setName(e.target.value)}
                onPlaceSelected={(place) => {
                  console.log(place);
                  setAddress(place.formatted_address.split(', ')[0]);
                  setCity(place.formatted_address.split(', ')[1]);
                  setName(place.name);
                }}
                options={{
                  types: ['establishment'],
                  fields: ['name', 'formatted_address'],
                }}
              />
            )}
          </td>
        </tr>
        <tr>
          <td>
            <label>Address: </label>
          </td>
          <td>
            {current.review_type === 'Activities' ? (
              <Autocomplete
                apiKey={googleKey}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onPlaceSelected={(place) => {
                  setAddress(place.formatted_address.split(', ')[0]);
                  setCity(place.formatted_address.split(', ')[1]);
                }}
                options={{
                  types: ['establishment'],
                  fields: ['name', 'formatted_address'],
                }}
              />
            ) : (
              <input
                type='text'
                name='address'
                id='address'
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              />
            )}
          </td>
        </tr>
        <tr>
          <td>
            <label>City: </label>
          </td>
          <td>
            <input
              type='text'
              name='city'
              id='city'
              onChange={(e) => setCity(e.target.value)}
              value={city}
            />
          </td>
        </tr>
        <tr>
          <td>
            <label name='rating'>Rating: </label>
          </td>
          <td>
            <select
              name='rating'
              id='rating'
              onChange={change}
              value={current.rating}
            >
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>
            <label>Comments: </label>
          </td>
          <td>
            <textarea
              name='comments'
              id='comments'
              onChange={change}
              value={current.comments}
            />
          </td>
        </tr>
      </table>
      <div id='edit-review-buttons'>
        <button id='edit-cancel' onClick={cancel}>
          Cancel
        </button>
        <button id='edit-submit' onClick={submit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default EditReview;
