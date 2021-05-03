import React from 'react';
import PropTypes from 'prop-types';
import { Topbar } from './Topbar/Topbar';
import Form from './SignRegister/Form';
import { Main } from './Main/Main';
import { Favorite } from './Favorite/Favorite';
import Recipe from './Recipe/Recipe';
import { User } from './User/User';
import CreateRecipe from './CreateRecipe/CreateRecipe';
import { useState } from 'react';

export const TopbarComponent: React.FunctionComponent = (props) => {
  const { id } = props;
  return <Topbar id={id} />;
};
TopbarComponent.propTypes = {
  id: PropTypes.number.isRequired,
};
export const SignRegisterComponent: React.FunctionComponent = (props) => {
  return <Form setSigned={props.setSigned} />;
};
  
export const MainComponent: React.FunctionComponent = () => <Main />;
export const FavoriteComponent: React.FunctionComponent = () => <Favorite />;
export const RecipeComponent: React.FunctionComponent = ({id}) => <Recipe id={id}/>;
export const UserComponent: React.FunctionComponent = () => <User />;
export const CreateRecipeComponent: React.FunctionComponent = (props) => {
  const { id } = props;
  return <CreateRecipe id={id} />;
};
CreateRecipeComponent.propTypes = {
  id: PropTypes.number.isRequired,
};
