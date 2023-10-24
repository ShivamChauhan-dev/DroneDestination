import React from 'react';
import { Link } from 'react-router-dom';
import "./comprehensiveReport.css";

function ComprehensiveReport() {
  // Dummy data for demonstration
  const totalgiven = "";
  const totalcovered = "";
  const todayscoverage = "";
  const totalremaining = "";

  return (
    <div className="custom-reports-container">
      <form>
        <h2>Comprehensive Reports</h2>
        <table border="10" align="center">
          <tbody>
            <tr>
              <td>
                <label htmlFor="totalgiven">Total Given:</label>
              </td>
              <td>
                <textarea id="totalgiven" readOnly value={totalgiven} />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="totalcovered">Total Covered Till Date:</label>
              </td>
              <td>
                <textarea id="totalcovered" readOnly value={totalcovered} />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="todayscoverage">Todays Coverage:</label>
              </td>
              <td>
                <textarea id="todayscoverage" readOnly value={todayscoverage} />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="totalremaining">Todays Remaining:</label>
              </td>
              <td>
                <textarea id="totalremaining" readOnly value={totalremaining} />
              </td>
            </tr>
          </tbody>
        </table>
        <Link to="/mobilizationsummary">
          <button type="submit">Next</button>
        </Link>
      </form>
    </div>
  );
}

export default ComprehensiveReport;
