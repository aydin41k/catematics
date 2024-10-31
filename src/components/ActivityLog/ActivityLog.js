// src/components/ActivityLog/ActivityLog.jsx
import React, { useContext } from 'react';
import styled from 'styled-components';
import { ActivityLogContext } from '../../context/ActivityLogContext';

const LogContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const LogTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 8px 12px;
    border: 1px solid #ddd;
    text-align: center;
  }

  th {
    background-color: #ffebcd;
  }
`;

const ClearButton = styled.button`
  padding: 8px 16px;
  margin-top: 10px;
  background-color: #ff6347;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #ff4500;
  }
`;

const ActivityLog = () => {
  const { activityLog, clearLog } = useContext(ActivityLogContext);

  return (
    <LogContainer>
      <h2>Activity Log</h2>
      {activityLog.length === 0 ? (
        <p>No activity yet.</p>
      ) : (
        <>
          <LogTable>
            <thead>
              <tr>
                <th>#</th>
                <th>Question</th>
                <th>Your Answer</th>
                <th>Result</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {activityLog.map((entry, index) => (
                <tr key={entry.timestamp}>
                  <td>{activityLog.length - index}</td>
                  <td>{entry.question}</td>
                  <td>
                    {entry.userAnswer !== null
                      ? entry.userAnswer
                      : entry.skipped
                      ? 'Skipped'
                      : '-'}
                  </td>
                  <td>
                    {entry.isCorrect
                      ? 'Correct'
                      : entry.skipped
                      ? 'Skipped'
                      : 'Incorrect'}
                  </td>
                  <td>
                    {new Date(entry.timestamp).toLocaleString(undefined, {
                      dateStyle: 'short',
                      timeStyle: 'short',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </LogTable>
          <ClearButton onClick={clearLog}>Clear Log</ClearButton>
        </>
      )}
    </LogContainer>
  );
};

export default ActivityLog;
