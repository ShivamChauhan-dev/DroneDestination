import React from "react";
// import CLIENTHEADER from "./Components/ClientHeader";
// import ClientNav from "./Components/Main/ClientNav";
import COPILOTHEADER from "./Components/Co-PilotHeader";
import CoPilotNav from "./Components/Main/Co-PilotNav";

const CoPilotDashboard = ({setAuth}) => {
 return(
  <div>
  {/* <CLIENTHEADER setAuth={setAuth}/> */}
  {/* <ClientNav/> */}
  <COPILOTHEADER setAuth={setAuth}/>
  <CoPilotNav/>
  </div>
);
};
export default CoPilotDashboard;