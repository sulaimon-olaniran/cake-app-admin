import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { auth } from './services/Firebase'
import './App.css';
import FormikAddCakes from './components/addcakes/AddCakes';
import NavBar from './components/nav/NavBar';
import AddCupCakes from './components/addcupcakes/AddCupCakes';
import AuthPage from './components/home/AuthPage';
//import FormikAuthPage from './components/home/AuthPage';

function App() {
  const [loggedIn, setLoggedIn] = useState()
  const [isAuth, setIsAuth] = useState(true)

  useEffect(() => {
    authUser().then((user) => {
      setIsAuth(false)

    }, (error) => {
      setIsAuth(false)
      console.log(error);
    });
  }, [])

  const authUser = () => {
    return new Promise(function (resolve, reject) {
      auth.onAuthStateChanged(user => {
        if (user) {
          resolve(user)
          setLoggedIn(true)
        }
        else {
          setLoggedIn(false)
        }
        reject("not logged in")
      })
    })
  }

  if (isAuth) return null
  else {
    return (
      <div className="App">
        <Router>
          <NavBar loggedIn={loggedIn} />
          <Route exact path="/" component={() => <AuthPage loggedIn={loggedIn} />} />
          <Route exact path="/addcakes" component={() => <FormikAddCakes loggedIn={loggedIn} />} />
          <Route exact path="/addcupcakes" component={() => <AddCupCakes loggedIn={loggedIn} />} />

        </Router>
      </div>
    )
  }
}

export default App;
