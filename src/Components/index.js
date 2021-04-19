import { Topbar } from './Topbar/Topbar';
import Form from './SignRegister/Form';
<<<<<<< HEAD
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
=======
import { Main } from './Main/Main';
import { Favorite } from './Favorite/Favorite';
import { Recipe } from './Recipe/Recipe';
import { User } from './User/User';
import { CreateRecipe } from './CreateRecipe/CreateRecipe';

export const TopbarComponent = () => <Topbar />;
export const SignRegisterComponent = () => <Form />;
export const MainComponent = () => <Main />;
export const FavoriteComponent = () => <Favorite />;
export const RecipeComponent = () => <Recipe />;
export const UserComponent = () => <User />;
export const CreateRecipeComponent = (props) => <CreateRecipe id={props.id} />;
>>>>>>> cbc6bd0ea9d1566138449a723bf02e1721e95612
