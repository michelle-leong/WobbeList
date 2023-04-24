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
              value={current.category}
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
            <Autocomplete
              apiKey={googleKey}
              onPlaceSelected={(place) => {
                console.log(place);
                setAddress(place.formatted_address.split(', ')[0]);
                setCity(place.address_components[2].long_name);
                setName(place.name);
              }}
              options={{
                types: ['establishment'],
                fields: ['address_components', 'name', 'formatted_address'],
              }}
            />
            {/* <input
              type='text'
              name='name'
              id='name'
              onChange={change}
              value={current.name}
             /> */}
          </td>
        </tr>
        <tr>
          <td>
            <label>Address: </label>
          </td>
          <td>
            <input
              type='text'
              name='address'
              id='address'
              onChange={change}
              value={address}
            />
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
              onChange={change}
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
