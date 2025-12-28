import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import './UserForm.css';

interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  mobile: string;
}

const UserForm: React.FC = () => {
  const [formData, setFormData] = useState<UserData>({
    id: Date.now(),
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    mobile: ''
  });

  const [users, setUsers] = useState<UserData[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState<Partial<UserData>>({});

    // Import users from Excel file
    const handleImportExcel = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const importedUsers: any[] = XLSX.utils.sheet_to_json(worksheet);
        // Optionally validate imported data here
        for (const user of importedUsers) {
          await fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: Date.now() + Math.floor(Math.random() * 10000),
              firstName: user.firstName || '',
              lastName: user.lastName || '',
              email: user.email || '',
              password: user.password || '',
              mobile: user.mobile || ''
            }),
          });
        }
        fetchUsers();
      };
      reader.readAsArrayBuffer(file);
    };

    // Export users to Excel file
    const handleExportExcel = () => {
      const worksheet = XLSX.utils.json_to_sheet(users);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
      XLSX.writeFile(workbook, 'users_export.xlsx');
    };

    // Import users from file
    const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const importedUsers = JSON.parse(e.target?.result as string);
          if (Array.isArray(importedUsers)) {
            for (const user of importedUsers) {
              await fetch('http://localhost:3001/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
              });
            }
            fetchUsers();
          }
        } catch (err) {
          alert('Invalid file format');
        }
      };
      reader.readAsText(file);
    };

    // Export users to file
    const handleExport = () => {
      const dataStr = JSON.stringify(users, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'users_export.json';
      a.click();
      URL.revokeObjectURL(url);
    };

  // Fetch users when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3001/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const validateForm = () => {
    const newErrors: Partial<UserData> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number must be 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      if (editMode) {
        await fetch(`http://localhost:3001/users/${formData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        setEditMode(false);
      } else {
        await fetch('http://localhost:3001/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...formData, id: Date.now() }),
        });
      }

      // Refresh the users list
      await fetchUsers();

      // Reset form
      setFormData({
        id: Date.now(),
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        mobile: ''
      });
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleEdit = (user: UserData) => {
    setFormData(user);
    setEditMode(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:3001/users/${id}`, {
        method: 'DELETE',
      });
      await fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="user-form-container">
        <div style={{ marginBottom: '15px' }}>
          <button type="button" onClick={handleExportExcel} style={{ marginRight: '10px' }}>Export Users (Excel)</button>
          <label style={{ cursor: 'pointer' }}>
            Import Users (Excel)
            <input type="file" accept=".xlsx,.xls" style={{ display: 'none' }} onChange={handleImportExcel} />
          </label>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <button type="button" onClick={handleExport} style={{ marginRight: '10px' }}>Export Users</button>
          <label style={{ cursor: 'pointer' }}>
            Import Users
            <input type="file" accept="application/json" style={{ display: 'none' }} onChange={handleImport} />
          </label>
        </div>
      <form onSubmit={handleSubmit} className="form">
        <h2>{editMode ? 'Edit User' : 'Add User'}</h2>
        
        <div className="form-group">
          <input
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          />
          {errors.firstName && <span className="error">{errors.firstName}</span>}
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>

        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <div className="form-group">
          <input
            type="tel"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
          />
          {errors.mobile && <span className="error">{errors.mobile}</span>}
        </div>

        <button type="submit">{editMode ? 'Update' : 'Submit'}</button>
      </form>

      <div className="table-container">
        <h2>User List</h2>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>
                  <button onClick={() => handleEdit(user)} className="edit-btn">Edit</button>
                  <button onClick={() => handleDelete(user.id)} className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserForm;
