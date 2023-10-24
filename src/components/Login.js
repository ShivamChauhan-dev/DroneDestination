import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/login.css"

import { toast } from "react-toastify";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    EmployeeCode: "",
    password: ""
  });

  const { EmployeeCode, password } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const navigate = useNavigate();

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { EmployeeCode, password };
      const response = await fetch(
        "http://125.63.88.27:5000/employee/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );

      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth(true);
        toast.success("Logged in Successfully");
        navigate('/dashboard');
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <section className="h-100 gradient-form" style={{ backgroundColor: '#eee' }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <h4 className="mt-1 mb-5 pb-1">Team Drone Destination</h4>
                      </div>
                      <form onSubmit={onSubmitForm}>
                        <p>Please login to your account</p>
                        <div className="form-outline mb-4">
                          <input
                            type="text2"
                            name="EmployeeCode"
                            value={EmployeeCode}
                            onChange={e => onChange(e)}
                            className="form-control2"
                          />
                          <label className="form-label" htmlFor="form2Example11">
                            EmployeeCode
                          </label>
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={e => onChange(e)}
                            className="form-control"
                          />
                          <label className="form-label" htmlFor="form2Example22">
                            Password
                          </label>
                        </div>
                        <div className="text-center pt-1 mb-5 pb-1">
                          <input
                            type="submit"
                            name="Signin"
                            id="signin"
                            className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">The Drone Destination</h4>
                      <p className="small mb-0">
                        Drone Destination, together with its sister company, Hubblefly Technologies, a DGCA-approved
                        manufacturer, is a DGCA-authorized Remote Pilot Training Organization that has developed an
                        integrated drone eco-system built around drone manufacturing, certified training, services, and
                        rent a drone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <Link to="/register">register</Link> */}
    </>
  );
};

export default Login;
