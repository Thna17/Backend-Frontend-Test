// components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, IconButton, Menu, MenuItem, Box } from '@mui/material';
import { Menu as MenuIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
        handleMenuClose();
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Todo App
                    </Typography>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Button color="inherit" onClick={() => navigate('/home')}>
                            Home
                        </Button>
                        <Button color="inherit" onClick={() => navigate('/profile')}>
                            Profile
                        </Button>
                        <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
                            Logout
                        </Button>
                    </Box>
                    <Box sx={{ display: { md: 'none' } }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleMenuOpen}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={isMenuOpen}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={() => { navigate('/home'); handleMenuClose(); }}>
                                Home
                            </MenuItem>
                            <MenuItem onClick={() => { navigate('/profile'); handleMenuClose(); }}>
                                Profile
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>
                                Logout
                            </MenuItem>
                        </Menu>
                    </Box>
                </Container>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
