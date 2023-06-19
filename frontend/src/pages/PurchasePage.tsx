import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Typography, Grid, Box } from '@mui/material'
import Course from '../components/Course/CourseCard'

interface PurchaseResponseData {
    status: number
    status_text?: string
    result: {
        price_to_pay: number
    }
}

const PurchasePage = () => {
    const [course, setCourse] = useState<Course>();
    const [priceToPay, setPriceToPay] = useState<number>();
    const { courseName } = useParams<{ courseName: string }>()

    useEffect(() => {
        fetch(
            `/caesar-panel/api/courses/${courseName}`
        )
            .then((response) => response.json())
            .then(({ result }: { result: Course }) => {
                setCourse(result)
            })
            .catch((error) => console.error(error))
    }, [courseName])

    const submit = () => {
        fetch(`/caesar-panel/api/purchase/${courseName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
        })
            .then((response) => {
                return response.json() as Promise<PurchaseResponseData>
            })
            .then((data) => {
                if (data) {
                    console.log(data)
                    if (data.status == 1) {
                        setPriceToPay(data.result.price_to_pay)
                    } else {
                        alert('Ошибка: ' + data.status_text)
                    }
                }
            })
            .catch((error) => console.error(error))
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4" component="h1" align="center">
                    Покупка курса
                </Typography>
            </Grid>
            {priceToPay == null && (
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            marginTop: '0.2rem',
                            marginBottom: '0.2rem',
                            marginLeft: '0.5rem',
                            borderRadius: '0.3rem',
                        }}
                        onClick={submit}
                    >
                        Отправить заявку
                    </Button>
                    <Typography variant="body1" align="center">
                        После получения заявки, с вами свяжется менеджер для уточнения условий оплаты.
                    </Typography>
                </Grid>
            )}
            {priceToPay != null && (
                <Grid item xs={12}>
                    <Typography variant="body1" align="center">
                        Ожидайте сообщения от менеджера в WhatsApp по поводу оплаты {priceToPay} тг.
                    </Typography>
                </Grid>
            )}
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
