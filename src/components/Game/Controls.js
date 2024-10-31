// src/components/Game/Controls.jsx
import React from 'react';
import styled from 'styled-components';

const ControlsContainer = styled.div`
  margin: 20px 0;
  display: flex;
  gap: 20px;
`;

const ControlButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  background-color: #ff6347;
  color: white;
  border: none;
  border-radius: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #ff4500;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Controls = ({ onSubmit, onSkip }) => {
  return (
    <ControlsContainer>
      <ControlButton onClick={onSubmit}>Submit</ControlButton>
      <ControlButton onClick={onSkip}>Skip</ControlButton>
    </ControlsContainer>
  );
};

export default Controls;
