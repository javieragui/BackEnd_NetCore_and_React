import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import style from '../Tool/Style'

const PerfilUsuario = () => {
    return (
        <Container component="main" maxWidth="md" justify="center">
            <div style={style.paper}>
                <Typography component="h1" variant="h5">
                    Perfil de Usuario
                </Typography>
            </div>
            <form style={style.form}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField name="nombreCompleto" variant="outlined" fullWidth label="Ingrese nombre y apellidos" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField name="email" variant="outlined" fullWidth label="Ingrese email" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField type="password" name="password" variant="outlined" fullWidth label="Ingrese password" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField type="password" name="confirmPassword" variant="outlined" fullWidth label="Confirme password" />
                    </Grid>
                </Grid>
                <Grid container justifyContent="center">
                    <Grid item xs={12} md={6}>
                        <Button type="submit" fullWidth variant="contained" size="large" color="primary" style={style.submit}>
                            Enviar
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default PerfilUsuario;