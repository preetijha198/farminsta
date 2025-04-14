import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../redux/actions';

const initialForm = {
  name: '',
  email: '',
  description: '',
  languages: '',
  education: '',
  specialization: '',
  twitter: '',
  instagram: '',
  imageUrl: ''
};

export default function AddUserForm() {
  const [formData, setFormData] = useState(initialForm);
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.description) {
      alert("Please fill in all required fields");
      return;
    }

    // Prevent duplicate emails
    const emailExists = users.some(user => user.email === formData.email);
    if (emailExists) {
      alert("A user with this email already exists.");
      return;
    }

    dispatch(addUser(formData));
    setFormData(initialForm);
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Add New Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name *"
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email *"
          required
          className="w-full border p-2 rounded"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description *"
          required
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

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Add User
        </button>

      </form>
    </div>
  );
}
