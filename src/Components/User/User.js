import './User.css';
import { useHistory, useParams } from 'react-router-dom';

export const User = () => {
  const id = useParams().UserID;
  console.log('id: ', id);
  return <h1> UserId={id}</h1>;
};
