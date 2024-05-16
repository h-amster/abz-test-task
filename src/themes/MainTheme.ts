import { createTheme } from '@mui/material/styles';

export const MainTheme = createTheme({
  typography: {
    fontFamily: '"Nunito", sans-serif',
  },
  palette: {
    primary: {
      main: '#00bdd3',
    },
    secondary: {
      main: 'rgba(0, 0, 0, 0.87)',
    },
    error: {
      main: '#cb3d40',
    },
  },
});
