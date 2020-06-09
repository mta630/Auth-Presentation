import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { Router, Route, Redirect } from "react-router-dom";
import UserProvider from "../contexts/UserProvider.jsx";

const Profile = () => {
  const userData = useContext(UserProvider.context);

  useEffect(() => {
    console.log(userData);
  }, [])


  if (!Object.keys(userData).length) {
    return (<Redirect to='/'/>);
  }

  return (
    <div className="profile-container">
      <div>
        Congratulations <span>{userData.displayName}</span> you are now logged in using your google account with the email <span>{userData.emails[0].value}</span>
      </div>
      <div className='pc'><img src={userData.photos[0].value}></img></div>
    </div>
  )
}

export default Profile;