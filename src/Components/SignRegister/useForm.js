import { useState, useEffect } from 'react';
import axios from 'axios';

export function useForm(callback, validate){
  const [account, setAccount] = useState({ // to register
    username: '',
    password: '',
    password2: '',
    name: ''
  });
  
  //Login
  const [login, setLogin] = useState({ // to login previous users
    username: '',
    password: '',
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setAccount({
      ...account,
      [name]: value
    });
    //login
    setLogin({
      ...login,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    var returnvalue = 0;
    
    console.log(account);
    
    axios.post('/register', account)
    .then(response => {
      console.log(response);

      if(response['data']['code'] == 0){
        //setIsSubmitting(false);
        alert(response['data']['message']);
        //returnvalue = 1;
      }
      else{
        console.log("here");
        setErrors(validate(account));
        setIsSubmitting(true);
      }
    }); // send data to backend endpoint
    
    // if(returnvalue != 1){
    //   console.log("here");
    //   console.log(isSubmitting);
      
    // }
  };
  
  const handleSubmitLogin = e => {
    e.preventDefault();
    
    setErrors(validate(login));
    setIsSubmitting(true);
    
    axios.post('/login', login);// sends the login info to backend
    
    console.log(login);
  };

  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        callback();
      }
    },
    [errors]
  );

  return { handleChange, handleSubmit, handleSubmitLogin, account, login, errors };
};

export default useForm;