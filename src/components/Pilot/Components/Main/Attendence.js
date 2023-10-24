import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Attendence.css';
import { toast } from 'react-toastify';


const Attendance = () => {
  // const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [employeecode, setCode] = useState('');
  const [department, setDepartment] = useState('');
  const [designation, setDesignation] = useState('');
  const [id, setId] = useState('');
  const [formData, setFormData] = useState({
    user_id: '',
    employeecode:'',
    date: '',
    time: '',
    employeename: '',
    designation: '',
    department:'',
    place: '',

  });

  const getProfile = async () => {
    try {
      const res = await fetch('http://125.63.88.27:5000/dashboard/', {
        method: 'POST',
        headers: { token: localStorage.token },
      });
      const parseData = await res.json();
      // setRole(parseData.role);
      setDepartment(parseData.department);
      setDesignation(parseData.designation);
      setName(parseData.employeename);
      setCode(parseData.employeecode);
      setId(parseData.user_id);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const reverseGeocode = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `http://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
  
      if (response.ok) {
        const data = await response.json();
        if (data.display_name) {
          setFormData((prevData) => ({
            ...prevData,
            place: data.display_name,
          }));
        } else {
          console.error('Location data not found in the response.');
        }
      } else {
        console.error('Error fetching address:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };
  
  
  

  useEffect(() => {
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0];
    const currentTime = now.toTimeString().split(' ')[0];

    setFormData((prevData) => ({
      ...prevData,
      user_id: id,
      employeecode: employeecode,
      date: currentDate,
      time: currentTime,
      employeename: name,
      // role: role,
      designation: designation,
      department: department,
    }));

    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      reverseGeocode(latitude, longitude);
    });
  }, [id,employeecode,name,department,designation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const checkAttendance = async () => {
    try {
      const response = await axios.post('http://125.63.88.27:5000/Pilot/checkAttendance', {
        user_id: id, // Assuming "id" is the user's ID
        date: formData.date, // Date for which you're checking attendance
      });

      return response.data.attendanceRecorded;
    } catch (error) {
      console.error('Error checking attendance:', error);
      return false;
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const attendanceRecorded = await checkAttendance();

    if (attendanceRecorded) {
      // Attendance is already recorded for today
      alert('Attendance has already been recorded for today.');
    } else {
      try {
        await axios.post('http://125.63.88.27:5000/Pilot/attendance', formData);
        console.log('Attendance recorded successfully.');
        toast.success("Attendance recorded successfully.");
      } catch (error) {
        console.error('Error recording attendance:', error);
      }
    }
  };


  return (
    <div class="Attendence-container">
    <div className="Attendence">
      <h1>Attendance Form</h1>
      <form onSubmit={handleSubmit}>
        <input type="date" name="date" value={formData.date} onChange={handleChange} disabled/>
        <input type="time" name="time" value={formData.time} onChange={handleChange} disabled/>
        <input type="text" name="name" placeholder="Name" value={name} onChange={handleChange} disabled/>
        <input type="text" name="place" placeholder="Place" value={formData.place} onChange={handleChange} disabled />
        {/* <input type="text" name="role" placeholder="role" value={role} onChange={handleChange} disabled/> */}
        <input type="text" name="designation" placeholder="Designation" value={designation} onChange={handleChange} disabled/>
        <input type="text" name="department" placeholder="Department" value={department} onChange={handleChange} disabled/>
        {/* <input type="text" name="user_id" placeholder="Login ID" value={id} onChange={handleChange} /> */}
        <button type="submit">Record Attendance</button>
      </form>
    </div>
    </div>
  );
};

export default Attendance;