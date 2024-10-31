// src/components/Header/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #ffebcd;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLinks = styled.nav`
  a {
    margin: 0 10px;
    font-weight: bold;
    color: #333;

    &:hover {
      color: #ff6347;
    }
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <h2>Math Challenges</h2>
      <NavLinks>
        <Link to="/settings">Settings</Link>
        <Link to="/activity-log">Activity Log</Link>
      </NavLinks>
    </HeaderContainer>
  );
};

export default Header;
