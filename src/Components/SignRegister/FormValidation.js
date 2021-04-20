import axios from 'axios';
import { useEffect } from 'react';

export default function validateInfo(account) {
  const errors = {};

  if (Object.keys(account).length === 2) {
    // this will check for login information
    if (!account.username.trim()) {
      errors.username = 'Username required';
    }
    // else if (!/^[A-Za-z]+/.test(account.name.trim())) {
    //   errors.name = 'Enter a valid name';
    // }

    if (!account.password) {
      errors.password = 'Password is required';
    }
    // else if (account.password.length < 6) {
    //   errors.password = 'Password needs to be 6 characters or more';
    // }
  } else {
    // this will validate for the registration
    if (!account.username.trim()) {
      errors.username = 'Username required';
    }
    // else if (!/^[A-Za-z]+/.test(account.name.trim())) {
    //   errors.name = 'Enter a valid name';
    // }

    if (!account.password) {
      errors.password = 'Password is required';
    } else if (account.password.length < 6) {
      errors.password = 'Password needs to be 6 characters or more';
    }

    if (!account.password2) {
      errors.password2 === 'Password is required';
      //console.log(errors);
    } else if (account.password2 !== account.password) {
      errors.password2 = 'Passwords do not match';
    }
  }

  // axios post method to check if the username exists in the db
  axios.post('/register', account).then((response) => {
    console.log(response);

    if (response['data']['code'] === 0) {
      console.log('axios check');
      //setIsSubmitting(false);
      //alert(response['data']['message']);
      errors.userexists = 'User already exists';
      console.log(Object.keys(errors).length);
    }
  });

  return errors;
}
