// src/components/pages/CrudComponent.js
import React, { useState } from 'react';
import { FaEdit, FaTrash, FaSave, FaTimes, FaPlus, FaUserPlus } from 'react-icons/fa';
// import './CrudComponent.css'; // Importar Tailwind CSS

const CrudComponent = () => {
  const initialItems = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210' },
    { id: 3, name: 'Michael Johnson', email: 'michael@example.com', phone: '555-123-4567' },
  ];

  const [items, setItems] = useState(initialItems);
  const [addValues, setAddValues] = useState({ name: '', email: '', phone: '' });
  const [editableItemId, setEditableItemId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [addErrors, setAddErrors] = useState({});
  const [editErrors, setEditErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const itemsPerPage = 3;

  const validateFields = (fields) => {
    const newErrors = {};
    if (!fields.name) newErrors.name = 'Name is required';
    if (!fields.email) newErrors.email = 'Email is required';
    if (!fields.phone) newErrors.phone = 'Phone number is required';
    return newErrors;
  };

  const handleSave = () => {
    const validationErrors = validateFields(addValues);
    if (Object.keys(validationErrors).length > 0) {
      setAddErrors(validationErrors);
      return;
    }

    setItems([...items, { ...addValues, id: Date.now() }]);
    setAddValues({ name: '', email: '', phone: '' });
    setAddErrors({});
    setShowAddForm(false);
  };

  const handleEditSave = (item) => {
    const updatedItem = { ...item, ...editValues };
    const validationErrors = validateFields(updatedItem);
    if (Object.keys(validationErrors).length > 0) {
      setEditErrors(validationErrors);
      return;
    }
    setItems(items.map((i) => (i.id === item.id ? updatedItem : i)));
    setEditableItemId(null);
    setEditValues({});
    setEditErrors({});
  };

  const handleEditChange = (e, field) => {
    setEditValues({ ...editValues, [field]: e.target.value });
  };

  const handleEdit = (item) => {
    setEditableItemId(item.id);
    setEditValues(item);
    setEditErrors({});
  };

  const handleCancelEdit = () => {
    setEditableItemId(null);
    setEditValues({});
    setEditErrors({});
  };

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleAddChange = (e, field) => {
    setAddValues({ ...addValues, [field]: e.target.value });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    handleSave();
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Customer Management</h1>
      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition flex items-center mb-4"
      >
        <FaUserPlus className="mr-2" /> {showAddForm ? 'Hide Form' : 'Add New Customer'}
      </button>
      {showAddForm && (
        <form onSubmit={handleAddSubmit} className="space-y-4 p-4 bg-white shadow-md rounded-lg">
          <div>
            <input
              type="text"
              placeholder="Name"
              value={addValues.name}
              onChange={(e) => handleAddChange(e, 'name')}
              className={`w-full px-3 py-2 border rounded ${addErrors.name ? 'border-red-500' : ''}`}
            />
            {addErrors.name && <span className="text-red-500">{addErrors.name}</span>}
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={addValues.email}
              onChange={(e) => handleAddChange(e, 'email')}
              className={`w-full px-3 py-2 border rounded ${addErrors.email ? 'border-red-500' : ''}`}
            />
            {addErrors.email && <span className="text-red-500">{addErrors.email}</span>}
          </div>
          <div>
            <input
              type="text"
              placeholder="Phone"
              value={addValues.phone}
              onChange={(e) => handleAddChange(e, 'phone')}
              className={`w-full px-3 py-2 border rounded ${addErrors.phone ? 'border-red-500' : ''}`}
            />
            {addErrors.phone && <span className="text-red-500">{addErrors.phone}</span>}
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition flex items-center">
            <FaPlus className="mr-2" /> Save
          </button>
        </form>
      )}
      <div className="mt-6 bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  {editableItemId === item.id ? (
                    <div>
                      <input
                        type="text"
                        value={editValues.name || ''}
                        onChange={(e) => handleEditChange(e, 'name')}
                        className={`w-full px-2 py-1 border rounded ${editErrors.name ? 'border-red-500' : ''}`}
                      />
                      {editErrors.name && <span className="text-red-500">{editErrors.name}</span>}
                    </div>
                  ) : (
                    item.name
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editableItemId === item.id ? (
                    <div>
                      <input
                        type="email"
                        value={editValues.email || ''}
                        onChange={(e) => handleEditChange(e, 'email')}
                        className={`w-full px-2 py-1 border rounded ${editErrors.email ? 'border-red-500' : ''}`}
                      />
                      {editErrors.email && <span className="text-red-500">{editErrors.email}</span>}
                    </div>
                  ) : (
                    item.email
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editableItemId === item.id ? (
                    <div>
                      <input
                        type="text"
                        value={editValues.phone || ''}
                        onChange={(e) => handleEditChange(e, 'phone')}
                        className={`w-full px-2 py-1 border rounded ${editErrors.phone ? 'border-red-500' : ''}`}
                      />
                      {editErrors.phone && <span className="text-red-500">{editErrors.phone}</span>}
                    </div>
                  ) : (
                    item.phone
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  {editableItemId === item.id ? (
                    <>
                      <button
                        onClick={() => handleEditSave(item)}
                        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition flex items-center"
                      >
                        <FaSave className="mr-2" /> Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600 transition flex items-center"
                      >
                        <FaTimes className="mr-2" /> Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(item)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition flex items-center"
                      >
                        <FaEdit className="mr-2" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition flex items-center"
                      >
                        <FaTrash className="mr-2" /> Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center p-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition disabled:opacity-50"
          >
            Previous
          </button>
          <span>Page {currentPage}</span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(items.length / itemsPerPage)}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrudComponent;
