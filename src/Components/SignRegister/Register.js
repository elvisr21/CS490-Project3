import React, { useState } from 'react';
import validate from './FormValidation';
import { Redirect, Link } from 'react-router-dom';
import useForm from './useForm';
import './Form.css';

const Register = ({ submitForm, setSigned }) => {
  const [loginLink, setLoginLink] = useState(false);
  const { handleChange, handleSubmit, handleSubmitLogin, account, login, errors } = useForm(
    submitForm,
    validate,
    setSigned,
  );

  function clicked() {
    setLoginLink(true);
  }
  function redirect(){
    return <Redirect to='/Home' />
  }
  // console.log(setLogin);

  // console.log ("Login Link: ", loginLink)
  return (
    <>
      {!loginLink ? (
        <div className="form-content-right">
          <form onSubmit={handleSubmit} className="form" noValidate>
            <h1>
              Get started with us today! Create your account by filling out the information below.
            </h1>
            <div className="form-inputs">
              <label className="form-label">Full Name</label>
              <input
                className="form-input"
                type="text"
                name="name"
                placeholder="Enter your name"
                value={account.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-inputs">
              <label className="form-label">Username</label>
              <input
                className="form-input"
                type="text"
                name="username"
                placeholder="Enter your username"
                value={account.username}
                onChange={handleChange}
              />
              {errors.username && <p>{errors.username}</p>}
              {errors.userexists && <p>{errors.userexists}</p>}
            </div>
            <div className="form-inputs">
              <label className="form-label">Password</label>
              <input
                className="form-input"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={account.password}
                onChange={handleChange}
              />
              {errors.password && <p>{errors.password}</p>}
            </div>
            <div className="form-inputs">
              <label className="form-label">Confirm Password</label>
              <input
                className="form-input"
                type="password"
                name="password2"
                placeholder="Confirm your password"
                value={account.password2}
                onChange={handleChange}
              />
              {errors.password2 && <p>{errors.password2}</p>}
            </div>
            <button className="form-input-btn" type="submit">
              Sign up
            </button>
            <span className="form-input-login">
              Already have an account? Login{' '}
              <a href="#" onClick={clicked}>
                here
              </a>
            </span>
          </form>
        </div>
      ) : (
        <div className="form-content-right">
          <form onSubmit={handleSubmitLogin} className="form" noValidate>
            <h1>Welcome Back. Login Here!</h1>
            <div className="form-inputs">
              <label className="form-label">Username</label>
              <input
                className="form-input"
                type="text"
                name="username"
                placeholder="Enter your username"
                value={login.username}
                onChange={handleChange}
              />
              {errors.username && <p>{errors.username}</p>}
            </div>
            <div className="form-inputs">
              <label className="form-label">Password</label>
              <input
                className="form-input"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={login.password}
                onChange={handleChange}
              />
              {errors.password && <p>{errors.password}</p>}
            </div>
            <button className="form-input-btn" type="submit">
              Login
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Register;
