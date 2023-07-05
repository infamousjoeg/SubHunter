// styles.js

import { createMuiTheme, makeStyles } from '@material-ui/core/styles';

// Create a Material UI theme with blue primary color
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1976d2', // This is a blue color
    },
  },
});

// Create a hook that generates CSS classes with custom styles
export const useStyles = makeStyles({
  table: {
    marginTop: '20px',
    marginBottom: '20px',
  },
  snackbar: {
    '& .MuiSnackbarContent-root': {
      backgroundColor: '#1976d2',
      color: '#ffffff',
    },
  },
  fileInput: {
    display: 'none',
  },
  fileUploadLabel: {
    padding: '10px',
    backgroundColor: '#1976d2',
    color: '#ffffff',
    cursor: 'pointer',
  },
});
