// client/src/components/Table.test.js

import React from 'react';
import { render, fireEvent, within } from '@testing-library/react';
import Table from './Table';

const mockData = [
  { description: 'Test Description 1', count: 2 },
  { description: 'Test Description 2', count: 1 },
];

test('renders table with correct data', () => {
  const { getByText, getAllByRole } = render(<Table data={mockData} />);

  // Test if table headers are rendered
  expect(getByText('Description')).toBeInTheDocument();
  expect(getByText('Count')).toBeInTheDocument();

  // Test if table rows are rendered
  const rows = getAllByRole('row');
  expect(rows).toHaveLength(mockData.length + 1); // plus one for the header row

  // Test if table cells are rendered with correct data
  mockData.forEach((item, index) => {
    const row = rows[index + 1]; // plus one to skip the header row
    const { getByText } = within(row);
    expect(getByText(item.description)).toBeInTheDocument();
    expect(getByText(item.count.toString())).toBeInTheDocument();
  });
});

test('highlights and deletes row on button click', () => {
  const { getByText, getAllByRole } = render(<Table data={mockData} />);
  
  // Find the row for 'Test Description 1'
  const row = getByText('Test Description 1').closest('tr');
  const { getByLabelText } = within(row);

  // Click the highlight button and check if the row is highlighted
  const highlightButton = getByLabelText('highlight');
  fireEvent.click(highlightButton);
  expect(row).toHaveClass('MuiTableRow-root');

  // Click the delete button and check if the row is deleted
  const deleteButton = getByLabelText('delete');
  fireEvent.click(deleteButton);
  const rows = getAllByRole('row');
  expect(rows).toHaveLength(mockData.length); // one row less after deletion
});
