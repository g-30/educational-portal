import * as React from 'react';
import { Typography, Box, Link } from '@mui/material';

function Footer() {
    return (
        <Box
            sx={{
                backgroundColor: '#f5f5f5',
                py: 2,
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                minHeight: '50px',
            }}
        >
            <Typography variant='body2' color='textSecondary' align='center'>
                &copy; {new Date().getFullYear()} Восточно-Казахстанский
                технический университет
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                <Link href='#'>Terms of Use</Link>
                <Typography sx={{ mx: 1 }}>|</Typography>
                <Link href='#'>Privacy Policy</Link>
            </Box>
        </Box>
    );
}

export default Footer;
