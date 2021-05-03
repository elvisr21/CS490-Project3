import './main.css';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

import { useState, useEffect } from 'react';

export const Main = () => {
  const [recipes, setRecipes] = useState(undefined);

  useEffect(() => {
    axios.get('/GetRecipes').then((res) => {
      console.log(res);
      const data = res.data.returning;
      console.log('Data', data);
      setRecipes(data);
      console.log('Recipes: ', recipes);
    });
  }, []);
  const recipenav = '/recipe/';
  return (
    <div>
      <h1>Some Recipes:</h1>
      {recipes != undefined && (
        <div>
          {recipes.map((recipe, index) => (
            <div className="ic-DashboardCard">
              <table width="100%" height="100%">
                <tr key={index}>
                  <td width="50%">
                    <Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link>
                  </td>
                  <td width="50%">{recipe.creator_name}</td>
                </tr>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
