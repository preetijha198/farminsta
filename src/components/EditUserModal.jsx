import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../redux/actions';

export default function EditUserModal({ user, onClose }) {
  const [formData, setFormData] = useState(user);
  const dispatch = useDispatch();

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(formData));
    onClose(); // Close the modal after update
  };

  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4 text-blue-700 text-center">Edit Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto">

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full border p-2 rounded"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            disabled
            className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="languages"
            value={formData.languages}
            onChange={handleChange}
            placeholder="Languages (comma separated)"
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="education"
            value={formData.education}
            onChange={handleChange}
            placeholder="Education"
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            placeholder="Specialization"
            className="w-full border p-2 rounded"
          />

          <input
            type="url"
            name="twitter"
            value={formData.twitter}
            onChange={handleChange}
            placeholder="Twitter URL"
            className="w-full border p-2 rounded"
          />

          <input
            type="url"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
            placeholder="Instagram URL"
            className="w-full border p-2 rounded"
          />

          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Profile Image URL"
            className="w-full border p-2 rounded"
          />

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
