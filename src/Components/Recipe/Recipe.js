import React, { useState, useEffect } from 'react';
import './recipe.css';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

const Recipe: React.FunctionComponent = ({ userId }) => {
  Recipe.propTypes = {
    userId: PropTypes.number.isRequired,
  };
  const [recipe, setRecipe] = useState(undefined);
  const id = useParams().RecipeID;
  // const RecipeId= props.params.RecipeID;
  const getRecipe = () => {
    axios
      .get('/getRecipebyId', {
        params: {
          id,
        },
      })
      .then((res) => {
        const { data } = res;
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
  };
  useEffect(() => {
    getRecipe();
  }, []);
  const addComment = (e) => {
    e.preventDefault();
    const comment = document.getElementById('comment');
    console.log(userId)
    if (userId !== -1 && comment.value !== '') {
      const data = {
        comment: comment.value,
        id: userId,
        recipe_id: id,
      };
      axios.post('/addComment', data).then(() => {
        const div = document.createElement('div');
        div.classList.add('Comment');

        getRecipe();
      });
    }
  };
  const deleteComment = (comment) => {
    axios.post('/deleteComment', { comment }).then(() => {
      getRecipe();
    });
  };
  return (
    <body id="back">
      {recipe !== undefined && (
        
        <div className="recipe">
        
          <div className="wrapper">
            <img src={recipe.img} alt="Recipe_Image" /><br />
            <div id="content">
              <a className="Recipe_Name">{recipe.name}</a><br />
              <a className="Creator">Creator: {recipe.creator_name}</a><br />
              <a className="Cuisine">Cuisine: {recipe.cuisine}</a><br />
              <a className="Description">Description: {recipe.description}</a><br />
            </div>
          </div>
          
          <div className="wrapper-2">
          
            <div id="heads" className="ingredients_recipe">
                Ingredients: <br/>
                {
                  recipe.ingredients.map((ingredient,index)=>{
                    return( 
                    <div id="bodys" className="ingredient_entry">
                        {ingredient['amount']} of {ingredient['name']}
                    </div>
                    )
                  })
                }
            </div>
            
            <div id="heads" className="instructions_recipe">
              Instructions: <br />
              {recipe.instructions.map((instruction, index) => (
                <div id="bodys" className="instruction_recipe">
                  {index + 1}. {instruction}
                </div>
              ))}
            </div>
            
          </div>
          
          <br />
          
          <div className="wrapper-3">
            <div className="Comments" id="Comment_section">
              Comments: <br />
              <input type="text" id="comment" require />
              <button className="form-input-btn" type="button" onClick={addComment}>
                Add Comment{' '}
              </button>
              {Object.entries(recipe.comments).map((comment) => (
                <div className="Comment">
                  <Link style={{ textDecoration: 'none', color: 'black' }}  to={`/profile/${comment[1].id}`} className="Comment_Creator">
                    From {comment[1].name}
                  </Link>
                  <div className="Comment">{comment[1].comment}</div>
                  {comment[1].id === userId && (
                    <div
                      onClick={() => deleteComment(comment[1].comment_id)}
                      role="button"
                      onKeyDown={() => deleteComment(comment[1].comment_id)}
                      tabIndex={0}
                    >
                      x
                    </div>
                  )}
                  <br />
                </div>
              ))}
            </div>
          </div>
          
        </div>
      )}
    </body>
  );
};

export default Recipe;
