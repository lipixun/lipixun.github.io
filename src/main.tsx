// Main
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import store from './store';
import App from './App.tsx';
import './index.css';

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
);
