import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Typography, Grid, Box } from '@mui/material'

const PurchasePage = () => {
    const handleContact = () => {
        // Handle contact logic here
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4" component="h1" align="center">
                    Покупка курса
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1" align="center">
                    Если вы хотите приобрести курс, свяжитесь с нашим
                    менеджером.
                </Typography>
            </Grid>
            <Grid
                item
                xs={12}
                container
                alignItems="center"
                justifyContent="center"
            >
                <Box mt={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleContact}
                    >
                        Связаться с нами
                    </Button>
                </Box>
            </Grid>
            <Grid
                item
                xs={12}
                container
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="body2">
                    Вы также можете посетить наши страницы в социальных сетях:
                </Typography>
            </Grid>
            <Grid
                item
                xs={12}
                container
                alignItems="center"
                justifyContent="center"
            >
                <Box mt={2}>
                    <Button
                        component={Link}
                        to="https://telegram.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Telegram
                    </Button>
                    <Button
                        component={Link}
                        to="https://whatsapp.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        WhatsApp
                    </Button>
                </Box>
            </Grid>
        </Grid>
    )
}

export default PurchasePage
