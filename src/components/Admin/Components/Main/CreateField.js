import React, { useState, useEffect } from 'react';
import './CreateField.css'; // Replace with the correct path to your CSS file

const Fields = () => {
  const [showCreateFieldForm, setShowCreateFieldForm] = useState(false);
  const [fieldsData, setFieldsData] = useState([]);
  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldType, setNewFieldType] = useState('');

  const handleCreateFieldClick = () => {
    setShowCreateFieldForm(true);
  };

  const handleCreateFieldFormSubmit = (e) => {
    e.preventDefault();
    const newField = { name: newFieldName, type: newFieldType };
    setFieldsData((prevFieldsData) => [...prevFieldsData, newField]);
    setNewFieldName('');
    setNewFieldType('');
  };

  const handleDeleteField = (index) => {
    const updatedFieldsData = [...fieldsData];
    updatedFieldsData.splice(index, 1);
    setFieldsData(updatedFieldsData); // If you are using React hooks and managing state, otherwise update your variable accordingly
  };

  const handleMediaQueryChange = (mq) => {
    if (mq.matches) {
      document.querySelectorAll('.FormTable td').forEach((td) => {
        td.classList.add('SmallDevice');
      });
    } else {
      document.querySelectorAll('.FormTable td').forEach((td) => {
        td.classList.remove('SmallDevice');
      });
    }
  };

  useEffect(() => {  
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    handleMediaQueryChange(mediaQuery); // Call the function on initial load
    mediaQuery.addListener(handleMediaQueryChange); // Add listener for changes
    return () => mediaQuery.removeListener(handleMediaQueryChange); // Clean up the listener on component unmount
  }, []);


  return (
    <div className="FieldsContainer">
      <h2>Selecting Fields</h2>
      <table className="FieldsTable">
        <tbody>
          <tr>
            <td>
              {/* <label htmlFor="alphaNumericInput">Project Name:</label> */}
              <input
                type="text"
                id="alphaNumericInput"
                name="alphaNumericInput"
                placeholder="Enter Project Name Here................"
                className="smallInput" // Add this className for styling
              />
              {/* </td></tr><tr><td> */}
              <button type="submit">GO</button>
            </td>
          </tr>
          <tr>
            <td>
              <button type="button">Select Existing Field</button>
              <button type="button" onClick={handleCreateFieldClick}>
                Create New Field
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      {/* Conditional rendering for the Create Field Form */}
      {showCreateFieldForm && (
        <form className="CreateFieldForm" onSubmit={handleCreateFieldFormSubmit}>
          <label htmlFor="fieldName">Enter Field Name:</label>
          <input
            type="text"
            id="fieldName"
            name="fieldName"
            placeholder="Field Name"
            value={newFieldName}
            onChange={(e) => setNewFieldName(e.target.value)}
            required
          />
          <label htmlFor="dataType">Select Data Type:</label>
          <select
            id="dataType"
            name="dataType"
            value={newFieldType}
            onChange={(e) => setNewFieldType(e.target.value)}
            required
          >
            <option value="">Select Data Type</option>
            <option value="text">Text</option>
            <option value="number">Integer</option>
            <option value="date">Date</option>
            <option value="boolean">Boolean</option>
            <option value="email">Email</option>
            <option value="dropdown">Dropdown</option>
            <option value="radio">Radio Buttons</option>
            <option value="checkbox">Checkbox</option>
            <option value="time">Time</option>
            {/* Add other data type options as needed */}
          </select>
          <button type="submit">Create Field</button>
          <button
            type="clear"
            onClick={() => {
              setNewFieldName('');
              setNewFieldType('');
            }}
          >Clear</button>
        </form>
      )}

      {/* Table format preview */}
      {fieldsData.length > 0 && (
        <div className="TablePreview">
          <h2>Table Preview:</h2>
          <table>
            <thead>
              <tr>
                <th>Field Name</th>
                <th>Data Type</th>
                <th>Action</th> 
              </tr>
            </thead>
            <tbody>
              {fieldsData.map((field, index) => (
                <tr key={index}>
                  <td>{field.name}</td>
                  <td>{field.type}</td>
                  <td>
                    <button className="DeleteButton" onClick={() => handleDeleteField(index)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Form format preview */}
      {fieldsData.length > 0 && (
        <div className="FormPreview">
          <h2>Form Preview:</h2>
          <div className="FormTable">
          <table>
              <tbody>
            {fieldsData.map((field, index) => (
              <tr key={index}>
                <td>{field.name}</td>
                {/* <label htmlFor={field.name}>{field.name}:</label> */}
                <td><input type={field.type} id={field.name} name={field.name} /></td>
              </tr>
            ))}
            </tbody>
            </table>
            </div>
        </div>
      )}
    </div>
  );
};

export default Fields;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './CreateField.css'; // Replace with the correct path to your CSS file
// import { toast } from 'react-toastify';

// const Fields = () => {
//   const [showCreateFieldForm, setShowCreateFieldForm] = useState(false);
//   const [fieldsData, setFieldsData] = useState([]);
//   const [renamingIndex, setRenamingIndex] = useState(-1); // -1 means no field is currently being renamed
//   const [newFieldName, setNewFieldName] = useState('');
//   const [newDataType, setNewDataType] = useState('');
//   const [newFieldType, setNewFieldType] = useState('');
//   const [projectNames, setProjectNames] = useState([]);
//   const [projectName, setProjectName] = useState('');
//   const [createdProjectName, setCreatedProjectName] = useState('');

//   // Function to fetch project names
//   const fetchProjectNames = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/Admin/projects');
//       setProjectNames(response.data);
//     } catch (error) {
//       console.error(error.message);
//       // Handle error (show an error message or other actions)
//     }
//   };

//   // Fetch project names when the component mounts
//   useEffect(() => {
//     fetchProjectNames();
//   }, []);

//   // CREATE PROJECT
//   const createProject = async () => {
//     try {
//       const response = await axios.post('http://localhost:5000/Admin/projects', {
//         project_name: projectName,
//       });
//       console.log(response.data.message);
//       toast.success(`Project ${projectName} created successfully`);

//       // Update the project names after successful project creation
//       setProjectNames(response.data.projectNames);

//       // Store the created project name in the state
//       setCreatedProjectName(projectName);

//       // Clear the projectName input after project creation
//       setProjectName('');

//       // Fetch the created project data (fields) after successful project creation
//       fetchFieldsForProject(projectName);
//     } catch (error) {
//       toast.error(`Project ${projectName} already exist`)
//       console.error(error);
//     }
//   };

//   // Function to fetch all fields for a specific project
//   const fetchFieldsForProject = async (projectName) => {
//     try {
//       const response = await axios.get(`http://localhost:5000/Admin/fields/${projectName}`);
//       setFieldsData(response.data);
//     } catch (error) {
//       console.error(error.message);
//       // Handle error (show an error message or other actions)
//     }
//   };

//   // Function to handle project selection change
//   // const handleProjectSelectChange = (e) => {
//   //   const selectedProjectName = e.target.value;
//   //   setCreatedProjectName(selectedProjectName);
//   //   fetchFieldsForProject(selectedProjectName);
//   // };

//   const handleCreateFieldClick = () => {
//     setShowCreateFieldForm(true);
//   };

//   const handleCreateFieldFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Send a request to create a new field
//       const response = await axios.post('http://localhost:5000/Admin/fields', {
//         project_name: createdProjectName,
//         field_name: newFieldName,
//         data_type: newFieldType,
//       });

//       const newField = response.data;
//       setFieldsData((prevFieldsData) => [...prevFieldsData, newField]);
//       setNewFieldName('');
//       setNewFieldType('');
//       toast.success(`Field ${newFieldName} created successfully`)
//     } catch (error) {
//       console.error(error.message);
//       toast.error(`Field ${newFieldName} already exist`)
//     }
//   };


//   const handleDeleteField = async (index) => {
//     try {
//       // Send a request to delete the field
//       const fieldToDelete = fieldsData[index];
//       await axios.delete('http://localhost:5000/Admin/fields/delete', {
//         data: {
//           project_name: createdProjectName,
//           field_name: fieldToDelete.column_name, // Use 'column_name' instead of 'name'
//         },
//       });

//       // Update the state after successful deletion
//       const updatedFieldsData = fieldsData.filter((_, i) => i !== index);
//       setFieldsData(updatedFieldsData);

//       toast.success(`Field ${fieldToDelete.column_name} deleted successfully`);
//     } catch (error) {
//       console.error(error.message);
//       toast.error('Failed to delete field');
//     }
//   };

//   const handleMediaQueryChange = (mq) => {
//     if (mq.matches) {
//       document.querySelectorAll('.FormTable td').forEach((td) => {
//         td.classList.add('SmallDevice');
//       });
//     } else {
//       document.querySelectorAll('.FormTable td').forEach((td) => {
//         td.classList.remove('SmallDevice');
//       });
//     }
//   };

//   // Function to handle renaming a field or data type
//   const handleRenameField = async (index) => {
//     try {
//       if (renamingIndex === index) {
//         // Check if field name or data type is being changed
//         if (newFieldName !== '') {
//           // Send a request to rename the field name
//           const fieldToRename = fieldsData[index];
//           await axios.put('http://localhost:5000/Admin/fields/rename', {
//             project_name: createdProjectName,
//             field_name: fieldToRename.column_name,
//             new_field_name: newFieldName,
//           });

//           // Update the state after successful renaming of field name
//           const updatedFieldsData = fieldsData.map((field, i) =>
//             i === index ? { ...field, column_name: newFieldName } : field
//           );
//           setFieldsData(updatedFieldsData);
//           toast.success(`Field ${fieldToRename.column_name} renamed to ${newFieldName}`);
//         }

//         if (newDataType !== '') {
//           // Send a request to rename the data type
//           const fieldToRename = fieldsData[index];
//           await axios.put('http://localhost:5000/Admin/fields/rename', {
//             project_name: createdProjectName,
//             field_name: fieldToRename.column_name,
//             new_data_type: newDataType,
//           });

//           // Update the state after successful renaming of data type
//           const updatedFieldsData = fieldsData.map((field, i) =>
//             i === index ? { ...field, data_type: newDataType } : field
//           );
//           setFieldsData(updatedFieldsData);
//           toast.success(`Data type of field ${fieldToRename.column_name} changed to ${newDataType}`);
//         }

//         // Clear the state after successful renaming
//         setRenamingIndex(-1);
//         setNewFieldName('');
//         setNewDataType('');
//       } else {
//         setRenamingIndex(index);
//         setNewFieldName(fieldsData[index].column_name);
//         setNewDataType(fieldsData[index].data_type);
//       }
//     } catch (error) {
//       console.error(error.message);
//       toast.error('Failed to rename field or data type');
//     }
//   };

//   useEffect(() => {
//     const mediaQuery = window.matchMedia('(max-width: 768px)');
//     handleMediaQueryChange(mediaQuery);
//     mediaQuery.addListener(handleMediaQueryChange);
//     return () => mediaQuery.removeListener(handleMediaQueryChange);
//   }, []);

  

//   return (
//     <div className="FieldsContainer">
//       <h1>Create Project</h1>
//       <div className="CreateProjectSection">
//         <label htmlFor="alphaNumericInput">Create Project:</label>
//         <input
//           type="text"
//           placeholder="Project Name"
//           value={projectName}
//           onChange={(e) => setProjectName(e.target.value)}
//         />
//         <button onClick={createProject}>Create</button>
//       </div>
//       {/* <div className="ProjectSelectSection">
//         <label htmlFor="projectSelect">Select Project:</label>
//         <select
//           id="projectSelect"
//           value={createdProjectName.toUpperCase}
//           onChange={handleProjectSelectChange}
//         >
//           <option value="" disabled>
//             Please Select The Project
//           </option>
//           {projectNames.map((name) => (
//             <option key={name} value={name}>
//               {name}
//             </option>
//           ))}
//         </select>
//       </div> */}

//       {createdProjectName && (
//         <div className="SelectedProject">
//           <h2>Selected Project: {createdProjectName}</h2>
//         </div>
//       )}
//       {(createdProjectName && projectNames.length > 0) && (
//         <div className="FieldButtonsSection">
//           <button type="button" onClick={handleCreateFieldClick}>
//             Create New Field
//           </button>
//         </div>
//       )}

//       {showCreateFieldForm && (
//         <form className="CreateFieldForm" onSubmit={handleCreateFieldFormSubmit}>
//           <label htmlFor="fieldName">Field Name:</label>
//           <input
//             type="text"
//             id="fieldName"
//             name="fieldName"
//             placeholder="Field Name"
//             value={newFieldName}
//             onChange={(e) => setNewFieldName(e.target.value)}
//             required
//           />
//           <label htmlFor="dataType">Data Type:</label>
//           <select
//             id="dataType"
//             name="dataType"
//             value={newFieldType}
//             onChange={(e) => setNewFieldType(e.target.value)}
//             required
//           >
//             <option value="" disabled>Select Data Type</option>
//             <option value="text">Text</option>
//             <option value="integer">Integer</option>
//             <option value="date">Date</option>
//             <option value="boolean">Boolean</option>
//             <option value="time">Time</option>
//             {/* Add other data type options as needed */}
//           </select>
//           <button type="submit">Create Field</button>
//         </form>
//       )}

//       {fieldsData.length > 0 && (
//         <div className="FieldCardsSection">
//           <h2>Created Fields:</h2>
//           <div className="FieldCardsContainer">
//   <table>
//     <thead>
//       <tr>
//         <th>Field Name</th>
//         <th>Data Type</th>
//         <th>Actions</th>
//       </tr>
//     </thead>
//     <tbody>
//       {fieldsData.map((field, index) => (
//         <tr key={index}>
//           <td>
//             {renamingIndex === index ? (
//               <input
//                 type="text"
//                 placeholder="Enter new field name"
//                 value={newFieldName}
//                 onChange={(e) => setNewFieldName(e.target.value)}
//               />
//             ) : (
//               <h3>{field.column_name}</h3>
//             )}
//           </td>
//           <td>
//             {renamingIndex === index ? (
//               <input
//                 type="text"
//                 placeholder="Enter new data type"
//                 value={newDataType}
//                 onChange={(e) => setNewDataType(e.target.value)}
//               />
//             ) : (
//               <p>{field.data_type}</p>
//             )}
//           </td>
//           <td>
//             {renamingIndex === index ? (
//               <>
//                 <button onClick={() => handleRenameField(index)}>Save</button>
//                 <button onClick={() => setRenamingIndex(-1)}>Cancel</button>
//               </>
//             ) : (
//               <>
//                 <button className="RenameButton" onClick={() => setRenamingIndex(index)}>
//                   Rename
//                 </button>
//                 <button className="DeleteButton" onClick={() => handleDeleteField(index)}>
//                   Delete
//                 </button>
//               </>
//             )}
//           </td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
// </div>

//         </div>
//       )}

//     </div>
//   );
// };

// export default Fields;
