// DataTable.js

import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, IconButton } from '@material-ui/core';
import { CheckCircle, Cancel } from '@material-ui/icons';

function DataTable({ data, onRemove }) {
  const [selected, setSelected] = useState([]);

  const handleSelect = (description) => {
    const newSelected = [...selected];
    const selectedIndex = newSelected.indexOf(description);
    if (selectedIndex === -1) {
      newSelected.push(description);
    } else {
      newSelected.splice(selectedIndex, 1);
    }
    setSelected(newSelected);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {data.map((entry, index) => (
            <TableRow key={index} selected={selected.includes(entry.description)}>
              <TableCell>{entry.description}</TableCell>
              <TableCell>{entry.occurrence}</TableCell>
              <TableCell>
                <IconButton onClick={() => onRemove(entry.description)}>
                  <Cancel />
                </IconButton>
                <IconButton onClick={() => handleSelect(entry.description)}>
                  <CheckCircle />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataTable;
