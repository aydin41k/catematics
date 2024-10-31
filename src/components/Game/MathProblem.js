// src/components/Game/MathProblem.jsx
import React from 'react';
import styled from 'styled-components';

const ProblemContainer = styled.div`
  margin: 20px 0;
  font-size: 1.5rem;
`;

const MathProblem = ({ question }) => {
  return (
    <ProblemContainer>
      <h2>{question}</h2>
    </ProblemContainer>
  );
};

export default MathProblem;
