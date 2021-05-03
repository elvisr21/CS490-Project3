import React, { useState, useEffect } from 'react';
import './recipe.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {Link} from 'react-router-dom';

window.onload=()=>{
  var comment = document.getElementById("comment");
  var commentSection = document.getElementById("Comment_section");
}


const Recipe: React.FunctionComponent = (props) => {
  const [recipe, setRecipe] = useState(undefined);
  const id = useParams().RecipeID;
  const userId=props.id
  // const RecipeId= props.params.RecipeID;
  const getRecipe=()=>{
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
  }
  useEffect(() => {
    getRecipe()
  }, []);
  console.log(recipe)
  const addComment=(e)=>{
    e.preventDefault();
    if (userId!=-1 && comment.value!=""){
        const data={
          "comment":comment.value,
          "id":userId,
          "recipe_id":id
        }
        axios.post('/addComment',data).then(res=>{
          const div= document.createElement('div')
          div.classList.add('Comment');
          
          
          getRecipe()
        })
    }
  }
  const deleteComment=(id)=>{
    console.log(id)
    axios.post('/deleteComment',{'id':id}).then(res=>{
      
      
      getRecipe()
    })
  }
  return (
    <body style={{ 'background': 'linear-gradient(90deg, rgb(40, 40, 40) 0%, rgb(17, 17, 17) 100%)' }}>
      {recipe !== undefined && (
        <div className="recipe">
          <img src={recipe.img} alt="Recipe_Image" />
            <div id="content" className="Recipe_Name">Name: {recipe.name}</div>
            <div id="content" className="Creator">Creator: {recipe.creator_name}</div>
            <div id="content" className="Creator_id">Creator_id: {recipe.creator_id}</div>
            <div id="content" className="Cuisine">Cuisine: {recipe.cuisine}</div>
            <div id="content" className="Description">Description: {recipe.description}</div>
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
          <br />
          <div className="Comments" id="Comment_section">
            Comments: <br/>
            
            <input type="text"  id="comment" require/>
            <button type="button" onClick={addComment}>Add Comment </button>
            {Object.entries(recipe.comments).map((comment) => (
              <div className="Comment">
                <Link to={"/profile/" + comment[1].id} className="Comment_Creator">{comment[1].name}</Link>
                <div className="Comment">{comment[1].comment}</div>
                {(comment[1].id==userId) && <div onClick={()=> deleteComment(comment[1].comment_id)}>x</div> }
                <br />
              </div>
            ))}
            
          </div>
        </div>
      )}
    </body>
  );
};

export default Recipe;
