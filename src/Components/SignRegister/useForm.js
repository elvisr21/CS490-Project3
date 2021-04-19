import { useState, useEffect } from 'react';
import axios from 'axios';

export function useForm(callback, validate){
  const [account, setAccount] = useState({
    username: '',
    password: '',
    password2: ''
  });
  
  //Login
  const [login, setLogin] = useState({
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

    setErrors(validate(account));
    setIsSubmitting(true);
    
    console.log(account);
<<<<<<< HEAD
    
    useEffect(()=>{
      const data = account;
      axios.post('/register', data)
          .then(response => this.setAccount({ username: response.data.username }))
          console.log(data);
    });
=======
    //axios.post('/register')
    // useEffect(() => {
    // // for the player moves
    // socket.on('move', (data) => {
      
    // });
>>>>>>> 6709d24f5074275fdfc4aa4150b10e8eb61d89c5
  };
  
  const handleSubmitLogin = e => {
    e.preventDefault();
    
    setErrors(validate(login));
    setIsSubmitting(true);
    
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