import React, { FC } from 'react'
import { styled } from '@mui/material'

const FooterContainer = styled('footer')({
    position: 'fixed',
    bottom: 0,
    width: '100%',
    height: '60px',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    fontWeight: 500,
    color: 'gray',
})

const Footer: FC = () => {
    return (
        <FooterContainer>
            <p>Made with ❤️ by Agartu</p>
        </FooterContainer>
    )
}

export default Footer
