import './App.css';
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom'
import React, { useState } from 'react';
import {TopbarComponent,SignRegisterComponent,MainComponent,FavoriteComponent, RecipeComponent} from './Components'
function App() {
  const [Signed,setSigned] = useState(true)
  return (
    <Router>
        {Signed && <TopbarComponent/>}
        <Switch>
            <Route path="/" exact component={MainComponent}/>
            <Route path="/signRegister" exact component={SignRegisterComponent}/>
            <Route path="/favorite" exact component={FavoriteComponent}/>
            <Route path="/recipe/:RecipeID" exact component={RecipeComponent} />
        </Switch>
    </Router>
  );
}

export default App;
