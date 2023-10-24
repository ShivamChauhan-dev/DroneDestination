import React from "react";
// import CLIENTHEADER from "./Components/ProgressTeamHeader";
// import ClientNav from "./Components/Main/ClientNav";
import PROGRESSHEADER from "./Components/ProgressTeamHeader";
import ProgressTeam from "./Components/Main/ProgressTeamNav";

const ProgressTeamDashboard = ({setAuth}) => {
 return(
  <div>
  {/* <CLIENTHEADER setAuth={setAuth}/> */}
  <PROGRESSHEADER setAuth={setAuth}/>
  <ProgressTeam/>
  {/* <ClientNav/> */}
  </div>
);
};
export default ProgressTeamDashboard;