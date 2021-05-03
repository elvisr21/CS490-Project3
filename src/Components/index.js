import React from 'react';
import PropTypes from 'prop-types';
import { Topbar } from './Topbar/Topbar';
import Form from './SignRegister/Form';
import { Main } from './Main/Main';
import { Favorite } from './Favorite/Favorite';
import Recipe from './Recipe/Recipe';
import { User } from './User/User';
import CreateRecipe from './CreateRecipe/CreateRecipe';

export const TopbarComponent: React.FunctionComponent = (props) => {
  const { id } = props;
  return <Topbar id={id} />;
};
TopbarComponent.propTypes = {
  id: PropTypes.number.isRequired,
};
export const SignRegisterComponent: React.FunctionComponent = ({ setSigned }) => (
  <Form setSigned={setSigned} />
);
SignRegisterComponent.propTypes = {
  setSigned: PropTypes.func.isRequired,
};
export const MainComponent: React.FunctionComponent = () => <Main />;
export const FavoriteComponent: React.FunctionComponent = () => <Favorite />;
export const RecipeComponent: React.FunctionComponent = ({ id }) => <Recipe userId={id} />;
RecipeComponent.propTypes = {
  id: PropTypes.number.isRequired,
};
export const UserComponent: React.FunctionComponent = () => <User />;
export const CreateRecipeComponent: React.FunctionComponent = (props) => {
  const { id } = props;
  return <CreateRecipe id={id} />;
};
CreateRecipeComponent.propTypes = {
  id: PropTypes.number.isRequired,
};
