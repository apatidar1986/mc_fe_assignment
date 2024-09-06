import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle';
import { lightTheme, darkTheme } from './styles/theme';
import BookList from './components/BookList';
import styled from 'styled-components';

const AppContainer = styled.div`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.medium};
`;

const ThemeToggleButton = styled.button`
  position: fixed;
  top: ${({ theme }) => theme.spacing.medium};
  right: ${({ theme }) => theme.spacing.medium};
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

const App: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <GlobalStyle />
      <AppContainer>
        <ThemeToggleButton onClick={toggleTheme}>
          {isDarkTheme ? 'Light Theme' : 'Dark Theme'}
        </ThemeToggleButton>
        <BookList />
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;