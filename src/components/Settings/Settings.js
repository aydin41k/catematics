// src/components/Settings/Settings.jsx
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { SettingsContext } from '../../context/SettingsContext';

const SettingsContainer = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const CheckboxLabel = styled.label`
  display: block;
  margin-bottom: 8px;
`;

const RadioLabel = styled.label`
  display: block;
  margin-bottom: 8px;
`;

const SaveButton = styled.button`
  padding: 10px 20px;
  background-color: #ff6347;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #ff4500;
  }
`;

const Settings = () => {
  const { problemTypes, setProblemTypes, difficulty, setDifficulty } =
    useContext(SettingsContext);
  const [selectedTypes, setSelectedTypes] = useState(problemTypes);
  const [selectedDifficulty, setSelectedDifficulty] = useState(difficulty);

  const allProblemTypes = [
    { label: 'Addition', value: 'addition' },
    { label: 'Subtraction', value: 'subtraction' },
    { label: 'Multiplication', value: 'multiplication' },
    { label: 'Squares', value: 'squares' },
    { label: 'Square Roots', value: 'squareRoots' },
    { label: 'Basic Equations', value: 'basicEquations' },
  ];

  const handleTypeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedTypes((prev) => [...prev, value]);
    } else {
      setSelectedTypes((prev) => prev.filter((type) => type !== value));
    }
  };

  const handleDifficultyChange = (e) => {
    setSelectedDifficulty(e.target.value);
  };

  const handleSave = () => {
    setProblemTypes(selectedTypes);
    setDifficulty(selectedDifficulty);
    alert('Settings saved successfully!');
  };

  return (
    <SettingsContainer>
      <h2>Settings</h2>
      <Section>
        <h3>Select Math Problem Types</h3>
        {allProblemTypes.map((type) => (
          <CheckboxLabel key={type.value}>
            <input
              type="checkbox"
              value={type.value}
              checked={selectedTypes.includes(type.value)}
              onChange={handleTypeChange}
            />
            {` ${type.label}`}
          </CheckboxLabel>
        ))}
      </Section>
      <Section>
        <h3>Select Difficulty Level</h3>
        <RadioLabel>
          <input
            type="radio"
            name="difficulty"
            value="easy"
            checked={selectedDifficulty === 'easy'}
            onChange={handleDifficultyChange}
          />
          Easy
        </RadioLabel>
        <RadioLabel>
          <input
            type="radio"
            name="difficulty"
            value="medium"
            checked={selectedDifficulty === 'medium'}
            onChange={handleDifficultyChange}
          />
          Medium
        </RadioLabel>
        <RadioLabel>
          <input
            type="radio"
            name="difficulty"
            value="hard"
            checked={selectedDifficulty === 'hard'}
            onChange={handleDifficultyChange}
          />
          Hard
        </RadioLabel>
      </Section>
      <SaveButton onClick={handleSave}>Save Settings</SaveButton>
    </SettingsContainer>
  );
};

export default Settings;
