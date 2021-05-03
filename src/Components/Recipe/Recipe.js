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
      <div>aaaaaaaaa</div>
    </body>
  );
};

export default Recipe;
