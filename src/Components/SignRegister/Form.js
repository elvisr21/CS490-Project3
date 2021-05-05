import React, { useState } from 'react';
import './Form.css';
import { Redirect, Link } from 'react-router-dom';
import Register from './Register';
// import FormSuccess from './FormSuccess';
import { Main } from '../Main/Main';

const Form = (props) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }
  // console.log("form.js", props.setLogin);
  return (
    <>
      <div className="form-container">
        <Link className="close-btn" to="/">
          x
        </Link>

        <div className="form-content-left">
          <img className="form-img" src="images/register-logo.jpg" alt="register-logo" />
        </div>
        {!isSubmitted ? (
          <Register setSigned={props.setSigned} submitForm={submitForm} />
        ) : (
          <Redirect to="/" />
        )}
      </div>
    </>
  );
};
// <a className="close-btn" href="/">
//           x
//         </a>
export default Form;
