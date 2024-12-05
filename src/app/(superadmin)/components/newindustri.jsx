"use client"
import React, { useState } from 'react';

const NewIndustrieClient = () => {
  // State to hold the list of industries
  const [industries, setIndustries] = useState([{ title: '' }]);

  // Handle input change for a specific industry
  const handleInputChange = (index, value) => {
    const updatedIndustries = [...industries];
    updatedIndustries[index].title = value;
    setIndustries(updatedIndustries);
  };

  // Add a new industry input field
  const handleAddIndustry = () => {
    setIndustries([...industries, { title: '' }]);
  };

  // Remove an industry input field
  const handleRemoveIndustry = (index) => {
    const updatedIndustries = industries.filter((_, i) => i !== index);
    setIndustries(updatedIndustries);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Filter out empty titles
    const validIndustries = industries.filter((industry) => industry.title.trim() !== '');

    try {
      const response = await fetch('/api/industries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ industries: validIndustries }),
      });

      if (response.ok) {
        alert('Industries created successfully!');
        setIndustries([{ title: '' }]); // Reset form
      } else {
        const errorData = await response.json();
        console.error('Error creating industries:', errorData);
        alert('Failed to create industries.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while creating industries.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Create Industries</h1>
      <form onSubmit={handleSubmit}>
        {industries.map((industry, index) => (
          <div key={index} className="mb-4 flex items-center">
            <input
              type="text"
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Enter your Industry title`}
              value={industry.title}
              onChange={(e) => handleInputChange(index, e.target.value)}
              required
            />
            {industries.length > 1 && (
              <button
                type="button"
                className="ml-2 text-red-500 hover:text-red-700"
                onClick={() => handleRemoveIndustry(index)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-300 mb-4"
          onClick={handleAddIndustry}
        >
          Add Another Industry
        </button>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Submit Industries
        </button>
      </form>
    </div>
  );
};

export default NewIndustrieClient;
