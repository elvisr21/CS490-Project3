import { render, screen } from '@testing-library/react';
import { CreateRecipe } from './CreateRecipe.js';

test('renders create recipe page', () => {
  render(<CreateRecipe />);
  const img = screen.getByText('Image_URL:');
  const name = screen.getByText('Recipe Name:');
  const description = screen.getByText('Description:');
  const Cuisine = screen.getByText('Cuisine:');
  const Ingredients = screen.getByText('Ingredients:');
  const IngredientName = screen.getByText('Ingredients Name:');
  const IngredientAmount = screen.getByText('Ingredients Amount:');

  expect(img).toBeInTheDocument();
  expect(name).toBeInTheDocument();
  expect(description).toBeInTheDocument();
  expect(Cuisine).toBeInTheDocument();
  expect(Ingredients).toBeInTheDocument();
  expect(IngredientName).toBeInTheDocument();
  expect(IngredientAmount).toBeInTheDocument();
});
