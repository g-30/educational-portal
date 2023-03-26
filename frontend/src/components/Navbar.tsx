import * as React from 'react';
import { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Menu,
    MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import { styled } from '@mui/material/styles';
import logo from '../assets/logo.png';

const MyToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
});

const MyLogo = styled('img')({
    height: '40px',
    marginRight: '16px',
});

const MyLanguageIcon = styled(LanguageIcon)({
    marginLeft: '16px',
});

const Navbar = (): JSX.Element => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position='static'>
            <MyToolbar>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <MyLogo src={logo} alt='Logo' />
                    <Typography variant='h6' component='div'>
                        Восточно-Казахстанский технический университет
                    </Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                        size='large'
                        edge='start'
                        color='inherit'
                        aria-label='menu'
                        onClick={handleMenuClick}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleMenuClose}>Courses</MenuItem>
                        <MenuItem onClick={handleMenuClose}>
                            Student Profile
                        </MenuItem>
                        <MenuItem onClick={handleMenuClose}>Contacts</MenuItem>
                    </Menu>
                    <MyLanguageIcon />
                </div>
            </MyToolbar>
        </AppBar>
    );
};

export default Navbar;
