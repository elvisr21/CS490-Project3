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
    
    useEffect(()=>{
        axios.get('/register', {
                   params: {
                        username: account['username'],
                        password: account['password'],
                        name: 'name name'
                    }
        }).then(res=>{
               const data=res['data']
                Object.entries(data['comments']).map((comment,index)=>{
                    console.log(comment)
                })
        })
    },[])
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