import React, { useState } from 'react';
import { Button, Container, Grid, TextField, Typography } from '@mui/material'
import style from '../Tool/Style'

const RegistrarUsuario = () => {
    const [usuario, setUsuario] = useState({
        NombreCompleto : '',
        Email : '',
        Password : '',
        ConfirmPassword : '',
        Username : ''
    });
const ingresarValoresMemoria = e => {
    const {name, value} = e.target;
    setUsuario(anterior => ({
        ...anterior,
        [name] : value
    }))
}
const registrarUsuario = e => {
    e.preventDefault();
    console.log('Imprime los valores de usuario ', usuario);
}

    return(
        <Container component="main" maxWidth="md" justify="center">
            <div style={style.paper}>
                <Typography component="h1" variant="h5" >
                    Registro de Usuario
                </Typography>
                <form style={style.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} lg={12}>
                            <TextField name="NombreCompleto" value={usuario.NombreCompleto} onChange={ingresarValoresMemoria} variant="outlined" fullWidth label="Ingrese su nombre completo" />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <TextField name="Email" value={usuario.Email} onChange={ingresarValoresMemoria} variant="outlined" fullWidth label="Ingrese su email" />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <TextField name="Username" value={usuario.Username} onChange={ingresarValoresMemoria} variant="outlined" fullWidth label="Ingrese su username" />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <TextField name="Password" value={usuario.Password} onChange={ingresarValoresMemoria} type="password" variant="outlined" fullWidth label="Ingrese su password" />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <TextField name="ConfirmPassword" value={usuario.ConfirmPassword} onChange={ingresarValoresMemoria} type="password" variant="outlined" fullWidth label="Confirme password" />
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="center">
                        <Grid item xs={12} md={6} lg={6}>
                            <Button type="submit" onClick={registrarUsuario} fullWidth variant="contained" color="primary" size="large" style={style.submit}>Enviar</Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
export default RegistrarUsuario;