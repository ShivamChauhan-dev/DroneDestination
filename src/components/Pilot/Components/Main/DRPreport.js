import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './DPRreport.css'; // Link the external CSS file

const DPRreport = () => {
  const [personnelData, setPersonnelData] = useState([]);
  const [equipmentData, setEquipmentData] = useState([]);
  const [flightData, setflighttData] = useState([]);
  const [projectNames, setProjectNames] = useState([]);
  const [createdProjectName, setCreatedProjectName] = useState('');
  const [formData, setFormData] = useState({
    project_name: '',
    start_time1: '',
    weather_forecast1: '',
    wind_speed1: '',
    visibility1: '',
    start_time2: '',
    weather_forecast2: '',
    wind_speed2: '',
    visibility2: '',
    equipment: '',
    serial_no: '',
    health_condition: '',
    remarks: '',
    prepared: '',
    checked: '',
    approved: '',
    signature1: '',
    signature2: '',
    signature3: '',
    flight_no: '',
    equipment2: '',
    flight_start_time: '',
    flight_end_time: '',
    remark: '',
    total_work: '',
    total_done: '',
    todays_work: '',
    total_remaining: ''
  });
  const [formData1, setFormData1] = useState({
    name: '',
    designation: '',
    phone: '',
    hours_at_site: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setFormData1((prevData) => ({
      ...prevData,
      [name]: value
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://125.63.88.27:5000/Admin/dpr', formData);
      console.log('DPR inserted successfully.');
      toast.success('DPR inserted successfully.');
      // Reset the form after successful submission
      setFormData({
        project_name: '',
        // name: '',
        // designation: '',   new form 1
        // phone: '',             
        // hours_at_site: '',
        start_time1: '',
        weather_forecast1: '',
        wind_speed1: '',
        visibility1: '',
        start_time2: '',
        weather_forecast2: '',
        wind_speed2: '',
        visibility2: '',
        // equipment: '',
        // serial_no: '',
        // health_condition: '',  new form 2
        // remarks: '',
        prepared: '',
        checked: '',
        approved: '',
        signature1: '',
        signature2: '',
        signature3: '',
        // flight_no: '',
        // equipment2: '',
        // flight_start_time: '',  new form 3
        // flight_end_time: '',
        // remark: '',
        total_work: '',
        total_done: '',
        todays_work: '',
        total_remaining: ''
      });
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };
  const handleSubmit1 = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://125.63.88.27:5000/Admin/dpr', formData1);
      console.log('DPR inserted successfully.');
      toast.success('DPR inserted successfully.');
      // Reset the form after successful submission

      setFormData1({
        name: '',
        designation: '',
        phone: '',
        hours_at_site: '',
      });
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };

  useEffect(() => {
    // Initialize with a default entry when the component mounts
    setPersonnelData([{ name: '', designation: '', phone: '', hoursAtSite: '' }]);
    setEquipmentData([{ equipment: '', serialNumber: '', healthCondition: '', remarks: '' }]);
    setflighttData([{ FlightNo: '', Equipment: '', FlightStartTime: '', FlightEndTime: '', Remark: '' }]);
  }, []);

  const addPersonnel = () => {
    setPersonnelData([...personnelData, { name: '', designation: '', phone: '', hoursAtSite: '' }]);
  };

  const addEquipment = () => {
    setEquipmentData([...equipmentData, { equipment: '', serialNumber: '', healthCondition: '', remarks: '' }]);
  };

  const addFlight = () => {
    setflighttData([...flightData, { FlightNo: '', Equipment: '', FlightStartTime: '', FlightEndTime: '', Remark: '' }]);
  };

  const handlePersonnelChange = (index, field, value) => {
    const updatedPersonnelData = [...personnelData];
    updatedPersonnelData[index][field] = value;
    setPersonnelData(updatedPersonnelData);
  };

  const handleEquipmentChange = (index, field, value) => {
    const updatedEquipmentData = [...equipmentData];
    updatedEquipmentData[index][field] = value;
    setEquipmentData(updatedEquipmentData);
  };

  const handleFlightChange = (index, field, value) => {
    const updatedFlightData = [...flightData];
    updatedFlightData[index][field] = value;
    setflighttData(updatedFlightData);
  };

  return (
    <div className="container">
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
      <form onSubmit={handleSubmit}>
      <form onSubmit={handleSubmit1}>
        <h2 className='headings'>Daily Progress Report</h2>
        {/* Personnel Section */}
        <div className="personnel-section">
          {/* <h3>Personnel Details</h3> */}
          {personnelData.map((personnel, index) => (
            <div key={index} className="personnel-container">
              {index === 0 && (
                <div className="personnel-labels">
                  <label>Name:</label>
                  <label>Designation:</label>
                  <label>Phone:</label>
                  <label>Hours at Site:</label>
                </div>
              )}
              <div className="personnel-inputs">
                <input
                  placeholder="Name"
                  name="name" // Add the name attribute for formData
                  value={personnel.name}
                  onChange={(e) => {
                    handleChange1(e); // Call the 1 function
                    handlePersonnelChange(index, 'name', e.target.value); // Call the handlePersonnelChange function
                  }}
                />
                <input
                  placeholder="Designation"
                  name="designation" // Add the name attribute for formData
                  value={personnel.designation}
                  onChange={(e) => {
                    handleChange1(e); // Call the handleChange function
                    handlePersonnelChange(index, 'designation', e.target.value); // Call the handlePersonnelChange function
                  }}
                />
                <input
                  placeholder="Phone"
                  type='number'
                  name="phone" // Add the name attribute for formData
                  value={personnel.phone}
                  onChange={(e) => {
                    handleChange1(e); // Call the handleChange function
                    handlePersonnelChange(index, 'phone', e.target.value); // Call the handlePersonnelChange function
                  }}
                />

                <input
                  placeholder="Hours at Site"
                  name="hours_at_site" // Add the name attribute for formData
                  value={personnel.hours_at_site}
                  onChange={(e) => {
                    handleChange1(e); // Call the handleChange function
                    handlePersonnelChange(index, 'hours_at_site', e.target.value); // Call the handlePersonnelChange function
                  }}
                />
              </div>
            </div>
          ))}
          <button type="submit" onClick={addPersonnel}>Add</button>
        </div>
      </form>

      {/* Second Table */}
      <div className='second-table'>
        <table>
          <thead>
            <tr>
              <th>Details</th>
              <th>Today</th>
              <th>Next Day</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Start Time</td>
              <td><input type="time" name='start_time1' value={formData.start_time1} onChange={handleChange}></input></td>
              <td><input type="time" name='start_time2' value={formData.start_time2} onChange={handleChange}></input></td>
            </tr>
            <tr>
              <td>Weather Forecast</td>
              <td><input name='weather_forecast1' value={formData.weather_forecast1} onChange={handleChange}></input></td>
              <td><input name='weather_forecast2' value={formData.weather_forecast2} onChange={handleChange}></input></td>
            </tr>
            <tr>
              <td>Wind Speed (in mps)</td>
              <td><input name='wind_speed1' value={formData.wind_speed1} onChange={handleChange}></input></td>
              <td><input name='wind_speed2' value={formData.wind_speed2} onChange={handleChange}></input></td>
            </tr>
            <tr>
              <td>Visibility</td>
              <td><input name='visibility1' value={formData.visibility1} onChange={handleChange}></input></td>
              <td><input name='visibility2' value={formData.visibility2} onChange={handleChange}></input></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Equipment Section */}
      <div className="equipment-section">
        {/* <h3>Equipment Details</h3> */}
        {equipmentData.map((Equipment, index) => (
          <div key={index} className="equipment-container">
            {index === 0 && (
              <div className="equipment-labels">
                <label>Equipment:</label>
                <label>Serial No:</label>
                <label>Health Condition:</label>
                <label>Remarks:</label>
              </div>
            )}
            <div className="equipment-inputs">
              {/* <input
                  placeholder="Equipment"
                  value={equipment.equipment}
                  onChange={(e) => handleEquipmentChange(index, 'equipment', e.target.value)}
                /> */}
              <input
                placeholder="Equipment"
                name="equipment" // Add the name attribute for formData
                value={Equipment.equipment}
                onChange={(e) => {
                  handleChange(e); // Call the handleChange function
                  handleEquipmentChange(index, 'equipment', e.target.value); // Call the handlePersonnelChange function
                }}
              />
              <input
                placeholder="Serial Number"
                name="serial_no" // Add the name attribute for formData
                value={Equipment.serial_no}
                onChange={(e) => {
                  handleChange(e); // Call the handleChange function
                  handleEquipmentChange(index, 'serial_no', e.target.value); // Call the handlePersonnelChange function
                }}
              />
              <input
                placeholder="Health Condition"
                name="health_condition" // Add the name attribute for formData
                value={Equipment.health_condition}
                onChange={(e) => {
                  handleChange(e); // Call the handleChange function
                  handleEquipmentChange(index, 'health_condition', e.target.value); // Call the handlePersonnelChange function
                }}
              />
              <input
                placeholder="Remarks"
                name="remarks" // Add the name attribute for formData
                value={Equipment.remarks}
                onChange={(e) => {
                  handleChange(e); // Call the handleChange function
                  handleEquipmentChange(index, 'remarks', e.target.value); // Call the handlePersonnelChange function
                }}
              />
            </div>
          </div>
        ))}
        <button type="button" onClick={addEquipment}>Add</button>
      </div>
      <div className="signature-section">
        <div className="signature-signature">
          <div className="signature-label">
            <label>Prepared :</label>
          </div>
          <div className="signature-input">
            {/* <input type="text" placeholder="Prepared By" /> */}
            <input
              placeholder="Prepared By" name="prepared"
              value={formData.prepared} onChange={handleChange} />
          </div>
          <div className="signature-label">
            <label>Checked :</label>
          </div>
          <div className="signature-input">
            <input
              placeholder="Checked By" name="checked"
              value={formData.checked} onChange={handleChange} />
          </div>
          <div className="signature-label">
            <label>Approved :</label>
          </div>
          <div className="signature-input">
            <input
              placeholder="Approved By" name="approved"
              value={formData.approved} onChange={handleChange} />
          </div>
        </div>
        <div className="signature-signature">
          <div className="signature-label">
            <label>Signature:</label>
          </div>
          <div className="signature-input">
            <input
              placeholder="Prepared By" name="signature1"
              value={formData.signature1} onChange={handleChange} />
          </div>
          <div className="signature-label">
            <label>Signature:</label>
          </div>
          <div className="signature-input">
            <input
              placeholder="Checked By" name="signature2"
              value={formData.signature2} onChange={handleChange} />
          </div>
          <div className="signature-label">
            <label>Signature:</label>
          </div>
          <div className="signature-input">
            <input
              placeholder="Approved By" name="signature3"
              value={formData.signature3} onChange={handleChange} />
          </div>
        </div>
      </div>
      <div className="flight-section">
        {/* <h3>Personnel Details</h3> */}
        {flightData.map((flight, index) => (
          <div key={index} className="flight-container">
            {index === 0 && (
              <div className="flight-labels">
                <label>Flight No:</label>
                <label>Equipment:</label>
                <label>Flight Start Time:</label>
                <label>Flight End Time:</label>
                <label>Remark:</label>
              </div>
            )}
            <div className="flight-inputs">
              <input
                placeholder="Flight No"
                name='flight_no'
                value={flight.flight_no}
                onChange={(e) => {
                  handleChange(e);
                  handleFlightChange(index, 'flight_no', e.target.value);
                }}
              />
              {/* <input
                  placeholder="Equipment"
                  value={flight.Equipment}
                  onChange={(e) => handleFlightChange(index, 'Equipment', e.target.value)}
                /> */}
              <input
                placeholder="Equipment"
                name='equipment2'
                value={flight.equipment2}
                onChange={(e) => {
                  handleChange(e);
                  handleFlightChange(index, 'equipment2', e.target.value);
                }}
              />
              <input
                type='time'
                placeholder="Flight Start Time"
                name='flight_start_time'
                value={flight.flight_start_time}
                onChange={(e) => {
                  handleChange(e);
                  handleFlightChange(index, 'flight_start_time', e.target.value);
                }}
              />
              <input
                type='time'
                placeholder="Flight End Time"
                name='flight_end_time'
                value={flight.flight_end_time}
                onChange={(e) => {
                  handleChange(e);
                  handleFlightChange(index, 'flight_end_time', e.target.value);
                }}
              />
              <input
                placeholder="Remark"
                name='remark'
                value={flight.remark}
                onChange={(e) => {
                  handleChange(e);
                  handleFlightChange(index, 'remark', e.target.value);
                }}
              />
            </div>
          </div>
        ))}
        <button type="button" onClick={addFlight}>Add</button>
      </div>
      {/* Additional Section */}
      <div className="additional-section">
        <div className="additional-labels">
          <label>Total Work:</label>
          <label>Total Done:</label>
          <label>Today's Work:</label>
          <label>Total Remaining:</label>
        </div>
        <div className="additional-input">
          <input type="text" placeholder="Total Work"
            name='total_work' value={formData.total_work} onChange={handleChange} />
          <input type="text" placeholder="Total Done"
            name='total_done' value={formData.total_done} onChange={handleChange} />
          <input type="text" placeholder="Today's Work"
            name='todays_work' value={formData.todays_work} onChange={handleChange} />
          <input type="text" placeholder="Total Remaining"
            name='total_remaining' value={formData.total_remaining} onChange={handleChange} />
        </div>
      </div>
      <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default DPRreport;






// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import './DPRreport.css'; // Link the external CSS file

// const DPRreport = () => {
//   const [personnelData, setPersonnelData] = useState([]);
//   const [equipmentData, setEquipmentData] = useState([]);
//   const [flightData, setflighttData] = useState([]);
//   const [projectNames, setProjectNames] = useState([]);
//   const [createdProjectName, setCreatedProjectName] = useState('');
//   const [formData, setFormData] = useState({
//     project_name: '',
//     name: '',
//     designation: '',
//     phone: '',
//     hours_at_site: '',
//     start_time1: '',
//     weather_forecast1: '',
//     wind_speed1: '',
//     visibility1: '',
//     start_time2: '',
//     weather_forecast2: '',
//     wind_speed2: '',
//     visibility2: '',
//     equipment: '',
//     serial_no: '',
//     health_condition: '',
//     remarks: '',
//     prepared: '',
//     checked: '',
//     approved: '',
//     signature1: '',
//     signature2: '',
//     signature3: '',
//     flight_no: '',
//     equipment2: '',
//     flight_start_time: '',
//     flight_end_time: '',
//     remark: '',
//     total_work: '',
//     total_done: '',
//     todays_work: '',
//     total_remaining: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const fetchProjectNames = async () => {
//     try {
//       const response = await axios.get('http://125.63.88.27:5000/Admin/projects');
//       setProjectNames(response.data);
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchProjectNames();
//   }, []);

//   const handleProjectSelectChange = (e) => {
//     const selectedProjectName = e.target.value;
//     setCreatedProjectName(selectedProjectName);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://125.63.88.27:5000/Admin/dpr', formData);
//       console.log('DPR inserted successfully.');
//       toast.success('DPR inserted successfully.');
//       // Reset the form after successful submission
//       setFormData({
//         project_name: '',
//         // name: '',
//         // designation: '',   new form 1
//         // phone: '',
//         // hours_at_site: '',
//         start_time1: '',
//         weather_forecast1: '',
//         wind_speed1: '',
//         visibility1: '',
//         start_time2: '',
//         weather_forecast2: '',
//         wind_speed2: '',
//         visibility2: '',
//         // equipment: '',
//         // serial_no: '',
//         // health_condition: '',  new form 2
//         // remarks: '',
//         prepared: '',
//         checked: '',
//         approved: '',
//         signature1: '',
//         signature2: '',
//         signature3: '',
//         // flight_no: '',
//         // equipment2: '',
//         // flight_start_time: '',  new form 3
//          // flight_end_time: '',
//         // remark: '',
//         total_work: '',
//         total_done: '',
//         todays_work: '',
//         total_remaining: ''
//       });
//     } catch (error) {
//       console.error('Error inserting data:', error);
//     }
//   };

//   useEffect(() => {
//     // Initialize with a default entry when the component mounts
//     setPersonnelData([{ name: '', designation: '', phone: '', hoursAtSite: '' }]);
//     setEquipmentData([{ equipment: '', serialNumber: '', healthCondition: '', remarks: '' }]);
//     setflighttData([{ FlightNo: '', Equipment: '', FlightStartTime: '', FlightEndTime: '', Remark: '' }]);
//   }, []);

//   const addPersonnel = () => {
//     setPersonnelData([...personnelData, { name: '', designation: '', phone: '', hoursAtSite: '' }]);
//   };

//   const addEquipment = () => {
//     setEquipmentData([...equipmentData, { equipment: '', serialNumber: '', healthCondition: '', remarks: '' }]);
//   };

//   const addFlight = () => {
//     setflighttData([...flightData, { FlightNo: '', Equipment: '', FlightStartTime: '', FlightEndTime: '', Remark: '' }]);
//   };

//   const handlePersonnelChange = (index, field, value) => {
//     const updatedPersonnelData = [...personnelData];
//     updatedPersonnelData[index][field] = value;
//     setPersonnelData(updatedPersonnelData);
//   };

//   const handleEquipmentChange = (index, field, value) => {
//     const updatedEquipmentData = [...equipmentData];
//     updatedEquipmentData[index][field] = value;
//     setEquipmentData(updatedEquipmentData);
//   };

//   const handleFlightChange = (index, field, value) => {
//     const updatedFlightData = [...flightData];
//     updatedFlightData[index][field] = value;
//     setflighttData(updatedFlightData);
//   };

//   return (
//     <div className="container">
//       <div className="ProjectContainer">
//         <div className="SelectSection">
//           <h2 htmlFor="projectSelect">Select The Project</h2>
//           <select
//             id="projectSelect"
//             value={createdProjectName}
//             onChange={handleProjectSelectChange}
//           >
//             <option value="" disabled>
//               Please Select The Project
//             </option>
//             {projectNames.map((name) => (
//               <option key={name} value={name}>
//                 {name}
//               </option>
//             ))}
//           </select>
//         </div>
//         {createdProjectName && (
//           <div className="Selected-Project">
//             <h2 className="selected-project-title">Selected Project: {createdProjectName}</h2>
//           </div>
//         )}
//       </div>
//       <form onSubmit={handleSubmit}>
//         <h2 className='headings'>Daily Progress Report</h2>
//         {/* Personnel Section */}
//         <div className="personnel-section">
//           {/* <h3>Personnel Details</h3> */}
//           {personnelData.map((personnel, index) => (
//             <div key={index} className="personnel-container">
//               {index === 0 && (
//                 <div className="personnel-labels">
//                   <label>Name:</label>
//                   <label>Designation:</label>
//                   <label>Phone:</label>
//                   <label>Hours at Site:</label>
//                 </div>
//               )}
//               <div className="personnel-inputs">
//                 <input
//                   placeholder="Name"
//                   name="name" // Add the name attribute for formData
//                   value={personnel.name}
//                   onChange={(e) => {
//                     handleChange(e); // Call the handleChange function
//                     handlePersonnelChange(index, 'name', e.target.value); // Call the handlePersonnelChange function
//                   }}
//                 />
//                 <input
//                   placeholder="Designation"
//                   name="designation" // Add the name attribute for formData
//                   value={personnel.designation}
//                   onChange={(e) => {
//                     handleChange(e); // Call the handleChange function
//                     handlePersonnelChange(index, 'designation', e.target.value); // Call the handlePersonnelChange function
//                   }}
//                 />
//                 <input
//                   placeholder="Phone"
//                   type='number'
//                   name="phone" // Add the name attribute for formData
//                   value={personnel.phone}
//                   onChange={(e) => {
//                     handleChange(e); // Call the handleChange function
//                     handlePersonnelChange(index, 'phone', e.target.value); // Call the handlePersonnelChange function
//                   }}
//                 />

//                 <input
//                   placeholder="Hours at Site"
//                   name="hours_at_site" // Add the name attribute for formData
//                   value={personnel.hours_at_site}
//                   onChange={(e) => {
//                     handleChange(e); // Call the handleChange function
//                     handlePersonnelChange(index, 'hours_at_site', e.target.value); // Call the handlePersonnelChange function
//                   }}
//                 />
//               </div>
//             </div>
//           ))}
//           <button type="button"onClick={addPersonnel}>Add</button>
//         </div>

//         {/* Second Table */}
//         <div className='second-table'>
//           <table>
//             <thead>
//               <tr>
//                 <th>Details</th>
//                 <th>Today</th>
//                 <th>Next Day</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>Start Time</td>
//                 <td><input type="time" name='start_time1' value={formData.start_time1} onChange={handleChange}></input></td>
//                 <td><input type="time" name='start_time2' value={formData.start_time2} onChange={handleChange}></input></td>
//               </tr>
//               <tr>
//                 <td>Weather Forecast</td>
//                 <td><input name='weather_forecast1' value={formData.weather_forecast1} onChange={handleChange}></input></td>
//                 <td><input name='weather_forecast2' value={formData.weather_forecast2} onChange={handleChange}></input></td>
//               </tr>
//               <tr>
//                 <td>Wind Speed (in mps)</td>
//                 <td><input name='wind_speed1' value={formData.wind_speed1} onChange={handleChange}></input></td>
//                 <td><input name='wind_speed2' value={formData.wind_speed2} onChange={handleChange}></input></td>
//               </tr>
//               <tr>
//                 <td>Visibility</td>
//                 <td><input name='visibility1' value={formData.visibility1} onChange={handleChange}></input></td>
//                 <td><input name='visibility2' value={formData.visibility2} onChange={handleChange}></input></td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         {/* Equipment Section */}
//         <div className="equipment-section">
//           {/* <h3>Equipment Details</h3> */}
//           {equipmentData.map((Equipment, index) => (
//             <div key={index} className="equipment-container">
//               {index === 0 && (
//                 <div className="equipment-labels">
//                   <label>Equipment:</label>
//                   <label>Serial No:</label>
//                   <label>Health Condition:</label>
//                   <label>Remarks:</label>
//                 </div>
//               )}
//               <div className="equipment-inputs">
//                 {/* <input
//                   placeholder="Equipment"
//                   value={equipment.equipment}
//                   onChange={(e) => handleEquipmentChange(index, 'equipment', e.target.value)}
//                 /> */}
//                 <input
//                   placeholder="Equipment"
//                   name="equipment" // Add the name attribute for formData
//                   value={Equipment.equipment}
//                   onChange={(e) => {
//                     handleChange(e); // Call the handleChange function
//                     handleEquipmentChange(index, 'equipment', e.target.value); // Call the handlePersonnelChange function
//                   }}
//                 />
//                 <input
//                   placeholder="Serial Number"
//                   name="serial_no" // Add the name attribute for formData
//                   value={Equipment.serial_no}
//                   onChange={(e) => {
//                     handleChange(e); // Call the handleChange function
//                     handleEquipmentChange(index, 'serial_no', e.target.value); // Call the handlePersonnelChange function
//                   }}
//                 />
//                 <input
//                   placeholder="Health Condition"
//                   name="health_condition" // Add the name attribute for formData
//                   value={Equipment.health_condition}
//                   onChange={(e) => {
//                     handleChange(e); // Call the handleChange function
//                     handleEquipmentChange(index, 'health_condition', e.target.value); // Call the handlePersonnelChange function
//                   }}
//                 />
//                 <input
//                   placeholder="Remarks"
//                   name="remarks" // Add the name attribute for formData
//                   value={Equipment.remarks}
//                   onChange={(e) => {
//                     handleChange(e); // Call the handleChange function
//                     handleEquipmentChange(index, 'remarks', e.target.value); // Call the handlePersonnelChange function
//                   }}
//                 />
//               </div>
//             </div>
//           ))}
//           <button type="button" onClick={addEquipment}>Add</button>
//         </div>
//         <div className="signature-section">
//           <div className="signature-signature">
//             <div className="signature-label">
//               <label>Prepared :</label>
//             </div>
//             <div className="signature-input">
//               {/* <input type="text" placeholder="Prepared By" /> */}
//               <input
//                 placeholder="Prepared By" name="prepared"
//                 value={formData.prepared} onChange={handleChange} />
//             </div>
//             <div className="signature-label">
//               <label>Checked :</label>
//             </div>
//             <div className="signature-input">
//               <input
//                 placeholder="Checked By" name="checked"
//                 value={formData.checked} onChange={handleChange} />
//             </div>
//             <div className="signature-label">
//               <label>Approved :</label>
//             </div>
//             <div className="signature-input">
//               <input
//                 placeholder="Approved By" name="approved"
//                 value={formData.approved} onChange={handleChange} />
//             </div>
//           </div>
//           <div className="signature-signature">
//             <div className="signature-label">
//               <label>Signature:</label>
//             </div>
//             <div className="signature-input">
//               <input
//                 placeholder="Prepared By" name="signature1"
//                 value={formData.signature1} onChange={handleChange} />
//             </div>
//             <div className="signature-label">
//               <label>Signature:</label>
//             </div>
//             <div className="signature-input">
//               <input
//                 placeholder="Checked By" name="signature2"
//                 value={formData.signature2} onChange={handleChange} />
//             </div>
//             <div className="signature-label">
//               <label>Signature:</label>
//             </div>
//             <div className="signature-input">
//               <input
//                 placeholder="Approved By" name="signature3"
//                 value={formData.signature3} onChange={handleChange} />
//             </div>
//           </div>
//         </div>
//         <div className="flight-section">
//           {/* <h3>Personnel Details</h3> */}
//           {flightData.map((flight, index) => (
//             <div key={index} className="flight-container">
//               {index === 0 && (
//                 <div className="flight-labels">
//                   <label>Flight No:</label>
//                   <label>Equipment:</label>
//                   <label>Flight Start Time:</label>
//                   <label>Flight End Time:</label>
//                   <label>Remark:</label>
//                 </div>
//               )}
//               <div className="flight-inputs">
//                 <input
//                   placeholder="Flight No"
//                   name='flight_no'
//                   value={flight.flight_no}
//                   onChange={(e) => {
//                     handleChange(e);
//                     handleFlightChange(index, 'flight_no', e.target.value);
//                   }}
//                 />
//                 {/* <input
//                   placeholder="Equipment"
//                   value={flight.Equipment}
//                   onChange={(e) => handleFlightChange(index, 'Equipment', e.target.value)}
//                 /> */}
//                 <input
//                   placeholder="Equipment"
//                   name='equipment2'
//                   value={flight.equipment2}
//                   onChange={(e) => {
//                     handleChange(e);
//                     handleFlightChange(index, 'equipment2', e.target.value);
//                   }}
//                 />
//                 <input
//                   type='time'
//                   placeholder="Flight Start Time"
//                   name='flight_start_time'
//                   value={flight.flight_start_time}
//                   onChange={(e) => {
//                     handleChange(e);
//                     handleFlightChange(index, 'flight_start_time', e.target.value);
//                   }}
//                 />
//                 <input
//                   type='time'
//                   placeholder="Flight End Time"
//                   name='flight_end_time'
//                   value={flight.flight_end_time}
//                   onChange={(e) => {
//                     handleChange(e);
//                     handleFlightChange(index, 'flight_end_time', e.target.value);
//                   }}
//                 />
//                 <input
//                   placeholder="Remark"
//                   name='remark'
//                   value={flight.remark}
//                   onChange={(e) => {
//                     handleChange(e);
//                     handleFlightChange(index, 'remark', e.target.value);
//                   }}
//                 />
//               </div>
//             </div>
//           ))}
//           <button type="button"onClick={addFlight}>Add</button>
//         </div>
//         {/* Additional Section */}
//         <div className="additional-section">
//           <div className="additional-labels">
//             <label>Total Work:</label>
//             <label>Total Done:</label>
//             <label>Today's Work:</label>
//             <label>Total Remaining:</label>
//           </div>
//           <div className="additional-input">
//             <input type="text" placeholder="Total Work"
//               name='total_work' value={formData.total_work} onChange={handleChange} />
//             <input type="text" placeholder="Total Done"
//               name='total_done' value={formData.total_done} onChange={handleChange} />
//             <input type="text" placeholder="Today's Work"
//               name='todays_work' value={formData.todays_work} onChange={handleChange} />
//             <input type="text" placeholder="Total Remaining"
//               name='total_remaining' value={formData.total_remaining} onChange={handleChange} />
//           </div>
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };
// export default DPRreport;