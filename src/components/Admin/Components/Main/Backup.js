import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreateField.css'; // Replace with the correct path to your CSS file
import { toast } from 'react-toastify';

const BackupFields = () => {
  const [showCreateFieldForm, setShowCreateFieldForm] = useState(false);
  const [fieldsData, setFieldsData] = useState([]);
  const [renamingIndex, setRenamingIndex] = useState(-1);
  const [newFieldName, setNewFieldName] = useState('');
  const [newDataType, setNewDataType] = useState('');
  const [newFieldType, setNewFieldType] = useState('');
  const [projectNames, setProjectNames] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [createdProjectName, setCreatedProjectName] = useState('');
  const dataTypesList = ["text", "integer", "date", "boolean", "time"];

  useEffect(() => {
    fetchProjectNames();
  }, []);

  const fetchProjectNames = async () => {
    try {
      const response = await axios.get('http://localhost:5000/Admin/projects');
      setProjectNames(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };
  const handleFormInputChange = (index, value) => {
    const updatedFieldsData = fieldsData.map((field, i) =>
      i === index ? { ...field, newValue: value } : field
    );
    setFieldsData(updatedFieldsData);
  };

  const createProject = async () => {
    try {
      const response = await axios.post('http://localhost:5000/Admin/projects', {
        project_name: projectName,
      });
      toast.success(`Project ${projectName} created successfully`);
      setProjectNames(response.data.projectNames);
      setCreatedProjectName(projectName);
      setProjectName('');
      fetchFieldsForProject(projectName);
    } catch (error) {
      toast.error(`Project ${projectName} already exists`);
    }
  };

  const fetchFieldsForProject = async (projectName) => {
    try {
      const response = await axios.get(`http://localhost:5000/Admin/fields/${projectName}`);
      setFieldsData(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleProjectSelectChange = (e) => {
    const selectedProjectName = e.target.value;
    setCreatedProjectName(selectedProjectName);
    fetchFieldsForProject(selectedProjectName);
  };

  const handleCreateFieldClick = () => {
    setShowCreateFieldForm(true);
  };

  const handleCreateFieldFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/Admin/fields', {
        project_name: createdProjectName,
        field_name: newFieldName,
        data_type: newFieldType,
      });
      const newField = response.data;
      setFieldsData((prevFieldsData) => [...prevFieldsData, newField]);
      setNewFieldName('');
      setNewFieldType('');
      toast.success(`Field ${newFieldName} created successfully`);
    } catch (error) {
      toast.error(`Field ${newFieldName} already exists`);
    }
  };

  const handleDeleteField = async (index) => {
    try {
      const fieldToDelete = fieldsData[index];
      await axios.delete('http://localhost:5000/Admin/fields/delete', {
        data: {
          project_name: createdProjectName,
          field_name: fieldToDelete.column_name,
        },
      });
      const updatedFieldsData = fieldsData.filter((_, i) => i !== index);
      setFieldsData(updatedFieldsData);
      toast.success(`Field ${fieldToDelete.column_name} deleted successfully`);
    } catch (error) {
      console.error(error.message);
      toast.error('Failed to delete field');
    }
  };

  const handleMediaQueryChange = (mq) => {
    const tableCells = document.querySelectorAll('.FormTable td');
    tableCells.forEach((td) => {
      if (mq.matches) {
        td.classList.add('SmallDevice');
      } else {
        td.classList.remove('SmallDevice');
      }
    });
  };

  const handleRenameField = async (index) => {
    try {
      if (renamingIndex === index) {
        if (newFieldName !== '') {
          const fieldToRename = fieldsData[index];
          await axios.put('http://localhost:5000/Admin/fields/rename', {
            project_name: createdProjectName,
            field_name: fieldToRename.column_name,
            new_field_name: newFieldName,
          });
          const updatedFieldsData = fieldsData.map((field, i) =>
            i === index ? { ...field, column_name: newFieldName } : field
          );
          setFieldsData(updatedFieldsData);
          toast.success(`Field ${fieldToRename.column_name} renamed to ${newFieldName}`);
        }
        if (newDataType !== '') {
          const fieldToRename = fieldsData[index];
          await axios.put('http://localhost:5000/Admin/fields/rename', {
            project_name: createdProjectName,
            field_name: fieldToRename.column_name,
            new_data_type: newDataType,
          });
          const updatedFieldsData = fieldsData.map((field, i) =>
            i === index ? { ...field, data_type: newDataType } : field
          );
          setFieldsData(updatedFieldsData);
          toast.success(`Data type of field ${fieldToRename.column_name} changed to ${newDataType}`);
        }
        setRenamingIndex(-1);
        setNewFieldName('');
        setNewDataType('');
      } else {
        setRenamingIndex(index);
        setNewFieldName(fieldsData[index].column_name);
        setNewDataType(fieldsData[index].data_type);
      }
    } catch (error) {
      console.error(error.message);
      toast.error('Failed to rename field or data type');
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    handleMediaQueryChange(mediaQuery);
    mediaQuery.addListener(handleMediaQueryChange);
    return () => mediaQuery.removeListener(handleMediaQueryChange);
  }, []);

  return (
    <div className="FieldsContainer">
      <h1>Create Project</h1>
      <div className="CreateProjectSection">
        <label htmlFor="alphaNumericInput">Create Project:</label>
        <input
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <button onClick={createProject}>Create</button>
      </div>
      <div className="ProjectSelectSection">
        <label htmlFor="projectSelect">Replicate Project:</label>
        <select
          id="projectSelect"
          value={createdProjectName.toUpperCase()}
          onChange={handleProjectSelectChange}
        >
          <option value="" disabled>Please Select The Project</option>
          {projectNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      {createdProjectName && (
        <div className="SelectedProject">
          <h2>Selected Project: {createdProjectName}</h2>
        </div>
      )}
      {createdProjectName && projectNames.length > 0 && (
        <div className="FieldButtonsSection">
          <button type="button" onClick={handleCreateFieldClick}>
            Create New Field
          </button>
        </div>
      )}

      {showCreateFieldForm && (
        <form className="CreateFieldForm" onSubmit={handleCreateFieldFormSubmit}>
          <label htmlFor="fieldName">Field Name:</label>
          <input
            type="text"
            id="fieldName"
            name="fieldName"
            placeholder="Field Name"
            value={newFieldName}
            onChange={(e) => setNewFieldName(e.target.value)}
            required
          />
          <label htmlFor="dataType">Data Type:</label>
          <select
            id="dataType"
            name="dataType"
            value={newFieldType}
            onChange={(e) => setNewFieldType(e.target.value)}
            required
          >
            <option value="" disabled>Select Data Type</option>
            <option value="varchar">Text/Number</option>
            <option value="date">Date</option>
            <option value="time">Time</option>
            <option value ="file">File</option> 
          </select>
          <button type="submit">Create Field</button>
        </form>
      )}

      {fieldsData.length > 0 && (
        <div className="FieldCardsSection">
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
                  {renamingIndex === index ? (
                    <>
                      <td>
                        {/* Allow the user to rename the field name */}
                        <input
                          type="text"
                          placeholder="Enter new field name"
                          value={newFieldName}
                          onChange={(e) => setNewFieldName(e.target.value)}
                        />
                      </td>
                      <td>
                        {/* Allow the user to rename the data type */}
                        <select
                          value={newDataType}
                          onChange={(e) => setNewDataType(e.target.value)}
                        >
                          <option value="" disabled>
                            Select data type
                          </option>
                          {dataTypesList.map((type, index) => (
                            <option key={index} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <button onClick={() => handleRenameField(index)}>Save</button>
                        <button onClick={() => setRenamingIndex(-1)}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{field.column_name}</td>
                      <td>{field.data_type}</td>
                      <td>
                        <button className="RenameButton" onClick={() => setRenamingIndex(index)}>
                          Edit
                        </button>
                        <button className="DeleteButton" onClick={() => handleDeleteField(index)}>
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="FormPreview">
  <h2>Form Preview:</h2>
  <form className="CreateFieldForm" onSubmit={handleCreateFieldFormSubmit}>
    <table className="FormPreviewTable">
      <thead>
        <tr>
          <th>Field Name</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {fieldsData.map((field, index) => (
          <tr key={index}>
            <td>{field.column_name}</td>
            <td>
              {field.data_type === 'boolean' ? (
                <input
                  type="checkbox"
                  id={field.column_name}
                  name={field.column_name}
                  checked={field.newValue === 'true'}
                  onChange={(e) =>
                    handleFormInputChange(index, e.target.checked ? 'true' : 'false')
                  }
                />
              ) : (
                <input
                  type={field.data_type}
                  id={field.column_name}
                  name={field.column_name}
                  value={field.newValue || ''}
                  onChange={(e) => handleFormInputChange(index, e.target.value)}
                />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {/* <button type="submit">Submit</button> */}
  </form>
</div>

    </div>
  );
};

export default BackupFields;