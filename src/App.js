import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import CharacterBuilder from "./components/CharacterBuilder";
import Sandbox from "./components/Sandbox";

const App = () => {
  return (
    // TODO: NEED TO CHOOSE AN APP NAME
    <div id='App' className='antialiased'>
      <Switch>
        <Route path='/' exact component={LandingPage} />
        <Route path='/build' component={CharacterBuilder} />
        <Route path='/sandbox' component={Sandbox} />
        <Redirect to='/' />
      </Switch>
    </div>
  );
};

export default App;
