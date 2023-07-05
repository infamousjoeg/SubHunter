// UndoSnackbar.js

import React from 'react';
import { Snackbar, Button } from '@material-ui/core';

function UndoSnackbar({ data, onUndo }) {
  const open = Boolean(data);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    onUndo();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={10000}
      onClose={handleClose}
      message="Entry removed"
      action={
        <React.Fragment>
          <Button color="secondary" size="small" onClick={handleClose}>
            UNDO
          </Button>
        </React.Fragment>
      }
    />
  );
}

export default UndoSnackbar;
