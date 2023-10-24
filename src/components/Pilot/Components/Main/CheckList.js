
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CheckList.css';

const CheckList = () => {
    const [beforeTakeOffChecked, setBeforeTakeOffChecked] = useState(false);
    const [afterTakeOffChecked, setAfterTakeOffChecked] = useState(false);
    const [afterLandingChecked, setAfterLandingChecked] = useState(false);

    const handleBeforeTakeOffChange = () => {
        setBeforeTakeOffChecked(!beforeTakeOffChecked);
        setAfterTakeOffChecked(false);
        setAfterLandingChecked(false);
    };

    const handleAfterTakeOffChange = () => {
        setAfterTakeOffChecked(!afterTakeOffChecked);
        setBeforeTakeOffChecked(false);
        setAfterLandingChecked(false);
    };

    const handleAfterLandingChange = () => {
        setAfterLandingChecked(!afterLandingChecked);
        setBeforeTakeOffChecked(false);
        setAfterTakeOffChecked(false);
    };

    return (
        <div className="checklist-container">
            <h2>Checklist</h2>

            <div className="checklist-item">
                <label>
                    <input
                        type="checkbox"
                        checked={beforeTakeOffChecked}
                        onChange={handleBeforeTakeOffChange}
                    />
                    Before take-off
                </label>
            </div>

            {beforeTakeOffChecked && (
                <ul>

                    <li>PPE Kits: Gloves/ Vest/ Shoes/ Goggles</li>
                    <li>Aircraft Airworthiness: Motors/ Propellers/ landing Gear/ Arms/ calibration/ Nozzle/ Rc communication</li>
                    <li>Battery Voltage:</li>
                    <li>Kml file and mission Planning, (confirm the area with the farmer)</li>
                    <li>Obstacles and collision avoidance sensors</li>
                    <li>Any terrain or obstacles in the area</li>
                </ul>
            )}

            <div className="checklist-item">
                <label>
                    <input
                        type="checkbox"
                        checked={afterTakeOffChecked}
                        onChange={handleAfterTakeOffChange}
                    />
                    After take-off
                </label>
            </div>

            {afterTakeOffChecked && (
                <ul>
                    <li>Battery monitoring</li>
                    <li>Co-pilot to monitor the drone</li>
                    <li>Pilot to monitor drone in the GCS while flying</li>
                    <li>Any obstacle or hinderances</li>
                    <li>Photos during spray: 2 in each flight</li>
                </ul>
            )}

            <div className="checklist-item">
                <label>
                    <input
                        type="checkbox"
                        checked={afterLandingChecked}
                        onChange={handleAfterLandingChange}
                    />
                    After Landing
                </label>
            </div>
            {afterLandingChecked && (
                <ul>
                    <li>Check the battery voltage</li>
                    <li>Check the arms</li>
                    <li>Check the nozzle</li>
                    <li>Charge the batteries</li>
                    <li>Refill the tank if needed</li>
                </ul>
            )}
            <Link to="/DPR Report">
                <button className="NextButton"> Next </button>
            </Link>
        </div>
    );
};

export default CheckList;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import './CheckList.css';

// const CheckList = () => {
//     const [checklistItems, setChecklistItems] = useState({
//         beforeTakeOffChecked: false,
//         afterTakeOffChecked: false,
//         afterLandingChecked: false,
//     });
//     const [checklist, setChecklist] = useState([]);
//     const [formData, setFormData] = useState({
//       project_name: '',
//       Before_takeoff: '',
//       After_takeoff: '',
//       After_Landing: '',
//     });
  
//     useEffect(() => {
//       fetch('/checklist')
//         .then((response) => response.json())
//         .then((data) => setChecklist(data))
//         .catch((error) => console.error('Error fetching data:', error));
//     }, []);
  
//     const handleChange = (e) => {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//     };
  
//     const handleSubmit = async (e) => {
//       e.preventDefault();
  
//       await axios.post('http://localhost:5000/Admin/checklist', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           setChecklist([...checklist, data]);
//           setFormData({
//             project_name: '',
//             Before_takeoff: '',
//             After_takeoff: '',
//             After_Landing: '',
//           });
//           console.log("All checked")
//         })
//         .catch((error) => console.error('Error creating checklist entry:', error));
//     };

//     const handleCheckboxChange = (itemName) => {
//         setChecklistItems((prevState) => ({
//             ...prevState,
//             [itemName]: !prevState[itemName],
//         }));
//     };

//     return (
//         <div className="checklist-container">
//             <h2>Checklist</h2>
//         <form onSubmit={handleSubmit}>
//             <div className="checklist-item">
//                 <label>
//                     <input
//                         type="checkbox"
//                         name='Before_takeoff'
//                         checked={checklistItems.beforeTakeOffChecked}
//                         value={formData.Before_takeoff}
//                         onChange={() => handleCheckboxChange('beforeTakeOffChecked')}
//                     />
//                     Before take-off
//                 </label>
//             </div>

//             {checklistItems.beforeTakeOffChecked && (
//                 <ul>
//                     <li>PPE Kits: Gloves/ Vest/ Shoes/ Goggles</li>
//                     <li>Aircraft Airworthiness: Motors/ Propellers/ landing Gear/ Arms/ calibration/ Nozzle/ Rc communication</li>
//                     <li>Battery Voltage:</li>
//                     <li>Kml file and mission Planning, (confirm the area with the farmer)</li>
//                     <li>Obstacles and collision avoidance sensors</li>
//                     <li>Any terrain or obstacles in the area</li>
//                 </ul>
//             )}

//             <div className="checklist-item">
//                 <label>
//                     <input
//                         type="checkbox"
//                         name='After_takeoff'
//                         checked={checklistItems.afterTakeOffChecked}
//                         value={formData.After_takeoff}
//                         onChange={() => handleCheckboxChange('afterTakeOffChecked')}
//                     />
//                     After take-off
//                 </label>
//             </div>

//             {checklistItems.afterTakeOffChecked && (
//                 <ul>
//                     <li>Battery monitoring</li>
//                     <li>Co-pilot to monitor the drone</li>
//                     <li>Pilot to monitor drone in the GCS while flying</li>
//                     <li>Any obstacle or hinderances</li>
//                     <li>Photos during spray: 2 in each flight</li>
//                 </ul>
//             )}

//             <div className="checklist-item">
//                 <label>
//                     <input
//                         type="checkbox"
//                         name='After_Landing'
//                         checked={checklistItems.afterLandingChecked}
//                         value={formData.After_Landing}
//                         onChange={() => handleCheckboxChange('afterLandingChecked')}
//                     />
//                     After Landing
//                 </label>
//             </div>

//             {checklistItems.afterLandingChecked && (
//                 <ul>
//                     <li>Check the battery voltage</li>
//                     <li>Check the arms</li>
//                     <li>Check the nozzle</li>
//                     <li>Charge the batteries</li>
//                     <li>Refill the tank if needed</li>
//                 </ul>
//             )}
//             </form>

//             <Link to="/DPR Report">
//                 <button type='submit' className="NextButton"> Next </button>
//             </Link>
//         </div>
//     );
// };

// export default CheckList;


