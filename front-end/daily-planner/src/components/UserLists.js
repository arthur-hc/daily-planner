import React from 'react';
import PropTypes from 'prop-types';

const UserList = ({ list }) => (
  <div>
    NO LIST YET!
    {console.log(list)}
  </div>
);

UserList.propTypes = ({
  list: PropTypes.array,
}).isRequired;

export default UserList;
