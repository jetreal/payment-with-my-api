import React from 'react';
import './App.sass';
import { Route, Switch, HashRouter } from 'react-router-dom';
import LoginContainer from './components/pages/Login/LoginContainer';

import ContainerRegister from './components/pages/Register/ContainerRegister';
import MainContainer from './components/pages/Main/MainContainer';

function App() {

  return (
    <HashRouter>
      <div className="App">
        <Switch>
          <Route path='/' exact
            render={() => <MainContainer />} />

          <Route path='/login'
            render={() => <LoginContainer />} />

          <Route path='/register'
            render={() => <ContainerRegister />} />
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
