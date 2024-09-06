import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { Book } from '../types/Book';
import BookItem from './BookItem';
import SearchBar from './SearchBar';
import Filters from './Filters';
import ToggleButton from './ToggleButton';
import ShimmerEffect from './ShimmerEffect';

const BookListContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.large};
`;

const Title = styled.h1`
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.large};
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const ControlsContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const LoadMoreButton = styled.button`
  display: block;
  margin: ${({ theme }) => theme.spacing.large} auto;
  padding: ${({ theme }) => theme.spacing.medium} ${({ theme }) => theme.spacing.large};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.medium};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.lightGray};
    cursor: not-allowed;
  }
`;

const ITEMS_PER_LOAD = 10;

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [displayedBooks, setDisplayedBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/books.json');
        const data: Book[] = await response.json();
        setBooks(data);
        setFilteredBooks(data);
        setDisplayedBooks(data.slice(0, ITEMS_PER_LOAD));
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const applyFilters = useMemo(() => {
    return (booksToFilter: Book[]) => {
      return booksToFilter.filter((book) => {
        const matchesGenre = !selectedGenre || book.Genre === selectedGenre;
        const matchesYear = !selectedYear || book.Year === parseInt(selectedYear);
        const matchesRating = !selectedRating || book['User Rating'] >= parseFloat(selectedRating);
        const matchesSearch = book.Name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesGenre && matchesYear && matchesRating && matchesSearch;
      });
    };
  }, [selectedGenre, selectedYear, selectedRating, searchQuery]);

  useEffect(() => {
    const filtered = applyFilters(books);
    setFilteredBooks(filtered);
    setDisplayedBooks(filtered.slice(0, ITEMS_PER_LOAD));
  }, [books, applyFilters]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const searchFiltered = applyFilters(books);
    setFilteredBooks(searchFiltered);
    setDisplayedBooks(searchFiltered.slice(0, ITEMS_PER_LOAD));
  };

  const genres = useMemo(() => Array.from(new Set(books.map((book) => book.Genre))), [books]);
  const years = useMemo(
    () => Array.from(new Set(books.map((book) => book.Year))).sort((a, b) => b - a),
    [books]
  );

  const clearFilters = () => {
    setSelectedGenre('');
    setSelectedYear('');
    setSelectedRating('');
    setSearchQuery('');
    setFilteredBooks(books);
    setDisplayedBooks(books.slice(0, ITEMS_PER_LOAD));
  };

  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
    if (isFiltersOpen) {
      clearFilters();
    }
  };

  const loadMore = async () => {
    setIsLoadingMore(true);
    // Simulate an API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    const currentLength = displayedBooks.length;
    const newBooks = filteredBooks.slice(currentLength, currentLength + ITEMS_PER_LOAD);
    setDisplayedBooks([...displayedBooks, ...newBooks]);
    setIsLoadingMore(false);
  };

  const hasMoreBooks = displayedBooks.length < filteredBooks.length;

  return (
    <BookListContainer>
      <Title>Amazon Top Books</Title>
      <ControlsContainer>
        <ToggleButton isOpen={isFiltersOpen} onClick={toggleFilters} />
        {isFiltersOpen ? (
          <Filters
            genres={genres}
            years={years}
            onGenreChange={setSelectedGenre}
            onYearChange={setSelectedYear}
            onRatingChange={setSelectedRating}
            selectedGenre={selectedGenre}
            selectedYear={selectedYear}
            selectedRating={selectedRating}
          />
        ) : (
          <SearchBar
            books={books}
            onSearch={handleSearch}
            filteredBooks={filteredBooks}
            searchQuery={searchQuery}
          />
        )}
      </ControlsContainer>
      {isLoading ? (
        Array.from({ length: ITEMS_PER_LOAD }).map((_, index) => (
          <ShimmerEffect key={index} />
        ))
      ) : (
        <>
          {displayedBooks.map((book, index) => (
            <BookItem key={index} book={book} />
          ))}
          {isLoadingMore && 
            Array.from({ length: ITEMS_PER_LOAD }).map((_, index) => (
              <ShimmerEffect key={`loading-${index}`} />
            ))
          }
          {hasMoreBooks && (
            <LoadMoreButton onClick={loadMore} disabled={isLoadingMore}>
              {isLoadingMore ? 'Loading...' : 'Load More'}
            </LoadMoreButton>
          )}
        </>
      )}
    </BookListContainer>
  );
};

export default BookList;