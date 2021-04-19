import {Topbar} from './Topbar/Topbar';
import Form from './SignRegister/Form';
import {Main} from './Main/Main';
import {Favorite} from './Favorite/Favorite';
import {Recipe} from './Recipe/Recipe';
import {User} from './User/User';
import {CreateRecipe} from './CreateRecipe/CreateRecipe';

export const TopbarComponent=()=>{
    return <Topbar/>
}
export const SignRegisterComponent=()=>{
    return <Form/>
}
export const MainComponent=()=>{
    return(
            <Main/>    
    )
}
export const FavoriteComponent=()=>{
    return(
        <Favorite/>   
    )
}
export const RecipeComponent=()=>{
    return(
        <Recipe/>
    )
}
export const UserComponent=()=>{
    return(
        <User/> 
    )
}
export const CreateRecipeComponent=(props)=>{
    return(
        <CreateRecipe id={props.id}/>
    )
}