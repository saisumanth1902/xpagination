import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [employees, setEmployees] = useState([]); // State for all employees
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const employeesPerPage = 10; // Number of employees per page

  // Fetch employees on initial render
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
        );
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
        alert('failed to fetch data'); // Display alert on failure
      }
    };

    fetchEmployees();
  }, []); // Empty dependency array to run only on mount

  // Calculate total pages
  const totalPages = Math.ceil(employees.length / employeesPerPage);

  // Get employees for the current page
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  // Handle pagination
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="App">
      <h1>Employee Data Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePrevious}>Previous</button>
        <span>{currentPage}</span>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default App;