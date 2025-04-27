import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TextField, 
  Button, 
  Container, 
  Box, 
  Typography,
  Alert,
  Card,
  CardContent
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { login } from '../api';

export default function LoginPage() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setAuthState } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
  
    try {
      // Validate inputs
      if (!credentials.username.trim() || !credentials.password.trim()) {
        throw new Error('Please fill in all fields');
      }

      // Use API module for login
      const { token, user } = await login(credentials);
      
      // Update auth context and storage
      setAuthState({ user, token });
      localStorage.setItem('token', token);
      
      navigate('/clients');
    } catch (error) {
      setError(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h4" gutterBottom align="center">
            Health System Login
          </Typography>
          
          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
          
          <Box 
            component="form" 
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <TextField
              label="Username"
              fullWidth
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              required
              disabled={loading}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              required
              disabled={loading}
            />
            <Button 
              type="submit" 
              variant="contained" 
              size="large"
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          <strong>Test credentials for assessment purposes</strong>
          :<br />
          <strong>Username:</strong> doctor<br />
          <strong>Password:</strong> test123
        </Typography>
      </Box>
    </Container>
  );
}