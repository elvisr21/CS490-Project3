import {Topbar} from './Topbar/Topbar';
import {UseForm} from './SignRegister/UseForm';
import {Main} from './Main/Main';
import {Favorite} from './Favorite/Favorite';
import {Recipe} from './Recipe/Recipe';


export const TopbarComponent=()=>{
    return <Topbar/>
}
export const SignRegisterComponent=()=>{
    return <UseForm/>
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