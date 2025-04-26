import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import ClientsPage from './pages/ClientsPage';
import ClientProfilePage from './pages/ClientProfilePage';
import ProgramsPage from './pages/ProgramsPage';
import NavBar from './components/NavBar';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<ClientsPage />} />
          <Route path="/clients/:id" element={<ClientProfilePage />} />
          <Route path="/programs" element={<ProgramsPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;