import React from 'react';
import styled from 'styled-components';

const StarContainer = styled.div`
  display: inline-flex;
  align-items: center;
`;

const Star = styled.span<{ filled: boolean }>`
  color: ${props => props.filled ? '#ffc107' : '#e4e5e9'};
  font-size: 1.2rem;
  margin-right: 2px;
`;

const RatingText = styled.span`
  margin-left: 5px;
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.secondary};
`;

interface StarRatingProps {
  rating: number;
  maxRating?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating = 5 }) => {
  return (
    <StarContainer>
      {[...Array(maxRating)].map((_, index) => (
        <Star key={index} filled={index < Math.floor(rating)}>
          ★
        </Star>
      ))}
      <RatingText>({rating.toFixed(1)})</RatingText>
    </StarContainer>
  );
};

export default StarRating;