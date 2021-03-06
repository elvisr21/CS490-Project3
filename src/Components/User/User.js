import './User.css';
import { useHistory, useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';


export const User = () => {
  const [users, setUsers] = useState(undefined);
  const [favs, setFavs] = useState(undefined);

  useEffect(() => {
    axios.get('/GetRecipes').then((res) => {
      console.log(res);
      const data = res.data.returning;
      console.log('Data: ', data);
      setUsers(data);
      console.log('Users: ', users);
    });
    getRecipe()
  }, []);
  
  const id = useParams().UserID;
  
  const getRecipe = () => {
    axios
      .get('/GetFavorite', {
        params: {
          user_id:id,
        },
      })
      .then((res) => {
        console.log("favorite:",res)
        const data = res.data;
        setFavs(data)
      });
  };

  console.log('id: ', id);


  return (
    <body id="back">
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
    )
}