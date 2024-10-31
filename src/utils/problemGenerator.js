// src/utils/problemGenerator.js
import { v4 as uuidv4 } from 'uuid';

const generateProblem = (selectedTypes, difficulty) => {
  const type =
    selectedTypes[Math.floor(Math.random() * selectedTypes.length)];

  let maxNumber;
  switch (difficulty) {
    case 'easy':
      maxNumber = 10;
      break;
    case 'medium':
      maxNumber = 50;
      break;
    case 'hard':
      maxNumber = 100;
      break;
    default:
      maxNumber = 10;
  }

  let question = '';
  let answer = 0;

  switch (type) {
    case 'addition': {
      const a = getRandomInt(1, maxNumber);
      const b = getRandomInt(1, maxNumber);
      question = `${a} + ${b}`;
      answer = a + b;
      break;
    }
    case 'subtraction': {
      const a = getRandomInt(1, maxNumber);
      const b = getRandomInt(1, a); // Ensure non-negative result
      question = `${a} - ${b}`;
      answer = a - b;
      break;
    }
    case 'multiplication': {
      const a = getRandomInt(1, maxNumber / 2);
      const b = getRandomInt(1, maxNumber / 2);
      question = `${a} × ${b}`;
      answer = a * b;
      break;
    }
    case 'squares': {
      const a = getRandomInt(1, Math.floor(Math.sqrt(maxNumber)));
      question = `${a}²`;
      answer = a * a;
      break;
    }
    case 'squareRoots': {
      const a = getRandomInt(1, Math.floor(Math.sqrt(maxNumber)));
      question = `√${a * a}`;
      answer = a;
      break;
    }
    case 'basicEquations': {
      const a = getRandomInt(1, maxNumber / 2);
      const b = getRandomInt(1, maxNumber / 2);
      question = `${a}x + ${b} = ${a * 5 + b}`;
      answer = 5; // x = 5
      break;
    }
    default:
      // Default to addition if type is unrecognized
      const x = getRandomInt(1, maxNumber);
      const y = getRandomInt(1, maxNumber);
      question = `${x} + ${y}`;
      answer = x + y;
  }

  return {
    id: uuidv4(),
    question,
    answer,
    type,
    timestamp: Date.now(),
  };
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default generateProblem;
