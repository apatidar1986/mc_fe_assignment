# Amazon Top Books React Application

## Overview

This project is a React-based application that displays and visualizes data about Amazon's top books. It features a responsive list view of books with detailed information, advanced filtering options, a "Load More" pagination system, and a heatmap visualization of book publications across years and genres.

## Features

- Display a list of top books from Amazon
- Detailed book information including:
  - Book cover placeholder image used
  - Title
  - Author
  - User rating (displayed as stars)
  - Number of reviews
  - Price
  - Publication year (prominently displayed as a badge)
  - Genre
- Search functionality to find books by title
- Filter books by genre, year, and rating
- Toggle between search and filter views
- "Load More" functionality for pagination
- Loading shimmer effect for improved user experience

## Technologies Used

- React
- TypeScript
- Styled Components

## Boilerplate

- Create react app
- Shimmer effect then twik that
- Theme

## Prerequisites

- Node.js (v14 or later) i used v20.15.0
- npm (v6 or later) i used 10.7.0

## Setup and Installation

1. Clone the repository:

   ```
   git clone https://github.com/apatidar1986/mc_fe_assignment.git
   cd mc_fe_assignment
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the development server:

   ```
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Project Structure

```
src/
├── components/
│   ├── BookItem.tsx
│   ├── BookList.tsx
│   ├── Dashboard.tsx
│   ├── Filters.tsx
│   ├── SearchBar.tsx
│   ├── ShimmerEffect.tsx
│   ├── StarRating.tsx
│   └── ToggleButton.tsx
├── styles/
│   └── GlobalStyle.ts
├── types/
│   └── Book.ts
├── App.tsx
└── index.tsx
```

## Main Components

- `Dashboard`: The main container component that renders the GenreDistribution, TopAuthor, Rating visulization.
- `BookList`: Displays the list of books with search and filter functionality
- `BookItem`: Renders individual book details with a prominent year badge
- `SearchBar`: Allows users to search for books by title with typeahead suggestions
- `Filters`: Provides options to filter books by genre, year, and rating
- `ShimmerEffect`: Displays a loading placeholder for books
- `StarRating`: Renders the book's user rating as stars

## Styling

The project uses Styled Components for styling, with a global theme defined in `styles/GlobalStyle.ts`. This approach allows for consistent styling across components and easy theme customization.

## Data Fetching

Book data is fetched from a JSON file (`/public/books.json`) in the `App` component. In a production environment, this would typically be replaced with an API call.
Data set was available in csv so converted that in json by using free online transformer just for assigenmnmet but can be used python to read csv and transform that in json or being exposed that as api where data security more important.

## Features in Detail

1. **Search and Filter Toggle**: Users can switch between search and filter views using a toggle button.
2. **Typeahead Search**: The search bar provides suggestions as the user types.
3. **Advanced Filtering**: Books can be filtered by genre, publication year, and user rating.
4. "**Load More" Pagination**: Instead of traditional pagination, users can load more books as they scroll.
5. **Shimmer Effect**: A shimmer placeholder is shown while book data is loading.

## Future Improvements

- Implement server-side pagination and filtering for better performance with large datasets
- Add unit tests
- Enhance accessibility features
- Implement more advanced sorting options
- Add user authentication and personalized book lists
- As more clear requirment come can extend that with react router, colocated state can be maintained via redux or context
- Responsive design for various screen sizes

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.



