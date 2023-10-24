import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = ({ setAuth }) => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const getProfile = async () => {
    try {
      const res = await fetch("http://125.63.88.27:5000/dashboard/", {
        method: "POST",
        headers: { token: localStorage.token }
      });

      const parseData = await res.json();
      setRole(parseData.role);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

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

    useEffect(() => {
    if (role === "Master") {
      navigate("/admindashboard");
    } else if (role === "Pilot") {
      navigate("/pilotdashboard");
    }else if (role === "Co-pilot") {
      navigate("/copilotdashboard");
    }else if (role === "Projectlead") {
      navigate("/projectleaddashboard");
    }else if (role === "Client") {
      navigate("/clientdashboard");
    }else if (role === "progressing") {
      navigate("/progressingdashboard");
    }else if (role === "operation") {
      navigate("/progressingdashboard");
    }
    
  }, [role, navigate]);


  return (
    <>
      <h1 className="mt-5">Loading....</h1>
      <button onClick={(e) => logout(e)} className="btn btn-primary">
          Logout
        </button>
    </>
  );
};

export default Dashboard;