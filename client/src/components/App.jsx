import React, { useContext } from 'react';
import axios from 'axios';
import { Router, Route, Redirect } from "react-router-dom";
import UserProvider from "../contexts/UserProvider.jsx";

const App = () => {
  const userData = useContext(UserProvider.context);

  if (Object.keys(userData).length) {
    return (<Redirect to='/pages/profile'/>);
  }

  return (
    <div className="app-container">
      Looks like you are not logged in!
      <div className="button-container">
        <a className="" href='./auth/google'>Login using Google+</a>
      </div>
    </div>
  )
}

export default App;