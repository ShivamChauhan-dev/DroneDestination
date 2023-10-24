import React from 'react';
import "./css/userdashboard.css";
import Header from './Components/Header';
import ComprehenciveReport from './Components/Main/ComprehenciveReport';


const UserDashboard = ({setAuth}) => {
  return (
    <div>
      <Header setAuth={setAuth}/>
      <ComprehenciveReport/>
    </div>
  );
};

export default UserDashboard;
