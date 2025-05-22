import { ThemeProvider, createTheme } from '@mui/material';
import InvoiceForm from './components/InvoiceForm';
import './App.css';

const theme = createTheme({
  typography: {
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
  },
  components: {
    MuiTextField: {
      defaultProps: {
        size: 'small',
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          backgroundColor: '#00234B',
          '&:hover': {
            backgroundColor: '#001835',
          },
        },
        outlined: {
          borderColor: '#00234B',
          color: '#00234B',
          '&:hover': {
            borderColor: '#001835',
            backgroundColor: 'rgba(0, 35, 75, 0.04)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#00234B',
      light: '#003371',
      dark: '#001835',
      contrastText: '#ffffff',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-[#00234B] text-white py-4 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-xl md:text-2xl font-semibold">Invoice Generator</h1>
            <p className="text-sm md:text-base opacity-80">Create professional invoices instantly</p>
          </div>
        </header>
        <main className="py-6 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <InvoiceForm />
          </div>
        </main>
        <footer className="bg-gray-100 py-4 px-4 md:px-6 mt-8">
          <div className="max-w-7xl mx-auto text-center text-sm text-gray-600">
            © {new Date().getFullYear()} Invoice Generator. All rights reserved.
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
