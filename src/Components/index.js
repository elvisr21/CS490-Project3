import React from 'react';
import PropTypes from 'prop-types';
import { Topbar } from './Topbar/Topbar';
import Form from './SignRegister/Form';
import { Main } from './Main/Main';
import { Favorite } from './Favorite/Favorite';
import { Recipe } from './Recipe/Recipe';
import { User } from './User/User';
import { CreateRecipe } from './CreateRecipe/CreateRecipe';

export const TopbarComponent: React.FunctionComponent = (props) => () => <Topbar id={props.id} />;
export const SignRegisterComponent = (props) => <Form />;
export const MainComponent = (props) => <Main />;
export const FavoriteComponent = (props) => <Favorite />;
export const RecipeComponent = (props) => <Recipe />;
export const UserComponent = (props) => <User />;
export const CreateRecipeComponent = (props) => <CreateRecipe id={props.id} />;
