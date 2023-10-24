import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './DPRreport.css';

const SecondDPR = () => {
  const [submittedData, setSubmittedData] = useState([]);
  const [createdProjectName, setCreatedProjectName] = useState('');
  const [projectNames, setProjectNames] = useState([]);
  const [formData1, setFormData1] = useState({
    project_name: '', // Initialize with an empty string
    name: '',
    designation: '',
    phone: '',
    hours_at_site: '',
  });

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/pilot/dpr1', formData1);
      console.log('DPR inserted successfully.');
      toast.success('DPR inserted successfully.');

      // Add the submitted data to the state for rendering in the table
      setSubmittedData([...submittedData, formData1]);

      // Reset the form after successful submission
      setFormData1({
        project_name: createdProjectName, // Set project_name to createdProjectName
        name: '',
        designation: '',
        phone: '',
        hours_at_site: '',
      });
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };

  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setFormData1((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchProjectNames = async () => {
    try {
      const response = await axios.get('http://localhost:5000/Admin/projects');
      setProjectNames(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchProjectNames();
  }, []);

  const handleProjectSelectChange = (e) => {
    const selectedProjectName = e.target.value;
    setCreatedProjectName(selectedProjectName);

    // Also update the project_name in formData1 when the user selects a project
    setFormData1((prevData) => ({
      ...prevData,
      project_name: selectedProjectName,
    }));
  };

  return (
    <div className='container'>
      <div className="ProjectContainer">
        <div className="SelectSection">
          <h2 htmlFor="projectSelect">Select The Project</h2>
          <select
            id="projectSelect"
            value={createdProjectName}
            onChange={handleProjectSelectChange}
          >
            <option value="" disabled>
              Please Select The Project
            </option>
            {projectNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        {createdProjectName && (
          <div className="Selected-Project">
            <h2 className="selected-project-title">Selected Project: {createdProjectName}</h2>
          </div>
        )}
      </div>
      <div className="personnel-container">
        <form onSubmit={handleSubmit1}>
          <div className="personnel-labels">
            <label>Name:</label>
            <label>Designation:</label>
            <label>Phone:</label>
            <label>Hours at Site:</label>
          </div>
          <div className="personnel-inputs">
            <input type="text" placeholder="Enter Name" name='name' value={formData1.name} onChange={handleChange1} />
            <input type="text" placeholder="Enter Designation" name='designation' value={formData1.designation} onChange={handleChange1} />
            <input type="number" placeholder="Enter Phone" name='phone' value={formData1.phone} onChange={handleChange1} />
            <input type="number" placeholder="Enter Hours at Site" name='hours_at_site' value={formData1.hours_at_site} onChange={handleChange1} />
          </div>
          <button type='submit'>Submit</button>
        </form>
        
        {/* Conditionally render the table if there is submitted data */}
        {submittedData.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Designation</th>
                <th>Phone</th>
                <th>Hours at Site</th>
              </tr>
            </thead>
            <tbody>
              {submittedData.map((data, index) => (
                <tr key={index}>
                  <td>{data.name}</td>
                  <td>{data.designation}</td>
                  <td>{data.phone}</td>
                  <td>{data.hours_at_site}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SecondDPR;