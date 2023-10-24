import React, { useState } from 'react';
import './EmployeeStatus.css';

const EmployeeStatus = () => {
    const [employeeId, setEmployeeId] = useState('');
    const [employeeData, setEmployeeData] = useState(null);

    const handleEmployeeIdChange = (e) => {
        setEmployeeId(e.target.value);
    };
    const formatDateString = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };
      
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Fetch employee details from your Express.js backend
            const response = await fetch(`http://125.63.88.27:5000/Admin/employeedetails/${employeeId}`);
            if (response.ok) {
                const data = await response.json();
                setEmployeeData(data);
            } else {
                setEmployeeData(null);
                alert('Employee not found');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while fetching data');
        }
    };

    return (
        <div className="employee-status-container">
            <h2 className="employee-status-heading">Check Employee Status</h2>
            <form className="employee-status-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="label" htmlFor="employeeId">Employee ID</label>
                    <input
                        type="text"
                        id="employeeId"
                        name="employeeId"
                        value={employeeId}
                        onChange={handleEmployeeIdChange}
                        required
                        className="input-field"
                    />
                </div>
                <button type="submit" className="submit-button">Search</button>
            </form>
            {employeeData && (
                <div className="employee-details-container">
                    <h3 className="employee-details-heading">Employee Details</h3>
                    <p >Employee ID: {employeeData.empcode}</p>
                    <p >Name: {employeeData.name}</p>
                    <p >Designation: {employeeData.designation}</p>
                    <p >Contact No.: {employeeData.contactno}</p>
                    <p >Date of Birth: {formatDateString(employeeData.dob)}</p>
                    <p >Date of Joining: {formatDateString(employeeData.doj)}</p>
                    <p >Blood Group: {employeeData.bloodgroup}</p>
                    <p >Gender: {employeeData.gender}</p>
                    <p >Highest Qualification: {employeeData.highestqualification}</p>
                    <p >Emergency Contact No.: {employeeData.emergencycontactno}</p>
                    <p >Medical Insurance : {employeeData.medicalinsuranceno}</p>
                    <p >ESI No.: {employeeData.esino}</p>
                    <p >UAN No.: {employeeData.uanno}</p>
                    <p >PAN No.: {employeeData.panno}</p>
                    <p >Aadhar No.: {employeeData.aadharno}</p>
                    <p >RPC: {employeeData.rpc}</p>
                </div>
            )}
        </div>
    );
};

export default EmployeeStatus;


