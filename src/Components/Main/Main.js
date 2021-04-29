import './main.css'
import {  useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom';
import {useState,useEffect} from 'react'

export const Main=()=>{
    const [recipes,setRecipes]=useState(undefined)
    
    useEffect(()=>{
        axios.get("/GetRecipes").then(res=>{
              console.log(res)
              const data = res.data.returning
              console.log(data)
              setRecipes(data)
              console.log("Recipes: ",recipes)
            
        })
        
    },[])
    const recipenav = "/recipe/"
    return(
        <div>
          { (recipes!=undefined) &&
            <table>
              <thead>
                <tr>
                  <th>Recipe</th>
                  <th>Maker</th>
                </tr>
              </thead>
              <tbody>
                {recipes.map((recipe, index) => (
                  <tr key={index}>
                    <td><Link to= {"/recipe/"+recipe["id"]}>{recipe.name}</Link></td>
                    <td>{recipe.creator_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          }
        </div>
    )
}
