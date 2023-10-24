import React, { useState } from 'react';
import axios from 'axios';
import './NewProject.css';
import { toast } from 'react-toastify';

const NewProject = () => {

  const [formData, setFormData] = useState({
    project_name: '',
    scope1: '',
    deliverables1: '',
    permission1: '',
    location1: '',
    sop_details1: '',
    equipments1: '',
    productivity1: '',
    manpower1: '',
    mob_plan_schedule1: '',
    constraints1: '',
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
    date1: '',
    description1: '',
    name_of_the_person1: '',
    date2: '',
    description2: '',
    name_of_the_person2: '',
    customer:'',
    dd_project: '',
    pmo_office_coordinator:'',
    as_update_on_date:''
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
      await axios.post('http://localhost:5000/Admin/description', formData);
      console.log('Data inserted successfully.');
      toast.success('Data inserted successfully.');
      // Reset the form after successful submission
      setFormData({
        project_name: '',
        scope1: '',
        deliverables1: '',
        permission1: '',
        location1: '',
        sop_details1: '',
        equipments1: '',
        productivity1: '',
        manpower1: '',
        mob_plan_schedule1: '',
        constraints1: '',
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
        date1: '',
        description1: '',
        name_of_the_person1: '',
        date2: '',
        description2: '',
        name_of_the_person2: '',
        customer:'',
        dd_project: '',
        pmo_office_coordinator:'',
        as_update_on_date:''
      });
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };



  return (
    <div className="project-container">
      <form onSubmit={handleSubmit}>
        {/* <div className="input-container"> */}
        <div  >
          <div className="project-group">
            <label htmlFor="projectName">Project Name :</label>
            <input type="text" placeholder='Project Name' name='project_name' value={formData.project_name} onChange={handleChange} id="projectName" />
          </div>
          <div className="customer-group">
            <label htmlFor="customer">Customer :</label>
            <input type="text" placeholder='Name of Customer'name='customer' value={formData.customer} onChange={handleChange} id="customer" />
          </div>
          <div className="DD-group">
            <label htmlFor="aerodynePM">DD Project :</label>
            <input type="text" placeholder='DD Project' name='dd_project' value={formData.dd_project} onChange={handleChange} id="aerodynePM" />
          </div>
          <div className="PMO-group">
            <label htmlFor="pmoCoordinator">PMO Office Coordinator :</label>
            <input type="text" placeholder='PMO Coordinator' name='pmo_office_coordinator' value={formData.pmo_office_coordinator} onChange={handleChange} id="pmoCoordinator" />
          </div>
          <div className="date-group">
            <label htmlFor="updatedDate">As updated on Date :</label>
            <input type="date" name='as_update_on_date' value={formData.as_update_on_date} onChange={handleChange} id="updatedDate" />
          </div>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Description</th>
              <th>Status</th>
              <th>Immediate Action Required</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Scope</td>
              <td><textarea name="scope1" value={formData.scope1} onChange={handleChange}></textarea></td>
              <td><textarea name="scope2" value={formData.scope2} onChange={handleChange}></textarea></td>
              <td><textarea name="scope3" value={formData.scope3} onChange={handleChange}></textarea></td>
            </tr>
            <tr>
              <td>Deliverables</td>
              <td><textarea name="deliverables1" value={formData.deliverables1} onChange={handleChange}></textarea></td>

              <td><textarea name="deliverables2" value={formData.deliverables2} onChange={handleChange}></textarea></td>

              <td><textarea name="deliverables3" value={formData.deliverables3} onChange={handleChange}></textarea></td>

            </tr>
            <tr>
              <td>Permission</td>
              <td><textarea name="permission1" value={formData.permission1} onChange={handleChange}></textarea></td>

              <td><textarea name="permission2" value={formData.permission2} onChange={handleChange}></textarea></td>

              <td><textarea name="permission3" value={formData.permission3} onChange={handleChange}></textarea></td>

            </tr>
            <tr>
              <td>Location</td>
              <td><textarea name="location1" value={formData.location1} onChange={handleChange}></textarea></td>

              <td><textarea name="location2" value={formData.location2} onChange={handleChange}></textarea></td>

              <td><textarea name="location3" value={formData.location3} onChange={handleChange}></textarea></td>

            </tr>
            <tr>
              <td>SOP Details</td>
              <td><textarea name="sop_details1" value={formData.sop_details1} onChange={handleChange}></textarea></td>

              <td><textarea name="sop_details2" value={formData.sop_details2} onChange={handleChange}></textarea></td>

              <td><textarea name="sop_details3" value={formData.sop_details3} onChange={handleChange}></textarea></td>

            </tr>
            <tr>
              <td>Equipments</td>
              <td><textarea name="equipments1" value={formData.equipments1} onChange={handleChange}></textarea></td>

              <td><textarea name="equipments2" value={formData.equipments2} onChange={handleChange}></textarea></td>

              <td><textarea name="equipments3" value={formData.equipments3} onChange={handleChange}></textarea></td>

            </tr>
            <tr>
              <td>Productivity</td>
              <td><textarea name="productivity1" value={formData.productivity1} onChange={handleChange}></textarea></td>

              <td><textarea name="productivity2" value={formData.productivity2} onChange={handleChange}></textarea></td>

              <td><textarea name="productivity3" value={formData.productivity3} onChange={handleChange}></textarea></td>

            </tr>
            <tr>
              <td>Manpower</td>
              <td><textarea name="manpower1" value={formData.manpower1} onChange={handleChange}></textarea></td>

              <td><textarea name="manpower2" value={formData.manpower2} onChange={handleChange}></textarea></td>

              <td><textarea name="manpower3" value={formData.manpower3} onChange={handleChange}></textarea></td>

            </tr>
            <tr>
              <td>
                Mob Plan & Schedule
              </td><td>
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Description</th>
                      <th>Name of Person</th>
                    </tr>
                  </thead>
                  <tr>
                    <td><input type="date" name='date1' value={formData.date1} onChange={handleChange}/></td>
                    <td><textarea name="description1" value={formData.description1} onChange={handleChange}></textarea></td>

                    <td><textarea name="name_of_the_person1" value={formData.name_of_the_person1} onChange={handleChange}></textarea></td>

                  </tr>
                  <tr>
                    <td><input type="date" name='date2' value={formData.date2} onChange={handleChange} /></td>
                    <td><textarea name="description2" value={formData.description2} onChange={handleChange}></textarea></td>

                    <td><textarea name="name_of_the_person2" value={formData.name_of_the_person2} onChange={handleChange}></textarea></td>

                  </tr>
                </table>
              </td>
              <td><textarea name="mob_plan_schedule2" value={formData.mob_plan_schedule2} onChange={handleChange}></textarea></td>

              <td><textarea name="mob_plan_schedule3" value={formData.mob_plan_schedule3} onChange={handleChange}></textarea></td>

            </tr>
            <tr>
              <td>Constraints</td>
              <td><textarea name="constraints1" value={formData.constraints1} onChange={handleChange}></textarea></td>

              <td><textarea name="constraints2" value={formData.constraints2} onChange={handleChange}></textarea></td>

              <td><textarea name="constraints3" value={formData.constraints3} onChange={handleChange}></textarea></td>

            </tr>
            {/* Repeat for other categories */}
          </tbody>
        </table>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewProject;






