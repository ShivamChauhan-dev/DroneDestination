import React, { useState, useEffect } from 'react';
import './DPRReport.css';

function DPRReports() {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    fetchCurrentDate();
  }, []);

  const fetchCurrentDate = () => {
    // Fetch the current date
    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-IN', {
      year: 'numeric', month: 'long', day: 'numeric',
    });

    // Set the current date in the state
    setCurrentDate(formattedDate);
  };

  return (
    <div className="DPR-Report">
      <h2>Consolidated Drone Flying Report</h2>
      <table >
        <tbody>
          <tr>
            <th><td className="head"> Date: {currentDate}</td></th>
          </tr>
          <tr>
            <th className="head">Drone Number:</th>
            <td><input type="text" placeholder="Drone No."></input></td>

            <th className="head">Pilot Name:</th>
            <td><input placeholder="Pilot Name"></input></td>

            <th className="head">Field Assistant:</th>
            <td><input placeholder="Field Assistant"></input></td>

            <th className="head">Contact Number:</th>
            <td><input type="tel" placeholder="Contact Number"></input></td>
          </tr>
          <tr>
            <th className="head">District:</th>
            <td><input type="text" placeholder="District"></input></td>

            <th className="head">Taluka:</th>
            <td><input type="text" placeholder="Taluka"></input></td>

            <th className="head">Camping Area:</th>
            <td><input type="text" placeholder="Camping Area"></input></td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
            <tr>
                <th className="head">FLY:</th>
                <td><input type="text" placeholder="FLY." /></td>

                <th className="head">FLIGHT ID:</th>
                <td><input type="text" placeholder="FLIGHT ID" /></td>
                
                <th className="head">FLIGHT CATEGORY:</th>
                <td><input type="text" placeholder="FLIGHT CATEGORY" /></td>
                
                <th className="head">FLIGHT DATE:</th>
                <td><input type="date"></input></td>
                </tr><tr>
                <th className="head">TAKE-OFF TIME:</th>
                <td><input type="time"></input></td>
                
                <th className="head">LANDING TIME:</th>
                <td><input type="time"></input></td>
                
                <th className="head">DURATION:</th>
                <td><input type="time"></input></td>
                
                <th className="head">TRAINING FLIGHT:</th>
                <td><input type="text" placeholder="TRAINING FLIGHT" /></td>
                </tr><tr>
                <th className="head">FRESHRE FLY:</th>
                <td><input type="text" placeholder="FRESHR EFLY" /></td>
                
                <th className="head">AREA:</th>
                <td><input type="text" placeholder="AREA" /></td>

                <th className="head">UAV HEIGHT:</th>
                <td><input type="text" placeholder="UAV HEIGHT" /></td>
            </tr>
        </tbody>
      </table>
      <table>
        <tbody>
            <tr>
                <th className="head">FLY:</th>
                <td><input type="text" placeholder="FLY." /></td>

                <th className="head">PILOT NAME:</th>
                <td><input type="text" placeholder="PILOT NAME" /></td>
                
                <th className="head">FIELD ASSISTANT:</th>
                <td><input type="text" placeholder="FIELD ASSISTANT" /></td>
                
                <th className="head">CAMPING AREA:</th>
                <td><input type="text" placeholder='CAMPING AREA'></input></td>
                </tr><tr>
                <th className="head">DISTRICT:</th>
                <td><input type="text" placeholder='DISTRICT'></input></td>
                
                <th className="head">TALUK:</th>
                <td><input type="text" placeholder='TALUK'></input></td>
                
                <th className="head">GRAM PANCHAYAT:</th>
                <td><input type="text" placeholder='GRAM PANCHAYAT'></input></td>
                
                <th className="head">VILLAGES:</th>
                <td><input type="text" placeholder="VILLAGES" /></td>
                </tr><tr>
                <th className="head">LGD CODES:</th>
                <td><input type="text" placeholder="LGD CODES" /></td>
                
                <th className="head">HAMLETS:</th>
                <td><input type="text" placeholder="-" /></td>
            </tr>
        </tbody>
      </table>
      <table>
        <tbody>
            <tr>
                <th className="head">FLY:</th>
                <td><input type="text" placeholder="FLY." /></td>

                <th className="head">VILLAGES COUNT:</th>
                <td><input type="text" placeholder="VILLAGES COUNT" /></td>
                
                <th className="head">HAMLETS COUNT:</th>
                <td><input type="text" placeholder="HAMLETS COUNT" /></td>
                
                <th className="head">TEMPERATURE:</th>
                <td><input type="text" placeholder='TEMPERATURE'></input></td>
                </tr><tr>
                <th className="head">WIND SPEED:</th>
                <td><input type="text" placeholder='WIND SPEED'></input></td>
                
                <th className="head">OVER-LAP:</th>
                <td><input type="text" placeholder='OVER-LAP'></input></td>
                
                <th className="head">BASE GPS ID:</th>
                <td><input type="text" placeholder='BASE GPS ID'></input></td>
                
                <th className="head">I-BASE FILENAME:</th>
                <td><input type="text" placeholder="I-BASE FILENAME" /></td>
                </tr><tr>
                <th className="head">SOFTWARE-VERSION:</th>
                <td><input type="text" placeholder="SOFTWARE-VERSION" /></td>
                
                <th className="head">RAW IMAGES COUNT:</th>
                <td><input type="text" placeholder="RAW IMAGES COUNT" /></td>

                <th className="head">GEO-TAGGED:</th>
                <td><input type="text" placeholder="GEO-TAGGED" /></td>
            </tr>
        </tbody>
      </table>
      <table>
        <tbody>
            <tr>
                <th className="head">AVG GSD:</th>
                <td><input type="text" placeholder="AVG GSD." /></td>

                <th className="head">BATTERY NO:</th>
                <td><input type="text" placeholder="BATTERY NO" /></td>
                
                <th className="head">FLY LOG NO:</th>
                <td><input type="text" placeholder="FLY LOG NO" /></td>
                
                <th className="head">TOTAL FILES:</th>
                <td><input type="text" placeholder='TOTAL FILES'></input></td>
                </tr><tr>
                <th className="head">FOLDER SIZE GB:</th>
                <td><input type="text" placeholder='FOLDER SIZE GB'></input></td>
                
                <th className="head">OVERLAP:</th>
                <td><input type="text" placeholder='OVERLAP'></input></td>
                
                <th className="head">USER NAME:</th>
                <td><input type="text" placeholder='USER NAME'></input></td>
                
                <th className="head">REMARKS:</th>
                <td><input type="text" placeholder="-" /></td>
            </tr>
        </tbody>
      </table>  
    </div>
  );
}

export default DPRReports;
