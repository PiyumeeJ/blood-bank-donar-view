import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Footer from './components/Footer';
import Register from './components/pages/Register';
import Account from './components/pages/Account';
import AuthenticationContextProvider from './contexts/AuthenticationContext'

function App() {
  const [state, setstate] = useState(false);

  const handleState = (value) => {
    setstate(value)
  }

  return (
    <>
      <AuthenticationContextProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/sign-in' exact component={Login}/>
            <Route exact path='/sign-in'>
                <Login liftState="sample" />
             </Route>
            <Route path='/sign-up' exact component={Register}/>
            <Route path='/account' exact component={Account}/>
          </Switch>
          <Footer/>
        </Router>
      </AuthenticationContextProvider>
    </>
  );
}

export default App;
