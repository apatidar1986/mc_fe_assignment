import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Book } from '../types/Book';

interface TopAuthorsChartProps {
  books: Book[];
}

const TopAuthorsChart: React.FC<TopAuthorsChartProps> = ({ books }) => {
  const authorCounts = books.reduce((acc, book) => {
    acc[book.Author] = (acc[book.Author] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(authorCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([author, count]) => ({ author, count }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="author" type="category" width={150} />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TopAuthorsChart;