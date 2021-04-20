import React, { useState } from 'react';
import './Form.css';
import Register from './Register';
import FormSuccess from './FormSuccess';

const Form = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }

  return (
    <>
      <div className="form-container">
        <a className="close-btn" href="/">
          x
        </a>
        <div className="form-content-left">
          <img className="form-img" src="images/register-logo.jpg" alt="register-logo" />
        </div>
        {!isSubmitted ? <Register submitForm={submitForm} /> : <FormSuccess />}
      </div>
    </>
  );
};

export default Form;
