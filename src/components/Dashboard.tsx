import React from 'react';
import styled from 'styled-components';
import { Book } from '../types/Book';
import GenreDistributionChart from './GenreDistributionChart';
import RatingDistributionChart from './RatingDistributionChart';
import TopAuthorsChart from './TopAuthorsChart';

const DashboardContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
`;

const ChartContainer = styled.div`
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: ${({ theme }) => theme.spacing.medium};
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const ChartTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

interface DashboardProps {
  books: Book[];
}

const Dashboard: React.FC<DashboardProps> = ({ books }) => {
  return (
    <DashboardContainer>
      <ChartContainer>
        <ChartTitle>Genre Distribution</ChartTitle>
        <GenreDistributionChart books={books} />
      </ChartContainer>
      <ChartContainer>
        <ChartTitle>Rating Distribution</ChartTitle>
        <RatingDistributionChart books={books} />
      </ChartContainer>
      <ChartContainer>
        <ChartTitle>Top 10 Authors</ChartTitle>
        <TopAuthorsChart books={books} />
      </ChartContainer>
    </DashboardContainer>
  );
};

export default Dashboard;