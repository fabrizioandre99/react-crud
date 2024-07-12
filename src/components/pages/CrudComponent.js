import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaSave, FaTimes, FaPlus, FaUserPlus } from 'react-icons/fa';

const CrudComponent = () => {
  const [users, setUsers] = useState([]);
  const [addValues, setAddValues] = useState({ name: '', email: '', phone: '' });
  const [editableUserId, setEditableUserId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [addErrors, setAddErrors] = useState({});
  const [editErrors, setEditErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const itemsPerPage = 3;

  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the users!', error);
      });
  }, []);

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

    console.log(addValues); // Verifica los datos que se envían

    axios.post('http://localhost:5000/api/users', addValues)
      .then(response => {
        console.log(response.data); // Verifica la respuesta del backend

        setUsers([...users, response.data]);
        setAddValues({ name: '', email: '', phone: '' });
        setAddErrors({});
        setShowAddForm(false);
      })
      .catch(error => {
        console.error('There was an error creating the user!', error);
      });
  };



  const handleEditSave = (user) => {
    const updatedUser = { ...user, ...editValues };
    const validationErrors = validateFields(updatedUser);
    if (Object.keys(validationErrors).length > 0) {
      setEditErrors(validationErrors);
      return;
    }

    axios.put(`http://localhost:5000/api/users/${user.id}`, updatedUser)
      .then(response => {
        setUsers(users.map(u => (u.id === user.id ? response.data : u)));
        setEditableUserId(null);
        setEditValues({});
        setEditErrors({});
      })
      .catch(error => {
        console.error('There was an error updating the user!', error);
      });
  };

  const handleEditChange = (e, field) => {
    setEditValues({ ...editValues, [field]: e.target.value });
  };

  const handleEdit = (user) => {
    setEditableUserId(user.id);
    setEditValues(user);
    setEditErrors({});
  };

  const handleCancelEdit = () => {
    setEditableUserId(null);
    setEditValues({});
    setEditErrors({});
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/users/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
      })
      .catch(error => {
        console.error('There was an error deleting the user!', error);
      });
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
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">User Management</h1>
      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition flex items-center mb-4"
      >
        <FaUserPlus className="mr-2" /> {showAddForm ? 'Hide Form' : 'Add New User'}
      </button>
      {showAddForm && (
        <form onSubmit={handleAddSubmit} className="space-y-4 p-4 bg-white dark:bg-darkCard shadow-md rounded-lg">
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
      <div className="mt-6 bg-white dark:bg-darkCard shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-darkCard divide-y divide-gray-200 dark:divide-gray-700">
            {currentItems.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4 whitespace-nowrap">
                  {editableUserId === user.id ? (
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
                    <span className="text-gray-900 dark:text-white">{user.name}</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editableUserId === user.id ? (
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
                    <span className="text-gray-900 dark:text-white">{user.email}</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editableUserId === user.id ? (
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
                    <span className="text-gray-900 dark:text-white">{user.phone}</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  {editableUserId === user.id ? (
                    <>
                      <button
                        onClick={() => handleEditSave(user)}
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
                        onClick={() => handleEdit(user)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition flex items-center"
                      >
                        <FaEdit className="mr-2" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
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
          <span className="text-gray-900 dark:text-white">Page {currentPage}</span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(users.length / itemsPerPage)}
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
