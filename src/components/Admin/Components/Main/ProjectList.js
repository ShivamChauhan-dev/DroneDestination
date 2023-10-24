import React, { useState } from 'react';
import './ProjectList.css';

const ListOfProject = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubDropdownOpen, setIsSubDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
    setIsSubDropdownOpen(false);
  };

  const toggleSubDropdown = () => {
    setIsSubDropdownOpen((prevState) => !prevState);
  };

  const closeSubDropdown = () => {
    setIsSubDropdownOpen(false);
  };

  return (
    <div className="project-list-container">
      
      <div className="navbar">
        <ul className="navbar-list">
          <li
            onClick={toggleDropdown}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Progress Monitoring
            {isDropdownOpen && (
              <div className="dropdown">
                <ul>
                  <li
                    onClick={toggleSubDropdown}
                    onMouseEnter={toggleSubDropdown}
                    onMouseLeave={closeSubDropdown}
                  >
                    Chart
                    {isSubDropdownOpen && (
                      <div className="sub-dropdown" onMouseLeave={closeSubDropdown}>
                        <ul>
                          <li>Change view of chart</li>
                          <li>Limit data visibility to client</li>
                          <li>View progress</li>
                        </ul>
                      </div>
                    )}
                  </li>
                  <li>Excel</li>
                </ul>
              </div>
            )}
          </li>
          <li>Edit entries</li>
          <li>Edit fields</li>
          <li>Entry time stamp information</li>
          <li>Generate reports</li>
        </ul>
      </div>
    </div>
  );
};

export default ListOfProject;
