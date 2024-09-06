import React from 'react';
import styled from 'styled-components';
import { Book } from '../types/Book';
import StarRating from './StarRating';

const BookItemContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  padding: ${({ theme }) => theme.spacing.medium};
`;

const BookImage = styled.img`
  width: 100px;
  height: 150px;
  object-fit: cover;
  margin-right: ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const BookInfo = styled.div`
  flex: 1;
`;

const BookTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.spacing.small};
  font-size: ${({ theme }) => theme.fontSizes.medium};
`;

const BookDetail = styled.p`
  margin: ${({ theme }) => theme.spacing.small} 0;
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

interface BookItemProps {
  book: Book;
}

const BookItem: React.FC<BookItemProps> = ({ book }) => {
    const placeholderImage = `https://via.placeholder.com/100x150.png?text=${'Book'}`;
  return (
    <BookItemContainer>
       <BookImage src={placeholderImage} alt={`Cover of ${book.Name}`} />
      <BookInfo>
        <BookTitle>{book.Name}</BookTitle>
        <BookDetail>Author: {book.Author}</BookDetail>
        <StarRating rating={book['User Rating']} />
        <BookDetail>Reviews: {book.Reviews}</BookDetail>
        <BookDetail>Price: ${book.Price}</BookDetail>
        <BookDetail>Year: {book.Year}</BookDetail>
        <BookDetail>Genre: {book.Genre}</BookDetail>
      </BookInfo>
    </BookItemContainer>
  );
};

export default BookItem;