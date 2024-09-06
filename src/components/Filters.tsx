import React from 'react';
import styled from 'styled-components';


const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const Select = styled.select`
  padding: ${({ theme }) => theme.spacing.small};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

interface FiltersProps {
    genres: string[];
    years: number[];
    onGenreChange: (genre: string) => void;
    onYearChange: (year: string) => void;
    onRatingChange: (rating: string) => void;
    selectedGenre: string;
    selectedYear: string;
    selectedRating: string;
  }
  
  const Filters: React.FC<FiltersProps> = ({
    genres,
    years,
    onGenreChange,
    onYearChange,
    onRatingChange,
    selectedGenre,
    selectedYear,
    selectedRating,
  }) => {
    return (
      <FiltersContainer>
        <Select onChange={(e) => onGenreChange(e.target.value)} value={selectedGenre}>
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </Select>
        <Select onChange={(e) => onYearChange(e.target.value)} value={selectedYear}>
          <option value="">All Years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>
        <Select onChange={(e) => onRatingChange(e.target.value)} value={selectedRating}>
          <option value="">All Ratings</option>
          <option value="4">4+ Stars</option>
          <option value="3">3+ Stars</option>
          <option value="2">2+ Stars</option>
          <option value="1">1+ Star</option>
        </Select>
      </FiltersContainer>
    );
  };
  
  export default Filters;