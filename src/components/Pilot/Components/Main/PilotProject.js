import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './PilotProject.css';

const PilotProject = () => {
  const [projectNames, setProjectNames] = useState([]);
  const [createdProjectName, setCreatedProjectName] = useState('');
  const [descriptionData, setDescriptionData] = useState([]);
  const [mobPlanScheduleData, setMobPlanScheduleData] = useState([]);

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

  useEffect(() => {
    axios
      .get(`http://125.63.88.27:5000/Pilot/description/${createdProjectName}`)
      .then((response) => {
        setDescriptionData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching description data:', error);
      });

    axios
      .get(`http://125.63.88.27:5000/Pilot/mob_plan_schedule/${createdProjectName}`)
      .then((response) => {
        setMobPlanScheduleData(response.data);

      })
      .catch((error) => {
        console.error('Error fetching mob_plan_schedule data:', error);

      });
  }, [createdProjectName]);

  const [formData, setFormData] = useState({
    project_name: '',
    scope2: '',
    deliverables2: '',
    permission2: '',
    location2: '',
    sop_details2: '',
    equipments2: '',
    productivity2: '',
    manpower2: '',
    mob_plan_schedule2: '',
    constraints2: '',
    scope3: '',
    deliverables3: '',
    permission3: '',
    location3: '',
    sop_details3: '',
    equipments3: '',
    productivity3: '',
    manpower3: '',
    mob_plan_schedule3: '',
    constraints3: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://125.63.88.27:5000/Admin/description', formData);
      console.log('Data inserted successfully.');
      toast.success('Data inserted successfully.');
      // Reset the form after successful submission
      setFormData({
        project_name: '',
        scope2: '',
        deliverables2: '',
        permission2: '',
        location2: '',
        sop_details2: '',
        equipments2: '',
        productivity2: '',
        manpower2: '',
        mob_plan_schedule2: '',
        constraints2: '',
        scope3: '',
        deliverables3: '',
        permission3: '',
        location3: '',
        sop_details3: '',
        equipments3: '',
        productivity3: '',
        manpower3: '',
        mob_plan_schedule3: '',
        constraints3: '',
      });
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };

  const handleProjectSelectChange = (e) => {
    const selectedProjectName = e.target.value;
    setCreatedProjectName(selectedProjectName);
  };

  return (
    <div className="ProjectContainer">
      <div className="SelectSection">
        {/* <label htmlFor="projectSelect">Select The Project</label> */}
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
          <h2>Selected Project: {createdProjectName}</h2>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <table className="tabledata">
          <thead>
            <tr>
              <th>Category</th>
              <th>Description</th>
              <th>Status</th>
              <th>Immediate Action Required</th>
            </tr>
          </thead>
          <tbody>
            {descriptionData
              .filter((item) => item.project_name === createdProjectName)
              .map((item) => (
                <React.Fragment key={item.id}>
                  <tr>
                    <td>Scope</td>
                    <td>
                      <textarea readOnly>{item.scope}</textarea>
                    </td>
                    {/* <td><textarea name="scope2" value={formData.scope2} onChange={handleChange}></textarea></td> */}
                    <td className="dropdown-cell">
                      <select name="scope2" value={formData.scope2} onChange={handleChange}>
                        <option value=""disabled>Select</option>
                        <option value="Clarify">Clarify</option>
                        <option value="NotClarify">Not Clarify</option>
                      </select>
                    </td>
                    {formData.scope2 === "NotClarify" && (
                      <td>
                        <textarea placeholder='write immediate action required' name="scope3" value={formData.scope3} onChange={handleChange}></textarea>
                      </td>
                    )}

                    {/* <td className='dropdown-cell-2'>
                      <select name="scope3" value={formData.scope3} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                      {formData.scope3 === "Yes" && (
                        <textarea className='additionalText'
                          name="additionalText"
                          value={formData.additionalText}
                          onChange={handleChange}
                          placeholder="Enter additional"
                        />
                      )}
                    </td> */}


                  </tr>
                  <tr>
                    <td>Location</td>
                    <td>
                      <textarea readOnly>{item.location}</textarea>
                    </td>
                    {/* <td><textarea name="location2" value={formData.location2} onChange={handleChange}></textarea></td>
                    <td><textarea name="location3" value={formData.location3} onChange={handleChange}></textarea></td> */}
                    <td className="dropdown-cell">
                      <select name="location2" value={formData.location2} onChange={handleChange}>
                        <option value=""disabled>Select</option>
                        <option value="Clarify">Clarify</option>
                        <option value="NotClarify">Not Clarify</option>
                      </select>
                    </td>
                    {formData.location2 === "NotClarify" && (
                      <td>
                        <textarea placeholder='write immediate action required' name="location3" value={formData.location3} onChange={handleChange}></textarea>
                      </td>
                    )}
                    {/* <td className="dropdown-cell-2">
                      <select name="location3" value={formData.location3} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                      {formData.location3 === "Yes" && (
                        <textarea className='location3'
                          name="location3"
                          value={formData.location3}
                          onChange={handleChange}
                          placeholder="location3"
                        />
                      )}
                    </td> */}

                  </tr>
                  <tr>
                    <td>SOP Details</td>
                    <td>
                      <textarea readOnly>{item.sop_details}</textarea>
                    </td>
                    {/* <td><textarea name="sop_details2" value={formData.sop_details2} onChange={handleChange}></textarea></td>
                    <td><textarea name="sop_details3" value={formData.sop_details3} onChange={handleChange}></textarea></td> */}
                    <td className="dropdown-cell">
                      <select name="sop_details2" value={formData.sop_details2} onChange={handleChange}>
                        <option value=""disabled>Select</option>
                        <option value="Clarify">Clarify</option>
                        <option value="NotClarify">Not Clarify</option>
                      </select>
                    </td>
                    {formData.sop_details2 === "NotClarify" && (
                      <td>
                        <textarea placeholder='write immediate action required' name="sop_details3" value={formData.sop_details3} onChange={handleChange}></textarea>
                      </td>
                    )}
                    {/* <td className="dropdown-cell-2">
                      <select name="sop_details3" value={formData.sop_details3} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                      {formData.sop_details3 === "Yes" && (
                        <textarea
                          name="sop_details3"
                          value={formData.sop_details3}
                          onChange={handleChange}
                          placeholder="Enter SOP Details 3"
                        />
                      )}
                    </td> */}

                  </tr>
                  <tr>
                    <td>Equipments</td>
                    <td>
                      <textarea readOnly>{item.equipments}</textarea>
                    </td>
                    <td className="dropdown-cell">
                      <select name="equipments2"value={formData.equipments2} onChange={handleChange}>
                        <option value="" disabled>Select</option>
                        <option value="Clarify">Clarify</option>
                        <option value="NotClarify">Not Clarify</option>
                      </select>
                    </td>
                    {formData.equipments2 === "NotClarify" && (
                      <td>
                        <textarea placeholder='write immediate action required' name="equipments3" value={formData.equipments3} onChange={handleChange}></textarea>
                      </td>
                    )}
                    {/* <td><textarea name="equipments2" value={formData.equipments2} onChange={handleChange}></textarea></td>
                    <td><textarea name="equipments3" value={formData.equipments3} onChange={handleChange}></textarea></td> */}
                  </tr>
                  <tr>
                    <td>Mob Plan & Schedule</td>
                    <td>
                      <table>
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Name of Person</th>
                          </tr>
                        </thead>
                        {mobPlanScheduleData
                          .filter((item) => item.project_name === createdProjectName)
                          .map((item) => (
                            <React.Fragment key={item.id}>
                              <tr>
                                <td>
                                  <input value={new Date(item.date1).toLocaleDateString()} />
                                </td>
                                <td>
                                  <textarea readOnly>{item.description1}</textarea>
                                </td>
                                <td>
                                  <textarea readOnly>{item.name_of_the_person1}</textarea>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <input value={new Date(item.date2).toLocaleDateString()} />
                                </td>
                                <td>
                                  <textarea readOnly>{item.description2}</textarea>
                                </td>
                                <td>
                                  <textarea readOnly>{item.name_of_the_person2}</textarea>
                                </td>
                              </tr>
                            </React.Fragment>
                          ))}
                      </table>
                    </td>
                    <td className="dropdown-cell">
                      <select name="mob_plan_schedule2" value={formData.mob_plan_schedule2} onChange={handleChange}>
                        <option value="" disabled>Select</option>
                        <option value="Clarify">Clarify</option>
                        <option value="NotClarify">Not Clarify</option>
                      </select>
                    </td>
                    {formData.mob_plan_schedule2 === "NotClarify" && (
                      <td>
                        <textarea placeholder='write immediate action required' name="mob_plan_schedule3" value={formData.mob_plan_schedule3} onChange={handleChange}></textarea>
                      </td>
                    )}
                    {/* <td>
                      <textarea name="mob_plan_schedule2" value={formData.mob_plan_schedule2} onChange={handleChange}></textarea>
                    </td>
                    <td>
                      <textarea name="mob_plan_schedule3" value={formData.mob_plan_schedule3} onChange={handleChange}></textarea>
                    </td> */}
                  </tr>
                </React.Fragment>
              ))}
          </tbody>
        </table>
      </form>
      <Link to="/Inventory Status">
        <button className="NextButton"> Next </button>
      </Link>
    </div>
  );
};

export default PilotProject;