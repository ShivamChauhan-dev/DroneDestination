import React, { useState } from 'react';
import './TenderDetails.css';

const Tender = () => {
  const [formData, setFormData] = useState({
    slNo: '',
    tenderTitle: '',
    department: '',
    modeOfSubmission: '',
    location: '',
    dateOfSubmission: '',
    emd: '',
    dateOfBidOpening: '',
    ourParticipationStatus: '',
    reasonForNonParticipation: '',
    l1: '',
    l2: '',
    l3: '',
    l4: '',
    l5: '',
    remarks: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Here, you can perform actions with the form data, such as sending it to an API or displaying it
    console.log('Form Data Submitted:', formData);
  };

  return (
    <div className="TENDER-container">
      <h2>Tender Details</h2>
      <form onSubmit={handleSubmit}>
      <div className="Tender-SL">
            <label htmlFor="slNo">Sl.No :</label>
            <input
              type="text"
              id="slNo"
              name="slNo" 
              value={formData.slNo}
              onChange={handleChange}
              placeholder="Sl.No."
            />
          </div>
          <div className="Tender-TITLE">
            <label htmlFor="tenderTitle">Tender Title :</label>
            <input
              type="text"
              id="tenderTitle"
              name="tenderTitle"
              value={formData.tenderTitle}
              onChange={handleChange}
              placeholder="Tender Title"
            />
          </div>
          <div className="Tender-DEPARTMENT">
            <label htmlFor="department">Department :</label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="Department"
            />
          </div>
          <div className="Tender-MOS">
            <label htmlFor="modeOfSubmission">Mode of Submission :</label>
            <input
              type="text"
              id="modeOfSubmission"
              name="modeOfSubmission"
              value={formData.modeOfSubmission}
              onChange={handleChange}
              placeholder="Mode of Submission"
            />
          </div>
          <div className="Tender-LOCATION">
            <label htmlFor="location">Location :</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
            />
          </div>
          <div className="Tender-DOS">
            <label htmlFor="dateOfSubmission">Date of Submission :</label>
            <input
              type="text"
              id="dateOfSubmission"
              name="dateOfSubmission"
              value={formData.dateOfSubmission}
              onChange={handleChange}
              placeholder="Date of Submission"
            />
          </div>
          <div className="Tender-EMD">
            <label htmlFor="emd">EMD :</label>
            <input
              type="text"
              id="emd"
              name="emd"
              value={formData.emd}
              onChange={handleChange}
              placeholder="EMD"
            />
          </div>
          <div className="Tender-DOBP">
            <label htmlFor="dateOfBidOpening">Date of Bid Opening :</label>
            <input
              type="text"
              id="dateOfBidOpening"
              name="dateOfBidOpening"
              value={formData.dateOfBidOpening}
              onChange={handleChange}
              placeholder="Date of Bid Opening"
            />
          </div>
          <div className="Tender-OPS">
            <label htmlFor="ourParticipationStatus">Our Participation Status :</label>
            <input
              type="text"
              id="ourParticipationStatus"
              name="ourParticipationStatus"
              value={formData.ourParticipationStatus}
              onChange={handleChange}
              placeholder="Our Participation Status"
            />
          </div>
          <div className="Tender-RFNP">
            <label htmlFor="reasonForNonParticipation">Reason for Non Participation :</label>
            <input
              type="text"
              id="reasonForNonParticipation"
              name="reasonForNonParticipation"
              value={formData.reasonForNonParticipation}
              onChange={handleChange}
              placeholder="Reason for Non Participation"
            />
          </div>
          <div className="Tender-L1">
            <label htmlFor="l1">L1 :</label>
            <input
              type="text"
              id="l1"
              name="l1"
              value={formData.l1}
              onChange={handleChange}
              className="Tender-L1"
              placeholder="L1"
            />
          </div>
          <div className="Tender-L2">
            <label htmlFor="l2">L2 :</label>
            <input
              type="text"
              id="l2"
              name="l2"
              value={formData.l2}
              onChange={handleChange}
              placeholder="L2"
            />
          </div>
          <div className="Tender-L3">
            <label htmlFor="l3">L3 :</label>
            <input
              type="text"
              id="l3"
              name="l3"
              value={formData.l3}
              onChange={handleChange}
              placeholder="L3"
            />
          </div>
          <div className="Tender-L1">
            <label htmlFor="l4">L4 :</label>
            <input
              type="text"
              id="l4"
              name="l4"
              value={formData.l4}
              onChange={handleChange}
              placeholder="L4"
            />
          </div>
          <div className="Tender-L1">
            <label htmlFor="l5">L5 :</label>
            <input
              type="text"
              id="l5"
              name="l5"
              value={formData.l5}
              onChange={handleChange}
              placeholder="L5"
            />
          </div>
          <div className="Tender-REMARK">
            <label htmlFor="remarks">Remarks :</label>
            <input
              type="text"
              id="remarks"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              placeholder="Remarks"
            />
          </div>
        <button type="submit" className="Tender-button">Submit</button>
      </form>
    </div>
  );
};

export default Tender;
