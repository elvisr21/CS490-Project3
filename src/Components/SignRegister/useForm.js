import { useState, useEffect } from 'react';
import axios from 'axios';

export function useForm(callback, validate) {
  const [account, setAccount] = useState({
    // to register
    username: '',
    password: '',
    password2: '',
    name: '',
  });

  // Login
  const [login, setLogin] = useState({
    // to login previous users
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
<<<<<<< HEAD
  
  function isSubmittingTrue() {
    setIsSubmitting((prevShown) => {
      return !prevShown
    })
  }
  
  const handleChange = e => {
=======

  const handleChange = (e) => {
>>>>>>> 6e5f3e99b61e995f2b3027c57d8cd7c94988397a
    const { name, value } = e.target;
    setAccount({
      ...account,
      [name]: value,
    });
    // login
    setLogin({
      ...login,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
<<<<<<< HEAD
    //let returnvalue = 0;
    
    console.log(account);
    setErrors(validate(account));
    isSubmittingTrue();
    console.log(isSubmitting);
    //const temp = {...errors};
    
    // console.log(Object.keys(validate(account)).length);
    
    // if(Object.keys(validate(account)).length === 0){ // if there are no validation errors
    //   //console.log(errors);
      
    //   callback();
    //   console.log(isSubmitting);
    // }
    
    // if(returnvalue !== 1){
    //   setErrors(validate(account));
    //   setIsSubmitting(true);
    //   console.log("here");
    //   console.log(isSubmitting);
=======
    const returnvalue = 0;

    console.log(account);

    axios.post('/register', account).then((response) => {
      console.log(response);

      if (response.data.code == 0) {
        // setIsSubmitting(false);
        alert(response.data.message);
        // returnvalue = 1;
      } else {
        console.log('here');
        setErrors(validate(account));
        setIsSubmitting(true);
      }
    }); // send data to backend endpoint

    // if(returnvalue != 1){
    //   console.log("here");
    //   console.log(isSubmitting);

>>>>>>> 6e5f3e99b61e995f2b3027c57d8cd7c94988397a
    // }
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();

    setErrors(validate(login));
    setIsSubmitting(true);

    axios.post('/login', login); // sends the login info to backend

    console.log(login);
  };

<<<<<<< HEAD
  useEffect(
    () => {
      console.log(Object.keys(errors).length);
      if (Object.keys(errors).length === 0 && isSubmitting) {
        callback();
      }
    },
    [errors]
  );
=======
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);
>>>>>>> 6e5f3e99b61e995f2b3027c57d8cd7c94988397a

  return { handleChange, handleSubmit, handleSubmitLogin, account, login, errors };
}

export default useForm;
