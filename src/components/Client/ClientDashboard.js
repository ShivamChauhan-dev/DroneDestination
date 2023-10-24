import React from "react";
import CLIENTHEADER from "./Components/ClientHeader";
import ClientNav from "./Components/Main/ClientNav";

const ClientDashboard = ({setAuth}) => {
 return(
  <div>
  <CLIENTHEADER setAuth={setAuth}/>
  <ClientNav/>
  </div>
);
};
export default ClientDashboard;