import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './DPRreport.css';

const SecondDPR = () => {
  const [submittedData, setSubmittedData] = useState([]);
  const [submittedData2, setSubmittedData2] = useState([]);
  const [submittedData3, setSubmittedData3] = useState([]);
  const [createdProjectName, setCreatedProjectName] = useState('');
  const [projectNames, setProjectNames] = useState([]);
  const [formData, setFormData] = useState({
    project_name: '',
    date: '',
    start_time1: '',
    weather_forecast1: '',
    wind_speed1: '',
    visibility1: '',
    prepared: '',
    signature1: '',
    total_work: '',
    total_done: '',
    todays_work: '',
    total_remaining: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentDate = new Date().toISOString().split('T')[0];
      await axios.post('http://125.63.88.27:5000/Pilot/dpr',  {
        ...formData,
        date: currentDate,
      });
      console.log('DPR inserted successfully.');
      toast.success('DPR inserted successfully.');
      // Reset the form after successful submission
      setFormData({
        project_name: createdProjectName,
        date: '',
        start_time1: '',
        weather_forecast1: '',
        wind_speed1: '',
        visibility1: '',
        prepared: '',
        signature1: '',
        total_work: '',
        total_done: '',
        todays_work: '',
        total_remaining: ''
      });
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };




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
      await axios.post('http://125.63.88.27:5000/pilot/dpr1', formData1);
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

  const [formData2, setFormData2] = useState({
    project_name: '',
    equipment: '',
    serial_no: '',
    health_condition: '',
    remarks: '',
  });
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://125.63.88.27:5000/pilot/dpr2', formData2);
      console.log('DPR2 inserted successfully.');
      toast.success('DPR2 inserted successfully.');

      // Add the submitted data to the state for rendering in the table
      setSubmittedData2([...submittedData2, formData2]);

      // Reset the form after successful submission
      setFormData2({
        project_name: createdProjectName, // Set project_name to createdProjectName
        equipment: '',
        serial_no: '',
        health_condition: '',
        remarks: '',
      });
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };
  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setFormData2((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [formData3, setFormData3] = useState({
    project_name: '',
    flight_no: '',
    equipment2: '',
    flight_start_time: '',
    flight_end_time: '',
    remark: '',
  });
  const handleSubmit3 = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://125.63.88.27:5000/pilot/dpr3', formData3);
      console.log('DPR3 inserted successfully.');
      toast.success('DPR3 inserted successfully.');

      // Add the submitted data to the state for rendering in the table
      setSubmittedData3([...submittedData3, formData3]);

      // Reset the form after successful submission
      setFormData3({
        project_name: createdProjectName, // Set project_name to createdProjectName
        flight_no: '',
        equipment2: '',
        flight_start_time: '',
        flight_end_time: '',
        remark: '',
      });
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };
  const handleChange3 = (e) => {
    const { name, value } = e.target;
    setFormData3((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchProjectNames = async () => {
    try {
      const response = await axios.get('http://125.63.88.27:5000/Admin/projects');
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

   
    setFormData((prevData) => ({
      ...prevData,
      project_name: selectedProjectName,
    }));

    setFormData1((prevData) => ({
      ...prevData,
      project_name: selectedProjectName,
    }));

    setFormData2((prevData) => ({
      ...prevData,
      project_name: selectedProjectName,
    }));

    setFormData3((prevData) => ({
      ...prevData,
      project_name: selectedProjectName,
    }));
  };

  return (
    <div className='container'>
    {/* <div className="current-date">Date: {day} {month} {year}</div> */}
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
            <input type="text" placeholder=" Name" name='name' value={formData1.name} onChange={handleChange1} />
            <input type="text" placeholder=" Designation" name='designation' value={formData1.designation} onChange={handleChange1} />
            <input type="number" placeholder=" Phone" name='phone' value={formData1.phone} onChange={handleChange1} />
            <input type="number" placeholder=" Hours at Site" name='hours_at_site' value={formData1.hours_at_site} onChange={handleChange1} />
          </div>
          <button className="submitted-button" type='submit'>Add</button>
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
      <div className='second-table'>
          <form onSubmit={handleSubmit}>

            <table>
              <thead>
                <tr>
                  <th>Details</th>
                  <th>Today</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Start Time</td>
                  <td><input type="time" name='start_time1' value={formData.start_time1} onChange={handleChange}></input></td>
                </tr>
                <tr>
                  <td>Weather Forecast</td>
                  <td><input name='weather_forecast1' value={formData.weather_forecast1} onChange={handleChange}></input></td>
                </tr>
                <tr>
                  <td>Wind Speed (in mps)</td>
                  <td><input name='wind_speed1' value={formData.wind_speed1} onChange={handleChange}></input></td>
                </tr>
                <tr>
                  <td>Visibility</td>
                  <td><input name='visibility1' value={formData.visibility1} onChange={handleChange}></input></td>
                </tr>
              </tbody>
            </table>

            </form>
          </div>

      <div className='equipment-section'>
        <form onSubmit={handleSubmit2}>
          <div className="equipment-labels">
            <label>Equipment:</label>
            <label>Serial No:</label>
            <label>Health <br /> Condition:</label>
            <label>Remarks:</label>
          </div>
          <div className="personnel-inputs">
            <input type="text" placeholder=" Equipment" name='equipment' value={formData2.equipment} onChange={handleChange2} />
            <input type="number" placeholder=" Serial No." name='serial_no' value={formData2.serial_no} onChange={handleChange2} />
            <input type="text" placeholder=" Health Condition" name='health_condition' value={formData2.health_condition} onChange={handleChange2} />
            <input type="text" placeholder=" Remarks" name='remarks' value={formData2.remarks} onChange={handleChange2} />
          </div>
          <button className="submitted-button" type='submit'>Add</button>
        </form>
        {submittedData2.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Equipment</th>
                <th>Serial No</th>
                <th>Health Condition</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {submittedData2.map((data, index) => (
                <tr key={index}>
                  <td>{data.equipment}</td>
                  <td>{data.serial_no}</td>
                  <td>{data.health_condition}</td>
                  <td>{data.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className='signature-section'>
            <form onSubmit={handleSubmit}>
            <div className='signature-signature'>
              <div className='signature-label'><label>Prepared :</label></div>
              <div className="signature-input">
                <input placeholder="Prepared By" name="prepared" value={formData.prepared} onChange={handleChange} />
              </div>
            </div>
            <div className='signature-signature'>
              <div className='signature-label'><label>Signature :</label></div>
              <div className="signature-input">
                <input placeholder="Prepared By" name="signature1" value={formData.signature1} onChange={handleChange} />
              </div>
            </div>
            </form>
          </div>


      <div className='flight-section'>
        <form onSubmit={handleSubmit3}>
          <div className="flight-labels">
            <label>Flight No:</label>
            <label>Equipment:</label>
            <label>Flight <br />Start Time:</label>
            <label>Flight <br />End Time:</label>
            <label>Remark:</label>
          </div>
          <div className='flight-inputs'>
            <input type="text" placeholder="Flight No." name='flight_no' value={formData3.flight_no} onChange={handleChange3} />
            <input type="text" placeholder="Equipment" name='equipment2' value={formData3.equipment2} onChange={handleChange3} />
            <input type="time" placeholder="Flight Start Time" name='flight_start_time' value={formData3.flight_start_time} onChange={handleChange3} />
            <input type="time" placeholder="Flight End Time" name='flight_end_time' value={formData3.flight_end_time} onChange={handleChange3} />
            <input type="text" placeholder="Remark" name='remark' value={formData3.remark} onChange={handleChange3} />
          </div>
          <button className="submitted-button" type='submit'>Add</button>
        </form>
        {submittedData3.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Flight No:</th>
                <th>Equipment:</th>
                <th>Flight Start Time:</th>
                <th>Flight End Time:</th>
                <th>Remark:</th>
              </tr>
            </thead>
            <tbody>
              {submittedData3.map((data, index) => (
                <tr key={index}>
                  <td>{data.flight_no}</td>
                  <td>{data.equipment2}</td>
                  <td>{data.flight_start_time}</td>
                  <td>{data.flight_end_time}</td>
                  <td>{data.remark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div>
          

          

          <div className="additional-section">
            <form onSubmit={handleSubmit}>
            <div className="additional-labels">
              <label>Total Work:</label>
              <label>Total Done:</label>
              <label>Today's Work:</label>
              <label>Total Remaining:</label>
            </div>
            <div className="additional-input">
              <input type="text" placeholder="Total Work" name='total_work' value={formData.total_work} onChange={handleChange} />
              <input type="text" placeholder="Total Done" name='total_done' value={formData.total_done} onChange={handleChange} />
              <input type="text" placeholder="Today's Work" name='todays_work' value={formData.todays_work} onChange={handleChange} />
              <input type="text" placeholder="Total Remaining" name='total_remaining' value={formData.total_remaining} onChange={handleChange} />
            </div>
            <button className="submitted-button" type='submit'>Submit</button>
            </form>
          </div>
          {/* <button className="submitted-button" type='submit'>Submit</button> */}

        {/* </form> */}
      </div>

    </div>
  );
};

export default SecondDPR;