import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditProjects.css'; // Replace with the correct path to your CSS file
import { toast } from 'react-toastify';

const EditExistingProjects = () => {
  const [projectNames, setProjectNames] = useState([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [renamingIndex, setRenamingIndex] = useState(-1); // -1 means no project is currently being renamed

  const handleEditProjectName = (index) => {
    const selectedProjectName = projectNames[index];
    setRenamingIndex(index);
    setNewProjectName(selectedProjectName);
  };

  const handleDeleteProject = async (projectName) => {
    try {
      // Send a request to delete the project
      await axios.delete(`http://localhost:5000/Admin/projects/${projectName}`);

      // Clear the selected project and update project names
      await fetchProjectNames();

      toast.success(`Project ${projectName} deleted successfully`);
    } catch (error) {
      console.error(error.message);
      toast.error('Failed to delete project');
    }
  };

  const fetchProjectNames = async () => {
    try {
      const response = await axios.get('http://localhost:5000/Admin/projects');
      setProjectNames(response.data);
    } catch (error) {
      console.error(error.message);
      // Handle error (show an error message or other actions)
    }
  };

  useEffect(() => {
    fetchProjectNames();
  }, []);

  const handleSaveProjectName = async (index) => {
    try {
      const selectedProjectName = projectNames[index];

      // Send a request to update the project name
      await axios.put(`http://localhost:5000/Admin/projects/${selectedProjectName}`, {
        new_project_name: newProjectName,
      });

      // Update the state after successful renaming
      const updatedProjectNames = [...projectNames];
      updatedProjectNames[index] = newProjectName;
      setProjectNames(updatedProjectNames);
      setRenamingIndex(-1);
      toast.success(`Project name changed to ${newProjectName}`);
    } catch (error) {
      console.error(error.message);
      toast.error('Failed to update project name');
    }
  };

  const handleCancelProjectName = () => {
    setRenamingIndex(-1);
    setNewProjectName('');
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
    handleMediaQueryChange(mediaQuery);
    mediaQuery.addListener(handleMediaQueryChange);
    return () => mediaQuery.removeListener(handleMediaQueryChange);
  }, []);

  return (
    <div className="fieldscontainer">
      {/* <h1>Projects</h1> */}
      {projectNames.length > 0 && (
        <div className="fieldcardssection">
          <h2>Projects List</h2>
          <table>
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Edit Project Name</th>
                <th>Delete Project</th>
              </tr>
            </thead>
            <tbody>
              {projectNames.map((projectName, index) => (
                <tr key={index}>
                  <td>
                    {renamingIndex === index ? (
                      <input
                        type="text"
                        placeholder="Enter new Project Name"
                        value={newProjectName}
                        onChange={(e) => setNewProjectName(e.target.value)}
                      />
                    ) : (
                      projectName
                    )}
                  </td>
                  <td>
                    {renamingIndex === index ? (
                      <>
                        <button className="SaveProjectNameButton" onClick={() => handleSaveProjectName(index)}>
                          Save
                        </button>
                        <button className="CancelProjectNameButton" onClick={handleCancelProjectName}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button className="EditProjectNameButton" onClick={() => handleEditProjectName(index)}>
                        Edit
                      </button>
                    )}
                  </td>
                  <td>
                    <button className="DeleteProjectButton" onClick={() => handleDeleteProject(projectName)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EditExistingProjects;
