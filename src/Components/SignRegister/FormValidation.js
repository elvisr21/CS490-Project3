export default function validateInfo(account) {
  let errors = {};
  
  if(Object.keys(account).length === 2){ // this will check for login information
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
  }
  else { // this will validate for the registration
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
    } else if (account.password2 !== account.password) {
      errors.password2 = 'Passwords do not match';
    }
  }
  return errors;
}