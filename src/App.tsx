// import React, { useState } from 'react';
// import { ThemeProvider } from 'styled-components';
// import { GlobalStyle } from './styles/GlobalStyle';
// import { lightTheme, darkTheme } from './styles/theme';
// import BookList from './components/BookList';
// import styled from 'styled-components';

// const AppContainer = styled.div`
//   min-height: 100vh;
//   padding: ${({ theme }) => theme.spacing.medium};
// `;

// const ThemeToggleButton = styled.button`
//   position: fixed;
//   top: ${({ theme }) => theme.spacing.medium};
//   right: ${({ theme }) => theme.spacing.medium};
//   padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
//   background-color: ${({ theme }) => theme.colors.primary};
//   color: ${({ theme }) => theme.colors.background};
//   border: none;
//   border-radius: ${({ theme }) => theme.borderRadius};
//   cursor: pointer;
//   font-size: ${({ theme }) => theme.fontSizes.small};
// `;

// const App: React.FC = () => {
//   const [isDarkTheme, setIsDarkTheme] = useState(false);

//   const toggleTheme = () => {
//     setIsDarkTheme(!isDarkTheme);
//   };

//   return (
//     <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
//       <GlobalStyle />
//       <AppContainer>
//         <ThemeToggleButton onClick={toggleTheme}>
//           {isDarkTheme ? 'Light Theme' : 'Dark Theme'}
//         </ThemeToggleButton>
//         <BookList />
//       </AppContainer>
//     </ThemeProvider>
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle';
import { lightTheme, darkTheme } from './styles/theme';
import BookList from './components/BookList';
import Dashboard from './components/Dashboard';
import styled from 'styled-components';
import { Book } from './types/Book';

const AppContainer = styled.div`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.medium};
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  margin: 0 ${({ theme }) => theme.spacing.small};
  background-color: ${({ active, theme }) => active ? theme.colors.primary : theme.colors.secondary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.medium};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
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
  const [activeTab, setActiveTab] = useState<'list' | 'dashboard'>('list');
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('/books.json');
        const data: Book[] = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

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
        <TabContainer>
          <TabButton active={activeTab === 'list'} onClick={() => setActiveTab('list')}>
            Book List
          </TabButton>
          <TabButton active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')}>
            Dashboard
          </TabButton>
        </TabContainer>
        {activeTab === 'list' ? <BookList /> : <Dashboard books={books} />}
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;