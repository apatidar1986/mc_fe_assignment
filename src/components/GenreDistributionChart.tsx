import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Book } from '../types/Book';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

interface GenreDistributionChartProps {
  books: Book[];
}

const GenreDistributionChart: React.FC<GenreDistributionChartProps> = ({ books }) => {
  const genreDistribution = books.reduce((acc, book) => {
    acc[book.Genre] = (acc[book.Genre] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(genreDistribution).map(([name, value]) => ({ name, value }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default GenreDistributionChart;