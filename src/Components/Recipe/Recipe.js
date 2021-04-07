import './recipe.css'
import { useHistory, useParams } from 'react-router-dom'

export const Recipe=()=>{
    const  id  = useParams()['RecipeID']
   // const RecipeId= props.params.RecipeID;
    console.log("id: ",id);
    return <h1> RecipeId={id}</h1>
}