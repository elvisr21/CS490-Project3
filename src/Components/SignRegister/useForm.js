import { useState, useEffect } from 'react';
import axios from 'axios';

export function useForm(callback, validate, setSigned) {
  const [account, setAccount] = useState({
    // to register
    username: '',
    password: '',
    password2: '',
    name: '',
  });

  // Login
  const [login, setUserLogin] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccount({
      ...account,
      [name]: value,
    });
    // login
    setUserLogin({
      ...login,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // let returnvalue = 0;
    console.log(account);
    setErrors(validate(account));
    setIsSubmitting(true);
    // console.log(isSubmitting);
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();

    setErrors(validate(login));
    setIsSubmitting(true);
    // console.log(Object.keys(errors).length);
    axios.post('/login', login).then((response) => {
      console.log(response);
      setSigned({ isUser: true, id: response.data.id }); // sets the unique user id, and login status for app.js
    });
  };
  
  
  useEffect(() => {
    console.log(Object.keys(errors).length);
    // console.log(errors);
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  return { handleChange, handleSubmit, handleSubmitLogin, account, login, errors };
}

export default useForm;
