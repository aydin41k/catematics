// src/components/Game/CatIcons.jsx
import React from 'react';
import styled from 'styled-components';
import { useDraggable } from '@dnd-kit/core';

const IconsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CatButton = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #ffe4e1;
  border: 2px solid #ff6347;
  border-radius: 8px;
  cursor: grab;
  user-select: none;
  font-size: 1rem;
  transition: background-color 0.2s;

  &:active {
    cursor: grabbing;
  }

  &:hover {
    background-color: #ffdab9;
  }
`;

const CatIcons = ({ onDrop }) => {
  const cats = [
    { id: 'kitten', emoji: '🐱', value: 1, label: 'Kitten (1)' },
    { id: 'mediumCat', emoji: '🐈', value: 5, label: 'Medium Cat (5)' },
    { id: 'bigCat', emoji: '🐅', value: 10, label: 'Big Cat (10)' },
  ];

  return (
    <IconsContainer>
      {cats.map((cat) => (
        <DraggableCat key={cat.id} cat={cat} />
      ))}
    </IconsContainer>
  );
};

const DraggableCat = ({ cat }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: cat.id,
    data: { ...cat },
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <CatButton ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <span style={{ marginRight: '10px' }}>{cat.emoji}</span>
      {cat.label}
    </CatButton>
  );
};

export default CatIcons;
