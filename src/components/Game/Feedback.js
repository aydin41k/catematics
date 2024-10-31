// src/components/Game/Feedback.jsx
import React from 'react';
import styled from 'styled-components';

const FeedbackContainer = styled.div`
  margin-top: 10px;
  font-size: 1.2rem;
  color: ${(props) => (props.correct ? 'green' : 'red')};
`;

const Feedback = ({ message }) => {
  const isCorrect = message === 'Correct!';
  return (
    <FeedbackContainer correct={isCorrect}>
      {message}
    </FeedbackContainer>
  );
};

export default Feedback;
