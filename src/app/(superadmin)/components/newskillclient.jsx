"use client"
import React, { useState } from 'react';

const NewSkillClient = () => {
  // State to hold the list of skills
  const [skills, setSkills] = useState([{ title: '' }]);

  // Handle input change for a specific skill
  const handleInputChange = (index, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index].title = value;
    setSkills(updatedSkills);
  };

  // Add a new skill input field
  const handleAddSkill = () => {
    setSkills([...skills, { title: '' }]);
  };

  // Remove a skill input field
  const handleRemoveSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Filter out empty titles
    const validSkills = skills.filter((skill) => skill.title.trim() !== '');

    try {
      const response = await fetch('/api/skills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ skills: validSkills }),
      });

      if (response.ok) {
        alert('Skills created successfully!');
        setSkills([{ title: '' }]); // Reset form
      } else {
        const errorData = await response.json();
        console.error('Error creating skills:', errorData);
        alert('Failed to create skills.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while creating skills.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Create Skills</h1>
      <form onSubmit={handleSubmit}>
        {skills.map((skill, index) => (
          <div key={index} className="mb-4 flex items-center">
            <input
              type="text"
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Enter your Skill title`}
              value={skill.title}
              onChange={(e) => handleInputChange(index, e.target.value)}
              required
            />
            {skills.length > 1 && (
              <button
                type="button"
                className="ml-2 text-red-500 hover:text-red-700"
                onClick={() => handleRemoveSkill(index)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-300 mb-4"
          onClick={handleAddSkill}
        >
          Add Another Skill
        </button>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Submit Skills
        </button>
      </form>
    </div>
  );
};

export default NewSkillClient;
