import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ProgramsPage from '../pages/ProgramsPage';

// NavBar Component to render the navigation bar
const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Health Information System
        </Typography>
        <Button color="inherit" component={Link} to="/">Clients</Button>
        <Button color="inherit" component={Link} to="/programs">Programs</Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;