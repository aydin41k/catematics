// src/components/SplashScreen/SplashScreen.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SplashContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  text-align: center;
`;

const StartButton = styled.button`
  padding: 10px 20px;
  font-size: 1.2rem;
  margin-top: 20px;
  cursor: pointer;
`;

const SplashScreen = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/game');
  };

  return (
    <SplashContainer>
      <h1>Welcome to Math Challenges!</h1>
      <p>Solve math problems using adorable cats.</p>
      <StartButton onClick={handleStart}>Start Game</StartButton>
    </SplashContainer>
  );
};

export default SplashScreen;
