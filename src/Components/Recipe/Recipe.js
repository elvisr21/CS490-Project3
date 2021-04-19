import './recipe.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

export const Recipe = () => {
  const [recipe, setRecipe] = useState(undefined);
  const id = useParams().RecipeID;
  // const RecipeId= props.params.RecipeID;
  useEffect(() => {
    axios
      .get('/getRecipebyId', {
        params: {
          id,
        },
      })
      .then((res) => {
        const { data } = res;
        Object.entries(data.comments).map((comment, index) => {
          console.log(comment);
        });
        setRecipe({
          name: data.name,
          creator_id: data.creator_id,
          creator_name: data.creator_name,
          cuisine: data.cuisine,
          description: data.description,
          ingredients: data.ingredients,
          img: data.img,
          comments: data.comments,
          instructions: data.instructions,
        });
      });
  }, []);
  console.log(recipe);
  return (
    <>
      {recipe != undefined && (
        <div className="recipe">
          <img src={recipe.img} />
          <div className="Recipe_Name">Name: {recipe.name}</div>
          <div className="Creator">Creator: {recipe.creator_name}</div>
          <div className="Creator_id">Creator_id: {recipe.creator_id}</div>
          <div className="Cuisine">Cuisine: {recipe.cuisine}</div>

          <div className="Description">Description: {recipe.description}</div>
          <div className="Instructions">
            Instructions: <br />
            {recipe.instructions.map((instruction, index) => (
              <div className="instruction">
                {index + 1}. {instruction}{' '}
              </div>
            ))}
          </div>
          <br />
          <div className="Comments">
            Comments:
            {Object.entries(recipe.comments).map((comment) => (
              <div className="Comment">
                <div className="Comment_Creator">creator={comment[1].name}</div>
                <div className="creator_id">creator_id={comment[1].id}</div>
                <div className="Comment">comment={comment[1].comment}</div>
                <br />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
