import React, { useState } from 'react';
import './CurrentInventory.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const CurrentInventory = () => {
  const initialRows = Array.from({ length: 5 }, (_, index) => ({ id: index + 1, data: {} }));
  const [rows, setRows] = useState(initialRows);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const addRow = () => {
    const newRow = { id: rows.length + 1, data: {} };
    setRows([...rows, newRow]);
  };

  const [formData, setFormData] = useState({
    Category: '',
    SubCategory: '',
    Abbreviation: '',
    Make: '',
    Quantity: '',
    ModelProductNo: '',
    SerialNoProductID: '',
    Product: '',
    InternalSINo: '',
    SKUCode: '',
    USBnetwork: '',
    Status: '',
    Dept: '',
    Location: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataWithSKU = {
        ...formData,
        SKUCode: generateSKUCode(rows[0]), // Assuming you want to use the SKU code from the first row
      };

      await axios.post('http://localhost:5000/Admin/inventories', formDataWithSKU);

      console.log('Inventory inserted successfully.');
      toast.success('Inventory inserted successfully.');
      setFormData({
        Category: '',
        SubCategory: '',
        Abbreviation: '',
        Make: '',
        Quantity: '',
        ModelProductNo: '',
        SerialNoProductID: '',
        Product: '',
        InternalSINo: '',
        SKUCode: '',
        USBnetwork: '',  
        Status: '',
        Dept: '',
        Location: '',
      });
    } catch (error) {
      console.error('An error occurred:', error);
    }
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

  const handleRowSelect = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((rowIndex) => rowIndex !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  const handleInputChange = (rowIndex, columnName, value) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex].data[columnName] = value;
    setRows(updatedRows);
  };

  const generateSKUCode = (row) => {
    const { data } = row;
    const category = data.Category || '';
    const abbreviation = data.Abbreviation || '';
    const internalSlNo = data.InternalSINo || '';
    const serialNo = data.SerialNoProductID || ''; // Corrected property name
    const lastThreeSerialNo = serialNo.slice(-3);
    const skuCode = `DD/${category}/${abbreviation}/${internalSlNo}/${lastThreeSerialNo}`;
    return skuCode.replace(/\/+/g, '/'); // Remove any duplicate slashes if present
  };

  return (
    <div className="current-inventory">
      <form onSubmit={handleSubmit}>
        <h2>Inventories</h2>
        <div className="inventory">
          <table>
            <thead>
              <tr>
                {showCheckboxes && <th>Select</th>}
                <th>S.No.</th>
                <th>Category</th>
                <th>Internal SI.No.</th>
                <th>Make</th>
                <th>Quantity</th>
                <th>Model</th>
                <th>Abbreviation</th>
                <th>Serial No.</th>
                <th>Product No.</th>
                <th>SKU Code</th>
                <th>USB/Network</th>
                <th>Status</th>
                <th>Dept.</th>
                <th>Location</th>
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
                        onChange={() => handleRowSelect(index)}
                      />
                    </td>
                  )}
                  <td>{row.id}</td>
                  <td>
                    <input
                      type="text"
                      name='Category'
                      value={row.data.Category || ''}
                      onChange={(e) => {
                        handleChange(e);
                        handleInputChange(index, 'Category', e.target.value);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name='InternalSINo'
                      value={row.data.InternalSINo || ''}
                      onChange={(e) => {
                        handleChange(e);
                        handleInputChange(index, 'InternalSINo', e.target.value);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name='Make'
                      value={row.data.Make || ''}
                      onChange={(e) => {
                        handleChange(e);
                        handleInputChange(index, 'Make', e.target.value);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name='Quantity'
                      value={row.data.Quantity || ''}
                      onChange={(e) => {
                        handleChange(e);
                        handleInputChange(index, 'Quantity', e.target.value);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name='ModelProductNo'
                      value={row.data.ModelProductNo || ''}
                      onChange={(e) => {
                        handleChange(e);
                        handleInputChange(index, 'ModelProductNo', e.target.value);
                      }}
                    />
                  </td>
                  {/* <td>
                    <input
                      type="text"
                      name='SubCategory'
                      value={row.data.SubCategory || ''}
                      onChange={(e) => {
                        handleChange(e);
                        handleInputChange(index, 'SubCategory', e.target.value);
                      }}
                    />
                  </td> */}
                  <td>
                    <input
                      type="text"
                      name='Abbreviation'
                      value={row.data.Abbreviation || ''}
                      onChange={(e) => {
                        handleChange(e);
                        handleInputChange(index, 'Abbreviation', e.target.value);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name='SerialNoProductID'
                      value={row.data.SerialNoProductID || ''}
                      onChange={(e) => {
                        handleChange(e);
                        handleInputChange(index, 'SerialNoProductID', e.target.value);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name='Product'
                      value={row.data.Product || ''}
                      onChange={(e) => {
                        handleChange(e);
                        handleInputChange(index, 'Product', e.target.value);
                      }}
                    />
                  </td>

                  <td>
                    <td>
                      <input
                        type="text"
                        name='SKUCode' // Corrected name attribute
                        value={generateSKUCode(row)} // Populate SKU Code based on other fields
                        readOnly // Make SKU Code input field read-only
                        onChange={(e) => {
                          handleChange(e);
                          // handleInputChange(index,'SKUCode', e.target.value);
                        }}
                      />
                    </td>
                  </td>
                  <td>
                    <input
                      type="text"
                      name='USBnetwork'
                      value={row.data.USBnetwork || ''}
                      onChange={(e) => {
                        handleChange(e);
                        handleInputChange(index, 'USBnetwork', e.target.value);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name='Status'
                      value={row.data.Status || ''}
                      onChange={(e) => {
                        handleChange(e);
                        handleInputChange(index, 'Status', e.target.value);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name='Dept'
                      value={row.data.Dept || ''}
                      onChange={(e) => {
                        handleChange(e);
                        handleInputChange(index, 'Dept', e.target.value);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name='Location'
                      value={row.data.Location || ''}
                      onChange={(e) => {
                        handleChange(e);
                        handleInputChange(index, 'Location', e.target.value);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="inventory-button">
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

export default CurrentInventory;





// import React, { useState } from 'react';
// import './CurrentInventory.css';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const CurrentInventory = () => {
//   const initialRows = Array.from({ length: 5 }, (_, index) => ({ id: index + 1, data: {} }));
//   const [rows, setRows] = useState(initialRows);
//   const [showCheckboxes, setShowCheckboxes] = useState(false);
//   const [selectedRows, setSelectedRows] = useState([]);

//   const addRow = () => {
//     const newRow = { id: rows.length + 1, data: {} };
//     setRows([...rows, newRow]);
//   };



//   const [formData, setFormData] = useState({
//     Category: '',
//     SubCategory: '',
//     Abbreviation: '',
//     Make: '',
//     ModelProductNo: '',
//     SerialNoProductID: '',
//     Dept: '',
//     InternalSINo: '',
//     SKUCode: '',
//     Name: '',
//     Remark: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/Admin/inventories', formData);
//       console.log('Inventory inserted successfully.');
//       toast.success('Inventory inserted successfully.');
//       setFormData({
//         Category: '',
//         SubCategory: '',
//         Abbreviation: '',
//         Make: '',
//         ModelProductNo: '',
//         SerialNoProductID: '',
//         Dept: '',
//         InternalSINo: 0,
//         SKUCode: '',
//         Name: '',
//         Remark: '',
//       });
//     } catch (error) {
//       console.error('An error occurred.:', error);
//     }
//   };


//   const toggleCheckboxes = () => {
//     setShowCheckboxes(!showCheckboxes);
//     setSelectedRows([]); // Clear selected rows when toggling checkboxes
//   };

//   const deleteSelectedRows = () => {
//     const updatedRows = rows.filter((_, index) => !selectedRows.includes(index));
//     // Renumber the rows
//     const renumberedRows = updatedRows.map((row, index) => ({ ...row, id: index + 1 }));
//     setRows(renumberedRows);
//     // Clear selected rows
//     setSelectedRows([]);
//   };

//   const handleRowSelect = (index) => {
//     if (selectedRows.includes(index)) {
//       setSelectedRows(selectedRows.filter((rowIndex) => rowIndex !== index));
//     } else {
//       setSelectedRows([...selectedRows, index]);
//     }
//   };

//   const handleInputChange = (rowIndex, columnName, value) => {
//     const updatedRows = [...rows];
//     updatedRows[rowIndex].data[columnName] = value;
//     setRows(updatedRows);
//   };

//   const generateSKUCode = (row) => {
//     const { data } = row;
//     const category = data.category || '';
//     const abbreviation = data.abbreviation || '';
//     const internalSlNo = data.internalSlNo || '';
//     const serialNo = data.serialNo || '';
//     const lastThreeSerialNo = serialNo.slice(-3);
//     const skuCode = `DD/${category}/${abbreviation}/${internalSlNo}/${lastThreeSerialNo}`;
//     return skuCode.replace(/\/+/g, '/'); // Remove any duplicate slashes if present
//   };



//   return (
//     <div className="current-inventory">
//       <form onSubmit={handleSubmit}>
//         <h2>Inventories</h2>
//         <div className="inventory">
//           <table>
//             <thead>
//               <tr>
//                 {showCheckboxes && <th>Select</th>}
//                 <th>S.No.</th>
//                 <th>Category</th>
//                 <th>Sub Category</th>
//                 <th>Abbreviation</th>
//                 <th>Make</th>
//                 <th>Model/Product No.</th>
//                 <th>Serial No./Product ID</th>
//                 <th>Dept.</th>
//                 <th>Internal SI.No.</th>
//                 <th>SKU Code</th>
//                 <th>Name</th>
//                 <th>Remark</th>
//               </tr>
//             </thead>
//             <tbody>
//               {rows.map((row, index) => (
//                 <tr key={index}>
//                   {showCheckboxes && (
//                     <td>
//                       <input
//                         type="checkbox"
//                         checked={selectedRows.includes(index)}
//                         onChange={() => handleRowSelect(index)}
//                       />
//                     </td>
//                   )}
//                   <td>{row.id}</td>
//                   <td>
//                     <input
//                       type="text"
//                       name='Category'
//                       value={row.data.Category || ''}
//                       onChange={(e) => {
//                         handleChange(e);
//                         handleInputChange(index, 'Category', e.target.value);
//                       }}
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       name='SubCategory'
//                       value={row.data.SubCategory || ''}
//                       onChange={(e) => {
//                         handleChange(e);
//                         handleInputChange(index, 'SubCategory', e.target.value);
//                       }}
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       name='Abbreviation'
//                       value={row.data.Abbreviation || ''}
//                       onChange={(e) => {
//                         handleChange(e);
//                         handleInputChange(index, 'Abbreviation', e.target.value);
//                       }}
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       name='Make'
//                       value={row.data.Make || ''}
//                       onChange={(e) => {
//                         handleChange(e);
//                         handleInputChange(index, 'Make', e.target.value);
//                       }}
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       name='ModelProductNo'
//                       value={row.data.ModelProductNo || ''}
//                       onChange={(e) => {
//                         handleChange(e);
//                         handleInputChange(index, 'ModelProductNo', e.target.value);
//                       }}
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       name='SerialNoProductID'
//                       value={row.data.SerialNoProductID || ''}
//                       onChange={(e) => {
//                         handleChange(e);
//                         handleInputChange(index, 'SerialNoProductID', e.target.value);
//                       }}
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       name='Dept'
//                       value={row.data.Dept || ''}
//                       onChange={(e) => {
//                         handleChange(e);
//                         handleInputChange(index, 'Dept', e.target.value);
//                       }}
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       name='InternalSINo'
//                       value={row.data.InternalSINo || ''}
//                       onChange={(e) => {
//                         handleChange(e);
//                         handleInputChange(index, 'InternalSINo', e.target.value);
//                       }}
//                     />
//                   </td>
//                   <td>
//                     <td>
//                       <input
//                         type="text"
//                         name='SKUCode'
//                         value={generateSKUCode(row)} // Populate SKU Code based on other fields
//                         readOnly // Make SKU Code input field read-only
//                       />
//                     </td>

//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       name='Name'
//                       value={row.data.Name || ''}
//                       onChange={(e) => {
//                         handleChange(e);
//                         handleInputChange(index, 'Name', e.target.value);
//                       }}
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       name='Remark'
//                       value={row.data.Remark || ''}
//                       onChange={(e) => {
//                         handleChange(e);
//                         handleInputChange(index, 'Remark', e.target.value);
//                       }}
//                     />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <div className="inventory-button">
//             {showCheckboxes ? (
//               <>
//                 <button type="button" onClick={deleteSelectedRows}>
//                   Delete
//                 </button>
//                 <button type="button" onClick={() => setShowCheckboxes(false)}>
//                   Cancel
//                 </button>
//               </>
//             ) : (
//               <button type="button" onClick={toggleCheckboxes}>
//                 Delete
//               </button>
//             )}
//             <button type="button" onClick={addRow}>
//               Add
//             </button>
//           </div>
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default CurrentInventory;














// import React, { useState } from 'react';
// import './CurrentInventory.css';

// const CurrentInventory = () => {
//     const [rows, setRows] = useState(Array.from({ length: 5 }, (_, index) => ({ id: index + 1 })));

//   const addRow = () => {
//     const newRow = { id: rows.length + 1 };
//     setRows([...rows, newRow]);
//   };

//   const deleteLastRow = () => {
//     if (rows.length > 0) {
//       const updatedRows = rows.slice(0, -1);
//       setRows(updatedRows);
//     }
//   };
//   return (
//     <div className="current-inventory">
//         <h2>Inventories</h2>
//       <div className="inventory">
//         <table>
//           <thead>
//             <tr>
//               <th>S.No.</th>
//               <th>Category</th>
//   <th>Sub Category</th>
//   <th>Abbreviation</th>
//   <th>Make</th>
//   <th>Model / Product Number</th>
//   <th>Serial No./Product id</th>
//   <th>Dept.</th>
//   <th>Internal Sl. No.</th>
//   <th>SKU Code</th>
//   <th>Name</th>
//   <th>Remark</th>
//             </tr>
//           </thead>
//           <tbody>
//              {rows.map((row, index) => (
//               <tr key={index}>
//                 <td>{row.id}</td>
//                 <td><input type="text" /></td>
//                 <td><input type="text" /></td>
//                 <td><input type="text" /></td>
//                 <td><input type="text" /></td>
//                 <td><input type="text" /></td>
//                 <td><input type="text" /></td>
//                 <td><input type="text" /></td>
//                 <td><input type="text" /></td>
//                 <td><input type="text" /></td>
//                 <td><input type="text" /></td>
//                 <td><input type="text" /></td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div className="inventory-button">
//           <button onClick={addRow}>Add</button>
//           <button onClick={deleteLastRow}>Delete</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CurrentInventory;



























// import React, { useState } from 'react';
// import './CurrentInventory.css';

// const CurrentInventory = () => {
//     const initialRows = Array.from({ length: 5 }, (_, index) => ({ id: index + 1 }));
//     const [rows, setRows] = useState(initialRows);
//     const [showCheckboxes, setShowCheckboxes] = useState(false);
//     const [selectedRows, setSelectedRows] = useState([]);

//     const addRow = () => {
//         const newRow = { id: rows.length + 1 };
//         setRows([...rows, newRow]);
//     };

//     const toggleCheckboxes = () => {
//         setShowCheckboxes(!showCheckboxes);
//         setSelectedRows([]); // Clear selected rows when toggling checkboxes
//     };

//     const deleteSelectedRows = () => {
//         const updatedRows = rows.filter((_, index) => !selectedRows.includes(index));
//         setRows(updatedRows.map((row, index) => ({ ...row, id: index + 1 }))); // Renumber rows
//         // Clear selected rows
//         setSelectedRows([]);
//     };

//     const handleRowSelect = (index) => {
//         if (selectedRows.includes(index)) {
//             setSelectedRows(selectedRows.filter((rowIndex) => rowIndex !== index));
//         } else {
//             setSelectedRows([...selectedRows, index]);
//         }
//     };

//     return (
//         <div className="current-inventory">
//             <h2>Inventories</h2>
//             <div className="inventory">
//                 <table>
//                     <thead>
//                         <tr>
//                             {showCheckboxes && <th>Select</th>}
//                             <th>S.No.</th>
//                             <th>Category</th>
//                             <th>Sub Category</th>
//                             <th>Abbreviation</th>
//                             <th>Make</th>
//                             <th>Model / Product Number</th>
//                             <th>Serial No./Product id</th>
//                             <th>Dept.</th>
//                             <th>Internal Sl. No.</th>
//                             <th>SKU Code</th>
//                             <th>Name</th>
//                             <th>Remark</th>            </tr>
//                     </thead>
//                     <tbody>
//                         {rows.map((row, index) => (
//                             <tr key={index}>
//                                 {showCheckboxes && (
//                                     <td>
//                                         <input
//                                             type="checkbox"
//                                             checked={selectedRows.includes(index)}
//                                             onChange={() => handleRowSelect(index)}
//                                         />
//                                     </td>
//                                 )}
//                                 <td>{row.id}</td>
//                                 <td><input type="text" /></td>
//                                 <td><input type="text" /></td>
//                                 <td><input type="text" /></td>
//                                 <td><input type="text" /></td>
//                                 <td><input type="text" /></td>
//                                 <td><input type="text" /></td>
//                                 <td><input type="text" /></td>
//                                 <td><input type="text" /></td>
//                                 <td><input type="text" /></td>
//                                 <td><input type="text" /></td>
//                                 <td><input type="text" /></td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//                 <div className="inventory-button">
//                     {showCheckboxes ? (
//                         <>
//                             <button onClick={deleteSelectedRows}>Delete</button>
//                             <button onClick={() => setShowCheckboxes(false)}>Cancel</button>
//                         </>
//                     ) : (
//                         <button onClick={toggleCheckboxes}>Delet</button>
//                     )}
//                     <button onClick={addRow}>Add</button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CurrentInventory;
