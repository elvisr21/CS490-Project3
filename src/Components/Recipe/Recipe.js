import './recipe.css'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'

export const Recipe=()=>{
    const  id  = useParams()['RecipeID']
   // const RecipeId= props.params.RecipeID;
   axios.get('/getRecipebyId', {
           params: {
                id: id
            }
   })
    console.log("id: ",id);
    return <h1> RecipeId={id}</h1>
}