import React from "react";
import PILOTHEADER from "./Components/PilotHeader";
import FrontPage from "./Components/Main/FrontPage";
// import ADMINHEADER from "./Components/AdminHeader";
// import Profiles from "./Components/Main/MainPage";



const PilotDashboard = ({setAuth}) => {
 return(
  <div>
  {/* <ADMINHEADER setAuth={setAuth}/>
  <Profiles/> */}
  <PILOTHEADER setAuth={setAuth}/>
  <FrontPage/>
  </div>
);
};
export default PilotDashboard;