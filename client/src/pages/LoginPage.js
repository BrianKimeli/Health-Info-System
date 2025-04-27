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

export default function LoginPage() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
  
    try {
      // Basic client-side validation
      if (!credentials.username.trim() || !credentials.password.trim()) {
        throw new Error('Please fill in all fields');
      }
  
      const response = await fetch('https://health-info-system-fv7s.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });
  
      const data = await response.json();
      
      if (!response.ok) {
        console.error('Backend error response:', data);
        throw new Error(data.error || 'Invalid credentials. Please try again.');
      }
  
      // Store token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Update auth context
      login(data.user);
      navigate('/clients');
      
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
      
      // Handle network errors
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        setError('Network error - check backend connection');
      }
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