// src/components/Game/Bucket.jsx
import React from 'react';
import styled from 'styled-components';
import { useDroppable } from '@dnd-kit/core';

const BucketContainer = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #fafad2;
  border: 2px dashed #ffd700;
  border-radius: 8px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DroppedCatsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

const CatEmoji = styled.span`
  font-size: 2rem;
`;

const Bucket = ({ selectedCats }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: 'bucket',
  });

  const style = {
    backgroundColor: isOver ? '#e6ffe6' : '#fafad2',
    transition: 'background-color 0.2s',
  };

  return (
    <BucketContainer ref={setNodeRef} style={style}>
      <h3>Bucket</h3>
      <DroppedCatsContainer>
        {selectedCats.map((cat, index) => (
          <CatEmoji key={index}>{cat.emoji}</CatEmoji>
        ))}
      </DroppedCatsContainer>
    </BucketContainer>
  );
};

export default Bucket;
