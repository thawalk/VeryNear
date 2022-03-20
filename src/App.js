import 'regenerator-runtime/runtime'
import React, { useState } from 'react';
import Navbar from './components/navbar/Navbar';
import { Home, Create, Mint } from './pages'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import './index.css';

export default function App({ contract, currentUser, nearConfig, wallet }) {

  const [showOptions, setShowOptions] = useState(false);

  const login = () => {
    wallet.requestSignIn(
      {contractId: nearConfig.contractName},
      'NEAR David Test',
      null,
      null
    )
  }
  
  const logout = () => {
    wallet.signOut();
    window.location.replace(window.location.origin + window.location.pathname)
  }
  
  return (
    <div className='App'>
      <Router>
        <div className='brown__bg'>
          <Navbar currentUser={currentUser} showOptions={showOptions} showOptionsFunc={setShowOptions} login={login} logout={logout} />
        </div>

        <Switch>
          <Route path="/" exact><Home showOptions={showOptions} currentUser={currentUser} showOptionsFunc={setShowOptions} login={login} /></Route>
          <Route path="/create"><Create currentUser={currentUser} /></Route>
          <Route path="/mint/monkeyBusiness"><Mint currentUser={currentUser} login={login} contract={contract} wallet={wallet} logout={logout}/></Route>
        </Switch>
      </Router>
    </div>
  )
};