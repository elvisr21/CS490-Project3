import './User.css';
import { useHistory, useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const User = () => {
  const [users, setUsers] = useState(undefined);

  useEffect(() => {
    axios.get('/GetRecipes').then((res) => {
      console.log(res);
      const data = res.data.returning;
      console.log('Data: ', data);
      setUsers(data);
      console.log('Users: ', users);
    });
  }, []);

  const id = useParams().UserID;
  console.log('id: ', id);

  return (
    <div>
      {users != undefined && (
        <table>
          <thead>
            <tr>
              <th>Your Recipes</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                {user.creator_id == id ? (
                  <td>
                    <Link to={`/recipe/${user.id}`}>{user.name}</Link>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
