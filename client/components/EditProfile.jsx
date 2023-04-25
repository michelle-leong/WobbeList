import React from 'react';

const EditProfile = ({ change, cancel, submit, inputs }) => {
  return (
    <div id='edit-profile'>
      <h1>Edit Profile</h1>
      <table>
        <tr>
          <td>
            <label>Name: </label>
          </td>
          <td>
            <input
              type='text'
              name='username'
              onChange={change}
              value={inputs.username}
            />
          </td>
        </tr>
        <tr>
          <td>
            <label>Favorite City:</label>
          </td>
          <td>
            <input
              type='text'
              name='favorite_city'
              onChange={change}
              value={inputs.favorite_city}
            />
          </td>
        </tr>
        <tr>
          <td>
            <label>Bio: </label>
          </td>
          <td>
            <textarea
              name='description'
              onChange={change}
              value={inputs.description}
            />
          </td>
        </tr>
      </table>

      <div id='edit-buttons'>
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

export default EditProfile;
