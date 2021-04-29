import './User.css';
import { useHistory, useParams } from 'react-router-dom';
import {useState,useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';



export const User = () => {
  const [users,setUsers]=useState(undefined)
  
      useEffect(()=>{
        axios.get("/GetUserName").then(res=>{
              console.log(res)
              const data = res.data.returning
              console.log(data)
              setUsers(data)
              console.log(users)
            
        })
        
    },[])
  
  const id = useParams().UserID;
  console.log('id: ', id);
  
  return (
    <div>
    <h1> UserId={id}</h1>
          { (users!=undefined) &&
            <table>
              <thead>
                <tr>
                  <th>Your Recipes</th>
                </tr>
              </thead>
              <tbody>

              </tbody>
            </table>
          }
        </div>
    )
};
