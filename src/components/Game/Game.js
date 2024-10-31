// src/components/Game/Game.jsx
import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import MathProblem from './MathProblem';
import CatIcons from './CatIcons';
import Bucket from './Bucket';
import Controls from './Controls';
import Feedback from './Feedback';
import Scoreboard from './Scoreboard';
import { SettingsContext } from '../../context/SettingsContext';
import { ActivityLogContext } from '../../context/ActivityLogContext';
import generateProblem from '../../utils/problemGenerator';

const GameContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GameplayArea = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  max-width: 800px;
`;

const Game = () => {
  const { problemTypes, difficulty } = useContext(SettingsContext);
  const { addLogEntry } = useContext(ActivityLogContext);
  const [currentProblem, setCurrentProblem] = useState(null);
  const [selectedCats, setSelectedCats] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [wins, setWins] = useState(0);

  // Generate a new problem on mount and when skipped or answered
  const generateNewProblem = () => {
    const problem = generateProblem(problemTypes, difficulty);
    setCurrentProblem(problem);
    setSelectedCats([]);
    setTotalValue(0);
    setFeedback('');
  };

  useEffect(() => {
    generateNewProblem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problemTypes, difficulty]);

  // Update total value whenever selectedCats changes
  useEffect(() => {
    const total = selectedCats.reduce((acc, cat) => acc + cat.value, 0);
    setTotalValue(total);
  }, [selectedCats]);

  const handleSubmit = () => {
    if (!currentProblem) return;

    const isCorrect = totalValue === currentProblem.answer;
    if (isCorrect) {
      setFeedback('Correct!');
      setWins((prev) => prev + 1);
      addLogEntry({
        problemId: currentProblem.id,
        question: currentProblem.question,
        userAnswer: totalValue,
        isCorrect: true,
        timestamp: Date.now(),
      });
      generateNewProblem();
    } else {
      setFeedback('Try Again!');
      addLogEntry({
        problemId: currentProblem.id,
        question: currentProblem.question,
        userAnswer: totalValue,
        isCorrect: false,
        timestamp: Date.now(),
      });
    }
  };

  const handleSkip = () => {
    if (!currentProblem) return;

    addLogEntry({
      problemId: currentProblem.id,
      question: currentProblem.question,
      userAnswer: null,
      isCorrect: false,
      skipped: true,
      timestamp: Date.now(),
    });
    generateNewProblem();
  };

  const handleDrop = (cat) => {
    setSelectedCats((prev) => [...prev, cat]);
  };

  return (
    <GameContainer>
      <Scoreboard wins={wins} />
      {currentProblem && <MathProblem question={currentProblem.question} />}
      <GameplayArea>
        <CatIcons onDrop={handleDrop} />
        <Bucket selectedCats={selectedCats} />
      </GameplayArea>
      <Controls onSubmit={handleSubmit} onSkip={handleSkip} />
      {feedback && <Feedback message={feedback} />}
      <p>Total Points: {totalValue}</p>
    </GameContainer>
  );
};

export default Game;
