import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
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
    const { t } = useTranslation()
    return (
        <FooterContainer>
            <p>© {new Date().getFullYear()} Agartu. {t('rights')}</p>
            <br/>
            <p>По вопросам пишите: <b>janasu-info@mail.ru</b></p>
        </FooterContainer>
    )
}

export default Footer
