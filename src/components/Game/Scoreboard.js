// src/components/Game/Scoreboard.jsx
import React from 'react';
import styled from 'styled-components';

const ScoreboardContainer = styled.div`
  margin-bottom: 20px;
  font-size: 1.2rem;
`;

const Scoreboard = ({ wins }) => {
  return (
    <ScoreboardContainer>
      <strong>Wins:</strong> {wins}
    </ScoreboardContainer>
  );
};

export default Scoreboard;
