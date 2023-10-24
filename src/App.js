import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/Admin/AdminDashboard";
import MobilizationSummary from "./components/User/Components/Main/MobilizationSummary";
import DPRReports from "./components/User/Components/Main/DPR";
import ListOfProject from "./components/Admin/Components/Main/ProjectList";
import SelectProject from "./components/Admin/Components/Main/SelectProject"; // Commented out to remove the unused import.
import PilotDashboard from "./components/Pilot/PilotDashboard";
import EditExistingProjects from "./components/Admin/Components/Main/EditProjects";
import PilotProject from "./components/Pilot/Components/Main/PilotProject";
import ClientDashboard from "./components/Client/ClientDashboard";
import CoPilotDashboard from "./components/Co-Pilot/Co-PilotDashboard";
import ProgressTeamDashboard from "./components/ProgressTeam/ProgressTeamDashboard";
import NewProject from "./components/Admin/Components/Main/NewProject";
import CheckList from "./components/Pilot/Components/Main/CheckList";
import IndentForm from "./components/Admin/Components/Main/IndentForm";
import CurrentInventory from "./components/Admin/Components/Main/CurrentInventory";
import RepairList from "./components/Admin/Components/Main/RepairList";
import ItemShipment from "./components/Admin/Components/Main/ItemShipment"; 
import EmployeeRegisteration from "./components/Admin/Components/EmployeeRegisteration";
import EmployeeStatus from "./components/Admin/Components/EmployeeStatus";
import Tender from "./components/Admin/Components/Main/TenderDetails";
import SecondDPR from "./components/Pilot/Components/Main/2ndDRP";
import Attendence from "./components/Pilot/Components/Main/Attendence";
// Userdashboard Components

function App() {
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://125.63.88.27:5000/authentication/verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <Login setAuth={setAuth} />
              )
            }
          />
          <Route
            path="/register"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <Register setAuth={setAuth} />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard setAuth={setAuth} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/admindashboard/*"
            element={isAuthenticated ? <AdminDashboard setAuth={setAuth} /> : <Navigate to="/login" />}
          />
          {/* <Route
            path="/userdashboard/*"
            element={isAuthenticated ? <UserDashboard setAuth={setAuth} /> : <Navigate to="/login" />}
          /> */}
          <Route
            path="/pilotdashboard/*"
            element={isAuthenticated ? <PilotDashboard setAuth={setAuth} /> : <Navigate to="/login" />}
          />
          <Route
            path="/clientdashboard/*"
            element={isAuthenticated ? <ClientDashboard setAuth={setAuth} /> : <Navigate to="/login" />}
          />
          <Route
            path="/copilotdashboard/*"
            element={isAuthenticated ? <CoPilotDashboard setAuth={setAuth} /> : <Navigate to="/login" />}
          />
          <Route
            path="/progressingdashboard/*"
            element={isAuthenticated ? <ProgressTeamDashboard setAuth={setAuth} /> : <Navigate to="/login" />}
          />
         
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/mobilizationsummary" element={<MobilizationSummary />} />
          <Route path="/DPR" element={<DPRReports />} />
          <Route path="/List of projects" element={<ListOfProject setAuth={setAuth} />} />
          <Route path="/Select Project" element={<SelectProject setAuth={setAuth} />} />
          <Route path="/edit-projects" element={<EditExistingProjects setAuth={setAuth}/>}/>
          <Route path="/Pilot selected project" element={<PilotProject setAuth={setAuth}/>}/>
          <Route path="/New Project" element={<NewProject setAuth={setAuth}/>}/>
          <Route path="/Inventory Status" element={<CheckList setAuth={setAuth}/>}/>
          <Route path="/Generate Indent" element={<IndentForm setAuth={setAuth}/>}/>
          <Route path="/Current Inventory" element={<CurrentInventory setAuth={setAuth}/>}/>
          <Route path="/Repair List" element={<RepairList setAuth={setAuth}/>}/>
          <Route path="/Item Shipment" element={<ItemShipment setAuth={setAuth}/>}/>
          <Route path="/EmployeeRegisteration" element={<EmployeeRegisteration setAuth={setAuth}/>}/>
          <Route path="/EmployeeStatus" element={<EmployeeStatus setAuth={setAuth}/>}/>
          <Route path="/Tender Details" element={<Tender setAuth={setAuth}/>}/>
          <Route path="/DPR Report" element={<SecondDPR setAuth={setAuth}/>}/>
          <Route path="/attendence" element={<Attendence setAuth={setAuth}/>}/>
          
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </Fragment>
  );
}

export default App;
