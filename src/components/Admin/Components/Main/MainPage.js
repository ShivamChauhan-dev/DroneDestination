import React from 'react';
import './MainPage.css';

function Profiles() {
  return (
    <div className="bg">
      {/* <h1>Admin Access</h1> */}
      <nav className="Admin">
        <ul className="Nav-List">
          <li>
            <h5 >Project</h5>
            <ul className="Dropdown">
              <li>
                <a href="/New Project">Create New Project</a>
                <ul className="Sub-Dropdown">
                  <li><a href="/Select & Create Project">Create Project </a></li>
                  <li><a href="/Select Project">Existing Project</a></li>
                </ul>
              </li>
              <li>
                <a href="/Existing Projects">Overview Existing Projects</a>
                <ul className="Sub-Dropdown">
                  <li><a href="/List of projects">List of Projects</a></li>
                </ul>
              </li>
              <li><a href="/edit-projects">Edit Existing Projects</a></li>
              <li><a href="/user-access">Add/Delete User Access</a></li>
            </ul>
          </li>
          <li><h5>Manpower</h5></li>
          <li><h5>Inventory</h5>
          <ul className="Dropdown">
            <li><a href="/Current Inventory">Current Inventory</a></li>
              <li><a href="/Repair List">Repair List</a></li>
              <li><a href="/Item Shipment">Item Shipment</a></li>
              <li><a href="/Generate Indent">Generate Indent</a></li>
              </ul></li>
          <li><h5>SOP</h5></li>
          <li><h5><a href="/attendence">Attendance</a></h5></li>
          <li><h5>Vehicle</h5></li>
          <li><h5>Tender</h5>
          <ul className="Dropdown">
            <li><a href="/Tender Details">Tender Details</a></li>
            </ul></li>
        </ul>
      </nav>
    </div>
  );
}

export default Profiles;
