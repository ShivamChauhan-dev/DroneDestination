// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// import Header from "./Components/Header"


// const AdminDashboard = ({ setAuth }) => {
//     const [name, setName] = useState("");
//     const [role, setRole] = useState("");

//   const navigate = useNavigate();

//   const getProfile = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/dashboard/", {
//         method: "POST",
//         headers: { token: localStorage.token }
//       });

//       const parseData = await res.json();
//       setName(parseData.user_name);
//       setRole(parseData.user_role);
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   const logout = async (e) => {
//     e.preventDefault();
//     try {
//       localStorage.removeItem("token");
//       setAuth(false);
//       toast.success("Logout successfully");
//       navigate("/login");
//     } catch (err) {
//       console.error(err.message);
//     }
//   };
//   useEffect(() => {
//     getProfile();
//   }, []);

//   return (
//     <>
//       <header>
//         <h1>{role} {name}</h1>
//         <button onClick={(e) => logout(e)} className="btn btn-primary">
//         Logout
//       </button>
//       </header>
//     </>
//   );
// };

// export default AdminDashboard;

import React from "react";
import ADMINHEADER from "./Components/AdminHeader";
import Profiles from "./Components/Main/MainPage";



const AdminDashboard = ({setAuth}) => {
 return(
  <div>
  <ADMINHEADER setAuth={setAuth}/>
  <Profiles/>
  </div>
);
};
export default AdminDashboard;




// import React, { useState } from 'react';
// import './Part2nd.css';

// const Part2nd = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isSubDropdownOpen, setIsSubDropdownOpen] = useState(false);
//   const [isProjectListOpen, setIsProjectListOpen] = useState(false);


//   const toggleDropdown = () => {
//     setIsDropdownOpen((prevState) => !prevState);
//   };

//   const handleMouseEnter = () => {
//     setIsDropdownOpen(true);
//   };

//   const handleMouseLeave = () => {
//     setIsDropdownOpen(false);
//     setIsSubDropdownOpen(false);
//   };

//   const toggleSubDropdown = () => {
//     setIsSubDropdownOpen((prevState) => !prevState);
//   };

//   const closeSubDropdown = () => {
//     setIsSubDropdownOpen(false);
//   };

//   return (
//     <div className="part-container">
//       <h1 className="part-heading">Admin Access</h1>
//       <div className="part-navbar">
//         <ul className="part-list">
//           <li
//             onClick={toggleDropdown}
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//           >
//             Project
//             {isDropdownOpen && (
//               <div className="DropDown">
//                 <ul>
//                   <li
//                     onClick={toggleSubDropdown}
//                     onMouseEnter={toggleSubDropdown}
//                     onMouseLeave={closeSubDropdown}
//                   >
//                     Create New Project
//                     {isSubDropdownOpen && (
//                       <div className="Sub-DropDown" onMouseLeave={closeSubDropdown}>
//                         <ul>
//                           <li>Replicate existing project</li>
//                           <li><a href="/SelectingFields">Select Fields</a></li>
//                         </ul>
//                       </div>
//                     )}
//                   </li>
//                   <li
//                     onMouseEnter={() => setIsProjectListOpen(true)}
//                     onMouseLeave={() => setIsProjectListOpen(false)}
//                   >
//                     Overview existing project
//                     {isProjectListOpen && (
//                       <ul className="sub-list">
//                         <li><a href="/List of projects">List of projects</a></li>
//                       </ul>
//                     )}
//                   </li>

//                   <li>Edit Existing projects</li>
//                   <li>Add/delete user access</li>
//                 </ul>
//               </div>
//             )}
//           </li>
//           <li>Manpower</li>
//           <li>Inventory</li>
//           <li>SOP</li>
//           <li>Attendance</li>
//           <li>Vehicle</li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Part2nd;
