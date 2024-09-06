import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Book } from '../types/Book';

interface RatingDistributionChartProps {
  books: Book[];
}

const RatingDistributionChart: React.FC<RatingDistributionChartProps> = ({ books }) => {
  const ratingDistribution = books.reduce((acc, book) => {
    const rating = Math.floor(book['User Rating']);
    acc[rating] = (acc[rating] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const data = Object.entries(ratingDistribution)
    .map(([rating, count]) => ({ rating: `${rating} Star`, count }))
    .sort((a, b) => parseInt(a.rating) - parseInt(b.rating));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="rating" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RatingDistributionChart;