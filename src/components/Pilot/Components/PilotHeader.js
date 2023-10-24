import React from 'react';
import {  Space } from 'antd';
// import { UserOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import "../Components/PilotHeader.css";




const PILOTHEADER = ({ setAuth }) => {
  const navigate = useNavigate();
  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem('token');
      setAuth(false);
      toast.success('Logout successfully');
      navigate('/login');
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="pilot-heading">
      <h2>Drone Destination Ltd.</h2>
      <Space size="middle">
        {/* <ProfileBadge /> */}
        <button onClick={(e) => logout(e)} className="btn btn-primary">
          Logout
        </button>
      </Space>
    </div>
  );
};

export default PILOTHEADER;
