'use client';
import { useState } from 'react';

export default function CreateUserForm() {
  const [formData, setFormData] = useState({
    username: '',
    givenname: '',
    surname: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://192.168.2.134:3000/create_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.success);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} required />
      </div>
      <div>
        <label>Given Name:</label>
        <input type="text" name="givenname" value={formData.givenname} onChange={handleChange} required />
      </div>
      <div>
        <label>Surname:</label>
        <input type="text" name="surname" value={formData.surname} onChange={handleChange} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
      </div>
      <button type="submit">Create User</button>
    </form>
  );
}
