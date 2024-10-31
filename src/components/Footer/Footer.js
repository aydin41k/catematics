import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #ffebcd;
  padding: 10px 20px;
  text-align: center;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>&copy; {new Date().getFullYear()} Math Challenges App</p>
    </FooterContainer>
  );
};

export default Footer;
