import './main.css'
import {  useParams } from 'react-router-dom'
import axios from 'axios'
import {useState,useEffect} from 'react'

export const Main=()=>{
    const [recipes,setRecipes]=useState(undefined)
    
    useEffect(()=>{
        axios.get("/GetRecipes").then(res=>{
              const data=res['data']
              setRecipes({
                "name": data["name"],
                "maker": data["creator_name"]
              })
            
        })
        
    })
    
    return(
        <div>
          { (recipes!=undefined) &&
            <table>
              <thead>
                <tr>
                  <th>Recipe</th>
                </tr>
              </thead>
              <tbody>
                {recipes["name"].map((name, index) => (
                  <tr key={index}>
                    <td>{name}</td>
                    <td>{recipes["maker"][index]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          }
        </div>
    )
}