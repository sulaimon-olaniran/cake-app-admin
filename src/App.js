import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { auth } from './services/Firebase'
import './App.css';
import FormikAddCakes from './components/addcakes/AddCakes';
import NavBar from './components/nav/NavBar';
import FormikAddCupCakes from './components/addcupcakes/AddCupCakes';
import AuthPage from './components/home/AuthPage';
//import FormikAuthPage from './components/home/AuthPage';

function App() {
  const [loggedIn, setLoggedIn] = useState()
  auth.onAuthStateChanged(user => {
    user ? setLoggedIn(true) : setLoggedIn(false)
})
  return (
    <div className="App">
      <Router>
        < NavBar loggedIn ={loggedIn} />
        <Route exact path="/" component={() => <AuthPage loggedIn={loggedIn} /> } /> 
        <Route exact path="/addcakes" component={FormikAddCakes} />
        <Route exact path="/addcupcakes" component={FormikAddCupCakes} /> 
      </Router>
    </div>
  );
}

export default App;
