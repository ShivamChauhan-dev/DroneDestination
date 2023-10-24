import React, { useState } from 'react';
import './IndentForm.css';


const IndentForm = () => {
  const [rows, setRows] = useState(Array.from({ length: 5 }, (_, index) => ({ id: index + 1 })));

  const addRow = () => {
    const newRow = { id: rows.length + 1 };
    setRows([...rows, newRow]);
  };

  const deleteLastRow = () => {
    if (rows.length > 0) {
      const updatedRows = rows.slice(0, -1);
      setRows(updatedRows);
    }
  };
  
  return (
    <div className="indent-form">
      <h2>DD Indent Form</h2>
      <div className="form-group-1">
        <label htmlFor="referenceNumber">Reference Number:</label>
        <input type="text" id="referenceNumber" name="referenceNumber" />
      </div>
      <div className="form-department">
        <label htmlFor="department">Department:</label>
        <input type="text" id="department" name="department" />
      </div>
      <div className="form-date">
        <label htmlFor="selectDate">Date:</label>
        <input type="date" id="selectDate" name="selectDate" />
      </div>
      <div className="form-productdescription">
        <label htmlFor="productDescription">Product Description and Reason:</label>
        <textarea name="productDescription" id="productDescription"></textarea>
      </div>
      <div className="tabel-form">
        <table>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Item</th>
              <th>QTY</th>
              <th>Unit Price*</th>
              <th>Amount Excluding Tax*</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
             {rows.map((row, index) => (
              <tr key={index}>
                <td>{row.id}</td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="group-button">
          <button onClick={addRow}>Add</button>
          <button onClick={deleteLastRow}>Delete</button>
        </div>
        <div className="total-group">
          <label htmlFor="total">Total</label>
          <input type="text" id="Amount Excluding" name="Amount Excluding" />
          <input type="text" id="Remarks" name="Remarks" />
        </div>
      </div>
      <div class="center-text">
        ( Please mention amount is including or exclusive of tax )
      </div>
      <div className="signature-form">
        <div>
          <label for="preparedBy">Prepared By:</label>
          <input type="text" id="preparedBy" name="preparedBy" />
        </div>
        <div>
          <label for="checkedBy">Checked By:</label>
          <input type="text" id="checkedBy" name="checkedBy" />
        </div>
        <div>
          <label for="approvedBy">Approved By:</label>
          <input type="text" id="approvedBy" name="approvedBy" />
        </div>
      </div>
      <div class="Payment-text">
        ( Payment )
      </div>
      <div className="payment-form">
        <div>
          <label for="checkedBy">Self:</label>
          <input type="text" id="checkedBy" name="checkedBy" />
        </div>
        <div>
          <label for="approvedBy">Account:</label>
          <input type="text" id="approvedBy" name="approvedBy" />
        </div>
      </div>
    </div>
  );
};

export default IndentForm;
