import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { useState } from 'react';
import {
  TopbarComponent,
  SignRegisterComponent,
  MainComponent,
  FavoriteComponent,
  RecipeComponent,
  UserComponent,
  CreateRecipeComponent,
} from './Components';

function App(): React.FunctionComponent {
  const [User, setSigned] = useState({
    isUser: false,
    id: -1,
  }); // used to store the logged in user's unique id and to check if user logged in successfully
  console.log(User.id);
  return (
    <Router>
      <TopbarComponent id={User.id} />
      <Switch>
        <Route path="/" exact component={MainComponent} />
        <Route
          path="/signRegister"
          exact
          component={() => <SignRegisterComponent setSigned={setSigned} />}
        />
        <Route path="/favorite" exact component={FavoriteComponent} />
        <Route path="/recipe/:RecipeID" exact component={RecipeComponent} />
        <Route path="/profile/:UserID" exact component={UserComponent} />
        <Route
          path="/createRecipe"
          exact
          component={() => <CreateRecipeComponent id={User.id} />}
        />
      </Switch>
    </Router>
  );
}

export default App;
