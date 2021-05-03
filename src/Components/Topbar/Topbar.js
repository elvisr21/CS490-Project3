import './topbar.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

<<<<<<< HEAD
export const Topbar = ({ id }) => (
  // const [logged, setLogged] = useState(false);
  // console.log(id);
  <div
    style={{ background: 'linear-gradient(90deg, rgb(39, 176, 255) 0%, rgb(0, 232, 236) 100%)' }}
  >
    {id != -1 ? (
      <p className="navig">
        <p>Welcome!</p>
        <Link to="/">Home</Link>
        <Link to={`/profile/${id}`}>View Profile</Link>
        <Link to="/createRecipe">New Recipe</Link>
      </p>
    ) : (
      <p className="navig">
        <Link to="/">Home</Link>
        <Link to="/signRegister">Login</Link>
      </p>
    )}
    <h2 id="logo">
      <i>Chef Masters</i>
    </h2>
  </div>
);
=======
export const Topbar = ({ id }) => {
  //const [logged, setLogged] = useState(false);
  //console.log(id);
  return (
    <div style={{ 'background': 'linear-gradient(90deg, rgb(39, 176, 255) 0%, rgb(0, 232, 236) 100%)' }}>
      {id != -1  ? (
        <p className="navig">
                  <p>Welcome!</p>

          <Link to="/">Home</Link>
          <Link to={"/profile/"+id}>View Profile</Link>
          <Link to="/createRecipe">New Recipe</Link>
        </p>
      ) : (
        <p className="navig">
          <Link to="/">Home</Link>
          <Link to="/signRegister">Login</Link>
        </p>
      )}
      <h2 id="logo">
        <div id="child"><i>Chef Masters</i></div>
      </h2>
    </div>
  );
};
>>>>>>> 3ffac0657f89e25e30fc0e34cb3f3ab171d29488
Topbar.propTypes = {
  id: PropTypes.number,
};
Topbar.defaultProps = {
  id: -1,
};
