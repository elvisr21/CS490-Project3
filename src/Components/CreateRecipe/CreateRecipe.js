import React from 'react';
import './CreateRecipe.css';
import axios from 'axios';
import PropTypes from 'prop-types';

window.onload = () => {
  const instructionWarning = document.getElementById('instructionWarning');
  const ingredientWarning = document.getElementById('instructionWarning');
};

const CreateRecipeForm: React.FunctionComponent = (props) => {
  const FormItem = ({ type, message, value, control }) => (
    <div className="FormItem">
      {type !== 'submit' && (
        <label htmlFor={control}>
          {message}
          <input type={type} placeholder={value} id={control} required />
        </label>
      )}

      {type === 'submit' && <input type={type} placeholder={value} id={control} />}
    </div>
  );
  FormItem.propTypes = {
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    control: PropTypes.string.isRequired,
  };
  const OptionItem: React.FunctionComponent = ({ message }) => {
    const OptionItemItem = ({ value, item }) => <option value={value}>{item}</option>;
    OptionItemItem.propTypes = {
      item: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    };

    return (
      <div className="OptionItem">
        <label htmlFor="select">{message}</label>
        <select id="select">
          <OptionItemItem value="Chinese" item="Chinese" />
          <OptionItemItem value="Japanese" item="Japanese" />
          <OptionItemItem value="Italian" item="Italian" />
          <OptionItemItem value="American" item="American" />
          <OptionItemItem value="Australian" item="Australian" />
        </select>
      </div>
    );
  };
  OptionItem.propTypes = {
    message: PropTypes.string.isRequired,
  };
  const Ingredients: React.FunctionComponent = () => {
    const addIngredient = (e) => {
      e.preventDefault();
      const ingredient = document.getElementById('ingredient_name');
      const ingredients = Array.from(document.getElementById('IngredientItems').children);
      for (let i = 0; i < ingredients.length; i += 1) {
        const name = ingredients[i].children[0].value;
        if (name === ingredient.value) {
          /* eslint-disable no-alert */
          alert('Duplicate Ingredient Detected');
          /* eslint-enable no-alert */
          return;
        }
      }
      if (ingredientWarning.innerHTML != '') {
        ingredientWarning.innerHTML = '';
      }

      const amount = document.getElementById('ingredient_amount');
      const container = document.getElementById('IngredientItems');
      const div = document.createElement('div');
      div.classList.add('Ingredient');

      const IngredientName = document.createElement('INPUT');

      IngredientName.classList.add('Ingredient_Name');
      IngredientName.setAttribute('type', 'text');
      IngredientName.setAttribute('value', ingredient.value);
      IngredientName.readOnly = true;
      IngredientName.onclick = () => {
        IngredientName.readOnly = !IngredientName.readOnly;
      };
      const IngredientAmount = document.createElement('INPUT');

      IngredientAmount.classList.add('Ingredient_Amount');
      IngredientAmount.setAttribute('type', 'text');
      IngredientAmount.setAttribute('value', amount.value);
      IngredientAmount.readOnly = true;
      IngredientAmount.onClick = () => {
        IngredientAmount.readOnly = !IngredientAmount.readOnly;
      };

      div.appendChild(IngredientName);
      div.appendChild(IngredientAmount);
      container.appendChild(div);
    };
    return (
      <div className="Ingredients">
        <h2>List the ingredients</h2>
        <label htmlFor="ingredient_name">
          Ingredients Name: <input type="text" id="ingredient_name" placeholder="test" /> <br />
        </label>
        <label htmlFor="ingredient_amount">
          Ingredients Amount: <input type="text" id="ingredient_amount" placeholder="5" /> <br />
        </label>
        <button type="button" onClick={addIngredient}>
          Add Ingredient
        </button>
        <div id="ingredientWarning" />
        <div className="IngredientItems" id="IngredientItems" />
      </div>
    );
  };
  const Instructions: React.FunctionComponent = () => {
    const addInstructions = (e) => {
      e.preventDefault();
      if (instructionWarning.innerHTML != '') {
        instructionWarning.innerHTML = '';
      }

      const instruction = document.getElementById('instruction');
      const container = document.getElementById('InstructionItems');
      const div = document.createElement('div');
      div.classList.add('Instruction');
      const newInstruction = document.createElement('INPUT');

      newInstruction.classList.add('Ingredient_Name');
      newInstruction.setAttribute('type', 'text');
      newInstruction.setAttribute('value', instruction.value);
      newInstruction.readOnly = true;
      newInstruction.onclick = () => {
        newInstruction.readOnly = !newInstruction.readOnly;
      };
      div.appendChild(newInstruction);
      container.appendChild(div);
    };
    return (
      <div className="Instructions">
        <label htmlFor="Instructions">
          Instructions: <input type="text" id="instruction" placeholder="test" /> <br />
        </label>
        <br />
        <button type="button" onClick={addInstructions}>
          Add Instruction
        </button>
        <div id="instructionWarning" />
        <div className="InstructionItems" id="InstructionItems" />
      </div>
    );
  };

  const { func } = props;
  const { children } = props;
  return (
    <form className="CreateRecipeForm" onSubmit={func}>
      {children}
      <FormItem type="input" message="Image_URL: " value="file_Url" control="file_url" />
      <FormItem type="input" message="Recipe Name: " value="name" control="recipe_name" />
      <FormItem type="input" message="Description: " value="description" control="description" />
      <OptionItem message="Cuisine: " />
      <Ingredients />
      <Instructions />
      <FormItem type="submit" value="Submit Recipe" control="submit" />
    </form>
  );
};
CreateRecipeForm.propTypes = {
  children: PropTypes.node.isRequired,
  func: PropTypes.func.isRequired,
};

const CreateRecipe: React.FunctionComponent = ({ id }) => {
  const sendRecipe: React.FunctionComponent = (e) => {
    e.preventDefault();
    const ingredients = Array.from(document.getElementById('IngredientItems').children);
    const instructions = Array.from(document.getElementById('InstructionItems').children);

    const data = {
      id,
      image: e.target[0].value,
      name: e.target[1].value,
      description: e.target[2].value,
      cuisine: e.target[3].value,
      Ingredients: [],
      Instructions: [],
    };
    console.log(data);
    ingredients.forEach((ingredient, index) => {
      const name = ingredient.children[0].value;
      const amount = ingredient.children[1].value;
      data.Ingredients[index] = {
        name,
        amount,
      };
    });
    instructions.forEach((ingredient, index) => {
      const name = ingredient.children[0].value;
      data.Instructions[index] = name;
    });
    if (ingredients.length > 0 && instructions.length > 0) {
      axios.post('/AddRecipe', data);
    } else {
      instructionWarning.innerHTML = 'Atleast one Instruction needed';
      ingredientWarning.innerHTML = 'Atleast one Ingredient needed';
    }
  };
  return (
    <div className="CreateRecipe">
      <CreateRecipeForm func={sendRecipe} />
    </div>
  );
};
CreateRecipe.propTypes = {
  id: PropTypes.number.isRequired,
};
export default CreateRecipe;
