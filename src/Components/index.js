import {Topbar} from './Topbar/Topbar';
import {SignRegister} from './SignRegister/SignRegister';
import {Main} from './Main/Main';
import {Favorite} from './Favorite/Favorite'


export const TopbarComponent=()=>{
    return <Topbar/>
}
export const SignRegisterComponent=()=>{
    return <SignRegister/>
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