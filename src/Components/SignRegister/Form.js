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
<<<<<<< HEAD
      <div className='form-container'>
        <a className='close-btn' href='/'>X</a>
        <div className='form-content-left'>
          <img className='form-img' src='images/register-logo.jpg' alt='register-logo' />
        </div>
        {!isSubmitted ? (
          <Register submitForm={submitForm}/>
        ) : (
          <FormSuccess href='/'/>
        )}
=======
      <div className="form-container">
        <span className="close-btn">×</span>
        <div className="form-content-left">
          <img className="form-img" src="images/register-logo.jpg" alt="register-logo" />
        </div>
        {!isSubmitted ? <Register submitForm={submitForm} /> : <FormSuccess />}
>>>>>>> cbc6bd0ea9d1566138449a723bf02e1721e95612
      </div>
    </>
  );
};

export default Form;
