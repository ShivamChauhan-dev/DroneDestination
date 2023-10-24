import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './EmployeeRegisteration.css';

const EmployeeRegisteration = () => {
  const [formData, setFormData] = useState({
    empCode: '',
    name: '',
    gender: '',
    designation: '',
    department: '',
    dateofjoining: '',
    dateofbirth: '',
    bloodGroup: '',
    email: '',
    contactNo: '',
    emergencyContactNo: '',
    addressCurrent: '',
    addressPermanent: '',
    highestQualification: '',
    aadharNo: '',
    panNo: '',
    uanNo: '',
    medicalInsuranceNo: '',
    esiNo: '',
    rpc: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://125.63.88.27:5000/api/employeedetails', formData);
      console.log('Data submitted successfully.');
      toast.success('Data submitted successfully');

      // Reset the form
      setFormData({
        empCode: '',
        name: '',
        gender: '',
        designation: '',
        department: '',
        dateofjoining: '',
        dateofbirth: '',
        bloodGroup: '',
        email: '',
        contactNo: '',
        emergencyContactNo: '',
        addressCurrent: '',
        addressPermanent: '',
        highestQualification: '',
        aadharNo: '',
        panNo: '',
        uanNo: '',
        medicalInsuranceNo: '',
        esiNo: '',
        rpc: '',
      });
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };


  return (
    <div className='emp-form'>
      <h2>Employee Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="emp-code">
          <label htmlFor="empCode">Employee Code:</label>
          <input
            type="text"
            id="empCode"
            name="empCode"
            value={formData.empCode}
            onChange={handleChange}
            placeholder="Employee Code"
          />
        </div>
        <div className="emp-name">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />
        </div>
        <div className="emp-gender">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="emp-designation">
          <label htmlFor="designation">Designation:</label>
          <input
            type="text"
            id="designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            placeholder="Designation"
          />
        </div>
        <div className="emp-department">
          <label htmlFor="department">Department:</label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Department"
          />
        </div>
        <div className="emp-joiningdate">
          <label htmlFor="doj">Date of Joining:</label>
          <input
            type="date"
            id="dateofjoining"
            name="dateofjoining"
            value={formData.dateofjoining}
            onChange={handleChange}
            placeholder="Date of Joining"
          />
        </div>
        <div className="emp-birthdate">
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dateofbirth"
            name="dateofbirth"
            value={formData.dateofbirth}
            onChange={handleChange}
            placeholder="Date of Birth"
          />
        </div>
        <div className="emp-bloodGroup">
          <label htmlFor="bloodGroup">Blood Group:</label>
          <input
            type="text"
            id="bloodGroup"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            placeholder="Blood Group"
          />
        </div>
        <div className="emp-email">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="@gmail.com"
          />
        </div>
        <div className="emp-contact">
          <label htmlFor="contactNo">Contact No:</label>
          <input
            type="text"
            id="contactNo"
            name="contactNo"
            value={formData.contactNo}
            onChange={handleChange}
            placeholder="Contact No"
          />
        </div>
        <div className="emp-emergencyContactNo">
          <label htmlFor="emergencyContactNo">Emergency Contact No:</label>
          <input
            type="text"
            id="emergencyContactNo"
            name="emergencyContactNo"
            value={formData.emergencyContactNo}
            onChange={handleChange}
            placeholder="Emergency Contact No"
          />
        </div>
        <div className="emp-address">
          <label htmlFor="address">Address [Current]:</label>
          <input
            type="text"
            id="addressCurrent"
            name="addressCurrent"
            value={formData.addressCurrent}
            onChange={handleChange}
            placeholder="Current Address"
          />
        </div>


        <div className="emp-address">
          <label htmlFor="address">Address [Permanent]:</label>
          <input
            type="text"
            id="addressPermanent"
            name="addressPermanent"
            value={formData.addressPermanent}
            onChange={handleChange}
            placeholder="Permanent Address"
          />
        </div>
        <div className="emp-highestQualification">
          <label htmlFor="highestQualification">Highest Qualification:</label>
          <input
            type="text"
            id="highestQualification"
            name="highestQualification"
            value={formData.highestQualification}
            onChange={handleChange}
            placeholder="Highest Qualification"
          />
        </div>
        <div className="emp-aadharNo">
          <label htmlFor="aadharNo">Aadhar No:</label>
          <input
            type="number"
            id="aadharNo"
            name="aadharNo"
            value={formData.aadharNo}
            onChange={handleChange}
            placeholder="Aadhar No"
          />
        </div>
        <div className="emp-pan">
          <label htmlFor="pan">PAN:</label>
          <input
            type="text"
            id="panNo"
            name="panNo"
            value={formData.panNo}
            onChange={handleChange}
            placeholder="PAN"
          />
        </div>
        <div className="emp-uan">
          <label htmlFor="uan">UAN:</label>
          <input
            type="text"
            id="uanNo"
            name="uanNo"
            value={formData.uanNo}
            onChange={handleChange}
            placeholder="UAN"
          />
        </div>
        <div className="emp-medicalInsuranceNo">
          <label htmlFor="medicalInsuranceNo">Medical Insurance No:</label>
          <input
            type="text"
            id="medicalInsuranceNo"
            name="medicalInsuranceNo"
            value={formData.medicalInsuranceNo}
            onChange={handleChange}
            placeholder="Medical Insurance No"
          />
        </div>
        <div className="emp-esiNo">
          <label htmlFor="esiNo">ESI No:</label>
          <input
            type="text"
            id="esiNo"
            name="esiNo"
            value={formData.esiNo}
            onChange={handleChange}
            placeholder="ESI No"
          />
        </div>
        <div className="emp-rpc">
          <label htmlFor="rpc">RPC:</label>
          <input
            type="text"
            id="rpc"
            name="rpc"
            value={formData.rpc}
            onChange={handleChange}
            placeholder="RPC"
          />
        </div>
        {/* Additional Fields */}
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EmployeeRegisteration;