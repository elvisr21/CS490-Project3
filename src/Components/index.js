import { Topbar } from './Topbar/Topbar';
import Form from './SignRegister/Form';
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
