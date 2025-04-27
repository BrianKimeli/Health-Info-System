import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate // Add this import
} from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import ClientsPage from './pages/ClientsPage';
import ProgramsPage from './pages/ProgramsPage';
import ClientProfilePage from './pages/ClientProfilePage';
import LoginPage from './pages/LoginPage';
import NavBar from './components/NavBar';

const theme = createTheme();

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <NavBar />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<PrivateRoute />}>
              {/* Redirect to /clients if the user is logged in */}
              <Route index element={<Navigate to="/clients" replace />} />
              <Route path="/clients" element={<ClientsPage />} />
              <Route path="/clients/:id" element={<ClientProfilePage />} />
              <Route path="/programs" element={<ProgramsPage />} />
            </Route>
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;