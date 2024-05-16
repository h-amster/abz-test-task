import React from 'react';
import './Header.scss';
import { Container } from '../Container/Container';
import { Logo } from '../Logo/Logo';
import { Nav } from '../Nav/Nav';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <Container className="header__container">
        <Logo />

        <Nav />
      </Container>
    </header>
  );
};
