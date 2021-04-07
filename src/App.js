import './App.css';
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom'
import React, { useState } from 'react';
import {TopbarComponent,SignRegisterComponent,MainComponent,FavoriteComponent} from './Components'
function App() {
  const [Signed,setSigned] = useState(true)
  return (
    <Router>
        {Signed && <TopbarComponent/>}
        <Switch>
            <Route path="/" exact component={MainComponent}/>
            <Route path="/signRegister" exact component={SignRegisterComponent}/>
            <Route path="/favorite" exact component={FavoriteComponent}/>
        </Switch>
    </Router>
  );
}

export default App;
