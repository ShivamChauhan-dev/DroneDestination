import React, { useState } from 'react';
import './RepairList.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const RepairList = () => {
    const initialRows = Array.from({ length: 10 }, (_, index) => ({ id: index + 1, data: {} }));
    const [rows, setRows] = useState(initialRows);
    const [showCheckboxes, setShowCheckboxes] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);


    const [formData, setFormData] = useState({
        Date: '',
        TypeOfItems: '',
        Brand: '',
        SerialNoProductId: '',
        Quantity: 0,
        RepairedStatus: '',
        Remark: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://drone-destination.onrender.com/Admin/repair-list', formData);
            console.log('RepairList inserted successfully.');
            toast.success('RepairList inserted successfully.');
            // Reset the form after successful submission
            setFormData({
                Date: '',
                TypeOfItems: '',
                Brand: '',
                SerialNoProductId: '',
                Quantity: 0,
                RepairedStatus: '',
                Remark: '',
            });
        } catch (error) {
            console.error('Error inserting data:', error);
        }
    };



    const addRow = () => {
        const newRow = { id: rows.length + 1, data: {} };
        setRows([...rows, newRow]);
    };

    const toggleCheckboxes = () => {
        setShowCheckboxes(!showCheckboxes);
        setSelectedRows([]); // Clear selected rows when toggling checkboxes
    };

    const deleteSelectedRows = () => {
        const updatedRows = rows.filter((_, index) => !selectedRows.includes(index));
        // Renumber the rows
        const renumberedRows = updatedRows.map((row, index) => ({ ...row, id: index + 1 }));
        setRows(renumberedRows);
        // Clear selected rows
        setSelectedRows([]);
    };

    const handleCheckboxChange = (index) => {
        if (selectedRows.includes(index)) {
            setSelectedRows(selectedRows.filter((i) => i !== index));
        } else {
            setSelectedRows([...selectedRows, index]);
        }
    };

    const handleInputChange = (rowIndex, columnName, value) => {
        const updatedRows = [...rows];
        updatedRows[rowIndex].data[columnName] = value;
        setRows(updatedRows);
    };

    return (
        <div className="Repair">
            <form onSubmit={handleSubmit}>
                <h2>Repair List</h2>
                <div className="Repair-list">
                    <table>
                        <thead>
                            <tr>
                                {showCheckboxes && <th>Select</th>}
                                <th>S.No.</th>
                                <th>Date</th>
                                <th>Type of Items</th>
                                <th>Brand</th>
                                <th>Serial No./Product Id</th>
                                <th>Quantity</th>
                                <th>Repaired Status</th>
                                <th>Remark</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, index) => (
                                <tr key={index}>
                                    {showCheckboxes && (
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.includes(index)}
                                                onChange={() => handleCheckboxChange(index)}
                                            />
                                        </td>
                                    )}
                                    <td>{row.id}</td>
                                    <td>
                                        {/* <input
                                            type="date"
                                            value={row.data.date || ''}
                                            onChange={(e) => handleInputChange(index, 'date', e.target.value)}
                                        /> */}
                                        <input
                                            type='date'
                                            name='Date'
                                            value={row.data.Date}
                                            onChange={(e) => {
                                                handleChange(e);
                                                handleInputChange(index, 'Date', e.target.value);
                                            }}
                                        />
                                    </td>
                                    <td>
                                        {/* <input
                                            type="text"
                                            value={row.data.typeofitems || ''}
                                            onChange={(e) => handleInputChange(index, 'typeofitems', e.target.value)}
                                        /> */}
                                        <input
                                            type='text'
                                            name='TypeOfItems'
                                            value={row.data.TypeOfItems}
                                            onChange={(e) => {
                                                handleChange(e);
                                                handleInputChange(index, 'TypeOfItems', e.target.value);
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type='text'
                                            name='Brand'
                                            value={row.data.Brand}
                                            onChange={(e) => {
                                                handleChange(e);
                                                handleInputChange(index, 'Brand', e.target.value);
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type='text'
                                            name='SerialNoProductId'
                                            value={row.data.SerialNoProductId}
                                            onChange={(e) => {
                                                handleChange(e);
                                                handleInputChange(index, 'SerialNoProductId', e.target.value);
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type='text'
                                            name='Quantity'
                                            value={row.data.Quantity}
                                            onChange={(e) => {
                                                handleChange(e);
                                                handleInputChange(index, 'Quantity', e.target.value);
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type='text'
                                            name='RepairedStatus'
                                            value={row.data.RepairedStatus}
                                            onChange={(e) => {
                                                handleChange(e);
                                                handleInputChange(index, 'RepairedStatus', e.target.value);
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type='text'
                                            name='Remark'
                                            value={row.data.Remark}
                                            onChange={(e) => {
                                                handleChange(e);
                                                handleInputChange(index, 'Remark', e.target.value);
                                            }}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="Repair-list">
                        {showCheckboxes ? (
                            <>
                                <button type="button" onClick={deleteSelectedRows}>
                                    Delete
                                </button>
                                <button type="button" onClick={() => setShowCheckboxes(false)}>
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button type="button" onClick={toggleCheckboxes}>
                                Delete
                            </button>
                        )}
                        <button type="button" onClick={addRow}>
                            Add
                        </button>
                    </div>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default RepairList;
