import { createRoot } from 'react-dom/client';
import 'reset-css';
import { App } from './App';
import { ThemeProvider } from '@emotion/react';
import { MainTheme } from './themes/MainTheme';

const root = createRoot(document.getElementById('root')!);

root.render(
  <ThemeProvider theme={MainTheme}>
    <App />
  </ThemeProvider>,
);
