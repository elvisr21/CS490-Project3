import './User.css';
import { useHistory, useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const User = () => {
<<<<<<< HEAD

  return (
    <body id="back">
          <div>fsdfsda</div>
          <div id='bot'> bottom text </div>
    </body>
=======
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
<<<<<<< HEAD
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
=======
    <body style={{ background: 'linear-gradient(90deg, rgb(40, 40, 40) 0%, rgb(17, 17, 17) 100%)' }}>
          { (users!=undefined) &&
            <div>
              <table class="styled-table">
                <thead>
                  <tr>
                    <th>Your Recipes</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr class="active-row" key={index}>
                    {user.creator_id == id ?
                      <td><Link style={{ textDecoration: 'none', color: 'black' }} to= {"/recipe/"+user["id"]}>{user.name}</Link></td>
                    :null
                    }
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }
        </body>
>>>>>>> 14f86ccb88299056b74eb1714dc09ecc7c24747e
    )
}
>>>>>>> 3ffac0657f89e25e30fc0e34cb3f3ab171d29488
