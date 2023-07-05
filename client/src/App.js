// App.js

import { ThemeProvider } from '@material-ui/core/styles';
import { theme, useStyles } from './styles.js';
import React, { useState } from 'react';
import axios from 'axios';
import DataTable from './DataTable';
import UndoSnackbar from './UndoSnackbar';

function App() {
  const [data, setData] = useState([]);
  const [undoData, setUndoData] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    axios.post('/upload', formData)
      .then(() => {
        // After the file is uploaded, fetch the data
        axios.get('/data')
          .then(response => {
            setData(response.data);
          })
          .catch(err => {
            console.error('Error fetching data: ', err);
          });
      })
      .catch(err => {
        console.error('Error uploading file: ', err);
      });
  };

  const handleRemove = (description) => {
    // Remove the entry from data and save it in undoData
    const entryIndex = data.findIndex(entry => entry.description === description);
    const entry = data.splice(entryIndex, 1)[0];
    setData([...data]);
    setUndoData(entry);
  };

  const handleUndo = () => {
    // Add undoData back to data
    setData([...data, undoData]);
    setUndoData(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <label htmlFor="file-upload" className={classes.fileUploadLabel}>
        Upload CSV file
      </label>
      <input id="file-upload" type="file" onChange={handleFileUpload} className={classes.fileInput} />
      <DataTable data={data} onRemove={handleRemove} className={classes.table} />
      <UndoSnackbar data={undoData} onUndo={handleUndo} className={classes.snackbar} />
    </ThemeProvider>
  );
}

export default App;
