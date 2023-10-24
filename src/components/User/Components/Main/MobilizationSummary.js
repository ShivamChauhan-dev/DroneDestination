import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./mobilizationsummary.css";

function MobilizationSummary() {
  const [batteryQuantity, setBatteryQuantity] = useState('');
  const [poleQuantity, setPoleQuantity] = useState('');
  const [droneQuantity] = useState('');
  const [emlidsQuantity, setEmlidsQuantity] = useState('');
  const [vehicleNo, setVehicleNo] = useState('');
  const [batterySerialNumbers, setBatterySerialNumbers] = useState([]);
  const [emlidSerialNumbers, setEmlidSerialNumbers] = useState([]); // Added emlidSerialNumbers
  const [projectCode, setProjectCode] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [selectedOption, setSelectedOption] = useState('Option 1');
  const [selectedCoPilotOption, setSelectedCoPilotOption] = useState('good');
  const [selectedBatteryOption, setSelectedBatteryOption] = useState('good');
  const [selectedEmlidsOption, setSelectedEmlidsOption] = useState('good');
  const [selectedPoleOption, setSelectedPoleOption] = useState('good');
  const [selectedDroneOption, setSelectedDroneOption] = useState('good');
  const [selectedCarOption, setSelectedCarOption] = useState('good');

  useEffect(() => {
    generateProjectCode();
    fetchCurrentDate();
  }, []);

  const generateProjectCode = () => {
    // Generate the new project code
    const prefix = 'PC';
    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-IN');
    const formattedTime = date.toLocaleTimeString('en-IN', { hour12: false });
    const alphanumeric = Math.random().toString(36).substr(2, 2).toUpperCase();
    const newProjectCode = `${prefix}-${formattedDate}-${formattedTime}-${alphanumeric}`;

    // Set the new project code in the state
    setProjectCode(newProjectCode);
  };

  const fetchCurrentDate = () => {
    // Fetch the current date
    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-IN', {
      year: 'numeric', month: 'long', day: 'numeric',
    });

    // Set the current date in the state
    setCurrentDate(formattedDate);
  };

  const handleBatteryQuantityChange = (event) => {
    setBatteryQuantity(event.target.value);
    setBatterySerialNumbers(Array(Number(event.target.value)).fill(''));
  };

  const handlePoleQuantityChange = (event) => {
    setPoleQuantity(event.target.value);
  };

  const handleEmlidsQuantityChange = (event) => {
    setEmlidsQuantity(event.target.value);
    setEmlidSerialNumbers(Array(Number(event.target.value)).fill('')); // Initialize emlidSerialNumbers
  };

  const handleVehicleNoChange = (event) => {
    setVehicleNo(event.target.value.toUpperCase());
  };

  const handleBatterySerialNumberChange = (event, index) => {
    const newSerialNumbers = [...batterySerialNumbers];
    newSerialNumbers[index] = event.target.value;
    setBatterySerialNumbers(newSerialNumbers);
  };

  const handleEmlidSerialNumberChange = (event, index) => {
    const newSerialNumbers = [...emlidSerialNumbers];
    newSerialNumbers[index] = event.target.value;
    setEmlidSerialNumbers(newSerialNumbers);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if all details are filled
    if (
      batteryQuantity &&
      poleQuantity &&
      droneQuantity &&
      emlidsQuantity &&
      vehicleNo &&
      batterySerialNumbers.every((serialNumber) => serialNumber !== '') &&
      emlidSerialNumbers.every((serialNumber) => serialNumber !== '')
    ) {
      // Perform form submission logic here
      console.log('Form submitted successfully!');
    } else {
      // Show an alert to fill all the details
      alert('Please fill all the details before submitting the form.');
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleCoPilotOptionChange = (event) => {
    setSelectedCoPilotOption(event.target.value);
  };

  const handleBatteryOptionChange = (event) => {
    setSelectedBatteryOption(event.target.value);
  };

  const handleEmlidsOptionChange = (event) => {
    setSelectedEmlidsOption(event.target.value);
  };

  const handlePoleOptionChange = (event) => {
    setSelectedPoleOption(event.target.value);
  };

  const handleDroneOptionChange = (event) => {
    setSelectedDroneOption(event.target.value);
  };

  const handleCarOptionChange = (event) => {
    setSelectedCarOption(event.target.value);
  };

  return (
    <div className="custom-mobilization-summary">
      <h2>Mobilization Summary</h2>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <label>Current Date: {currentDate}</label>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="projectCode">Project Code:</label>
                <input type="text" id="projectCode" value={projectCode} disabled />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="MobilizationFrom">Mobilizing From:</label>
                <input type="text" id="MobilizationFrom" placeholder="Enter here" required />
                <label htmlFor="MobilizationFrom">Mobilizing To:</label>
                <input type="text" id="MobilizationFrom" placeholder="Enter here" required />
              </td>
              {/* <td>
                <label htmlFor="pilot">Pilot:</label>
                <input type="text" id="pilot" placeholder="Pilot Name" required />
              </td> */}
            </tr>
            <tr>
              <td>
                <label htmlFor="pilot">Pilot:</label>
                <input type="text" id="pilot" placeholder="Pilot Name" required />
              </td>
              <td>
                <label>Status:</label>
              </td>
              <td>
                <label htmlFor="option1">
                  <input
                    type="radio"
                    id="option1"
                    name="options"
                    value="Option 1"
                    checked={selectedOption === 'Option 1'}
                    onChange={handleOptionChange}
                    required
                  />
                  Good
                </label>
              </td>
              <td>
                <label htmlFor="option2">
                  <input
                    type="radio"
                    id="option2"
                    name="options"
                    value="Option 2"
                    checked={selectedOption === 'Option 2'}
                    onChange={handleOptionChange}
                    required
                  />
                  Not Good
                </label>
              </td>
              <td>
                <label htmlFor="option3">
                  <input
                    type="radio"
                    id="option3"
                    name="options"
                    value="Option 3"
                    checked={selectedOption === 'Option 3'}
                    onChange={handleOptionChange}
                    required
                  />
                  Good But
                </label>
              </td>
            </tr>
            {selectedOption === 'Option 2' && (
              <tr>
                <td>
                  <label>Upload Image:</label>
                  <input type="file" accept="image/*" />
                </td>
                <td>
                  <label>Upload Video (30 sec):</label>
                  <input type="file" accept="video/*" />
                </td>
              </tr>
            )}
            <tr>
              <td>
                <label htmlFor="co-pilot">Co-Pilot:</label>
                <input type="text" id="co-pilot" placeholder="Co-Pilot Name" required />
              </td>
              <td>
                <label>Status:</label>
              </td>
              <td>
                <label htmlFor="co-pilotOption1">
                  <input
                    type="radio"
                    id="co-pilotOption1"
                    name="co-pilotOptions"
                    value="good"
                    checked={selectedCoPilotOption === 'good'}
                    onChange={handleCoPilotOptionChange}
                    required
                  />
                  Good
                </label>
              </td>
              <td>
                <label htmlFor="co-pilotOption2">
                  <input
                    type="radio"
                    id="co-pilotOption2"
                    name="co-pilotOptions"
                    value="notGood"
                    checked={selectedCoPilotOption === 'notGood'}
                    onChange={handleCoPilotOptionChange}
                    required
                  />
                  Not Good
                </label>
              </td>
              <td>
                <label htmlFor="co-pilotOption3">
                  <input
                    type="radio"
                    id="co-pilotOption3"
                    name="co-pilotOptions"
                    value="goodbut"
                    checked={selectedCoPilotOption === 'goodbut'}
                    onChange={handleCoPilotOptionChange}
                    required
                  />
                  Good But
                </label>
              </td>
            </tr>
            {selectedCoPilotOption === 'notGood' && (
              <tr>
                <td>
                  <label>Upload Image:</label>
                  <input type="file" accept="image/*" />
                </td>
                <td>
                  <label>Upload Video (30 sec):</label>
                  <input type="file" accept="video/*" />
                </td>
              </tr>
            )}
            <tr>
              <td>
                <label htmlFor="batteryQuantity">Set of Batteries:</label>
                <select
                  id="batteryQuantity"
                  value={batteryQuantity}
                  onChange={handleBatteryQuantityChange}
                  required
                >
                  <option value="">Select Quantity</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </td>
              {batteryQuantity && batteryQuantity !== 'Select Quantity' && (
                <td>
                  <label htmlFor="batterySerialNumbers">Battery Serial No:</label>
                  <div className="battery-serial-numbers">
                    {batterySerialNumbers.map((serialNumber, index) => (
                      <input
                        key={index}
                        type="text"
                        placeholder={`Serial Number ${index + 1}`}
                        value={serialNumber}
                        onChange={(event) => handleBatterySerialNumberChange(event, index)}
                        required
                      />
                    ))}
                  </div>
                </td>
              )}
              <td>
                <label>Status:</label>
              </td>
              <td>
                <label htmlFor="batteryOption1">
                  <input
                    type="radio"
                    id="batteryOption1"
                    name="batteryOptions"
                    value="good"
                    checked={selectedBatteryOption === 'good'}
                    onChange={handleBatteryOptionChange}
                    required
                  />
                  Good
                </label>
              </td>
              <td>
                <label htmlFor="batteryOption2">
                  <input
                    type="radio"
                    id="batteryOption2"
                    name="batteryOptions"
                    value="notGood"
                    checked={selectedBatteryOption === 'notGood'}
                    onChange={handleBatteryOptionChange}
                    required
                  />
                  Not Good
                </label>
              </td>
              <td>
                <label htmlFor="batteryOption3">
                  <input
                    type="radio"
                    id="batteryOption3"
                    name="batteryOptions"
                    value="goodbut"
                    checked={selectedBatteryOption === 'goodbut'}
                    onChange={handleBatteryOptionChange}
                    required
                  />
                  Good But
                </label>
              </td>
              {selectedBatteryOption === 'notGood' && (
                <tr>
                  <td>
                    <label>Upload Image:</label>
                    <input type="file" accept="image/*" />
                  </td>
                  <td>
                    <label>Upload Video (30 sec):</label>
                    <input type="file" accept="video/*" />
                  </td>
                </tr>
              )}
            </tr> 
            <tr>
              <td>
                <label htmlFor="emlidsQuantity">Emlids:</label>
                <select
                  id="emlidsQuantity"
                  value={emlidsQuantity}
                  onChange={handleEmlidsQuantityChange}
                  required
                >
                  <option value="">Select Quantity</option>
                  <option>1</option>
                  <option>2</option>
                </select>
              </td>
              {emlidsQuantity && emlidsQuantity !== 'Select Quantity' && (
                <td>
                  <label htmlFor="emlidSerialNumbers">Emlid Serial No:</label>
                  <div className="emlid-serial-numbers">
                    {emlidSerialNumbers.map((serialNumber, index) => (
                      <input
                        key={index}
                        type="text"
                        placeholder={`Serial Number ${index + 1}`}
                        value={serialNumber}
                        onChange={(event) => handleEmlidSerialNumberChange(event, index)}
                        required
                      />
                    ))}
                  </div>
                </td>
              )}
              <td>
                <label>Status:</label>
              </td>
              <td>
                <label htmlFor="emlidsOption1">
                  <input
                    type="radio"
                    id="emlidsOption1"
                    name="emlidsOptions"
                    value="good"
                    checked={selectedEmlidsOption === 'good'}
                    onChange={handleEmlidsOptionChange}
                    required
                  />
                  Good
                </label>
              </td>
              <td>
                <label htmlFor="emlidsOption2">
                  <input
                    type="radio"
                    id="emlidsOption2"
                    name="emlidsOptions"
                    value="notGood"
                    checked={selectedEmlidsOption === 'notGood'}
                    onChange={handleEmlidsOptionChange}
                    required
                  />
                  Not Good
                </label>
              </td>
              <td>
                <label htmlFor="emlidsOption3">
                  <input
                    type="radio"
                    id="emlidsOption3"
                    name="emlidsOptions"
                    value="goodbut"
                    checked={selectedEmlidsOption === 'goodbut'}
                    onChange={handleEmlidsOptionChange}
                    required
                  />
                  Good But
                </label>
              </td>
              {selectedEmlidsOption === 'notGood' && (
                <tr>
                  <td>
                    <label>Upload Image:</label>
                    <input type="file" accept="image/*" />
                  </td>
                  <td>
                    <label>Upload Video (30 sec):</label>
                    <input type="file" accept="video/*" />
                  </td>
                </tr>
              )}
            </tr>
            <tr>
              <td>
                <label htmlFor="poleQuantity">Number of Poles:</label>
                <select
                  id="poleQuantity"
                  value={poleQuantity}
                  onChange={handlePoleQuantityChange}
                  required
                >
                  <option value="">Select Quantity</option>
                  <option>1</option>
                  <option>2</option>
                </select>
              </td>
              <td>
                <label>Status:</label>
              </td>
              <td>
                <label htmlFor="poleOption1">
                  <input
                    type="radio"
                    id="poleOption1"
                    name="poleOptions"
                    value="good"
                    checked={selectedPoleOption === 'good'}
                    onChange={handlePoleOptionChange}
                    required
                  />
                  Good
                </label>
              </td>
              <td>
                <label htmlFor="poleOption2">
                  <input
                    type="radio"
                    id="poleOption2"
                    name="poleOptions"
                    value="notGood"
                    checked={selectedPoleOption === 'notGood'}
                    onChange={handlePoleOptionChange}
                    required
                  />
                  Not Good
                </label>
              </td>
              <td>
                <label htmlFor="poleOption3">
                  <input
                    type="radio"
                    id="poleOption3"
                    name="poleOptions"
                    value="goodbut"
                    checked={selectedPoleOption === 'goodbut'}
                    onChange={handlePoleOptionChange}
                    required
                  />
                  Not Good
                </label>
              </td>
              {selectedPoleOption === 'notGood' && (
                <tr>
                  <td>
                    <label>Upload Image:</label>
                    <input type="file" accept="image/*" />
                  </td>
                  <td>
                    <label>Upload Video (30 sec):</label>
                    <input type="file" accept="video/*" />
                  </td>
                </tr>
              )}
            </tr>
            <tr>
              <td>
                <label htmlFor="droneQuantity">Drone:</label>
                <select>
                  <option value="">Select Drone</option>
                  <option>TrinityF90+00218</option>
                  <option>UA004TGS0TC</option>
                </select>
              </td>
              <td>
                <label>Status:</label>
              </td>
              <td>
                <label htmlFor="droneOption1">
                  <input
                    type="radio"
                    id="droneOption1"
                    name="droneOptions"
                    value="good"
                    checked={selectedDroneOption === 'good'}
                    onChange={handleDroneOptionChange}
                    required
                  />
                  Good
                </label>
              </td>
              <td>
                <label htmlFor="droneOption2">
                  <input
                    type="radio"
                    id="droneOption2"
                    name="droneOptions"
                    value="notGood"
                    checked={selectedDroneOption === 'notGood'}
                    onChange={handleDroneOptionChange}
                    required
                  />
                  Not Good
                </label>
              </td>
              <td>
                <label htmlFor="droneOption3">
                  <input
                    type="radio"
                    id="droneOption3"
                    name="droneOptions"
                    value="goodbut"
                    checked={selectedDroneOption === 'goodbut'}
                    onChange={handleDroneOptionChange}
                    required
                  />
                  Good But
                </label>
              </td>
              {selectedDroneOption === 'notGood' && (
                <tr>
                  <td>
                    <label>Upload Image:</label>
                    <input type="file" accept="image/*" />
                  </td>
                  <td>
                    <label>Upload Video (30 sec):</label>
                    <input type="file" accept="video/*" />
                  </td>
                </tr>
              )}
            </tr>
            <tr>
              <td>
                <label htmlFor="vehicleNo">Car Number:</label>
                <input
                  type="text"
                  id="vehicleNo"
                  placeholder="Vehicle Number"
                  value={vehicleNo}
                  onChange={handleVehicleNoChange}
                  required
                />
              </td>
              <td>
                <label>Status:</label>
              </td>
              <td>
                <label htmlFor="carOption1">
                  <input
                    type="radio"
                    id="carOption1"
                    name="carOptions"
                    value="good"
                    checked={selectedCarOption === 'good'}
                    onChange={handleCarOptionChange}
                    required
                  />
                  Good
                </label>
              </td>
              <td>
                <label htmlFor="carOption2">
                  <input
                    type="radio"
                    id="carOption2"
                    name="carOptions"
                    value="notGood"
                    checked={selectedCarOption === 'notGood'}
                    onChange={handleCarOptionChange}
                    required
                  />
                  Not Good
                </label>
              </td>
              <td>
                <label htmlFor="carOption3">
                  <input
                    type="radio"
                    id="carOption3"
                    name="carOptions"
                    value="goodbut"
                    checked={selectedCarOption === 'goodbut'}
                    onChange={handleCarOptionChange}
                    required
                  />
                  Good But
                </label>
              </td>
              {selectedCarOption === 'notGood' && (
                <tr>
                  <td>
                    <label>Upload Image:</label>
                    <input type="file" accept="image/*" />
                  </td>
                  <td>
                    <label>Upload Video (30 sec):</label>
                    <input type="file" accept="video/*" />
                  </td>
                </tr>
              )}
            </tr>
            <div className="button-container">
              <Link to = "/DPR">
              <button type="submit">Submit</button>
              </Link>
            </div>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default MobilizationSummary;