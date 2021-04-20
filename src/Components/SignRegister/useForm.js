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
  
  function isSubmittingTrue() {
    setIsSubmitting((prevShown) => {
      return !prevShown
    })
  }
  
  const handleChange = e => {
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
    // }
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();

    setErrors(validate(login));
    setIsSubmitting(true);

    axios.post('/login', login).then(
      (response)=>{
        console.log(response)
      }); // sends the login info to backend

    console.log(login);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  return { handleChange, handleSubmit, handleSubmitLogin, account, login, errors };
}

export default useForm;
