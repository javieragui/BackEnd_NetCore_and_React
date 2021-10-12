import React, { useState, useEffect } from 'react';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import style from '../Tool/Style'
import { actualizarUsuario, obtenerUsuarioActual } from '../../actions/UsuarioAction';

const PerfilUsuario = () => {
    const [usuario, setUsuario] = useState({
        nombreCompleto : '',
        email : '',
        password : '',
        confirmPassword : '',
        username : ''
    })
    const ingresarValoresMemoria = e => {
        const {name, value} = e.target;
        setUsuario(anterior => ({
            ...anterior,
            [name] : value
        }))
    }
    useEffect(() => {
        obtenerUsuarioActual().then(response => {
            console.log('Esta es la data el objeto response del user actual', response);
            setUsuario(response.data);
        })
    }, [])
    const guardarUsuario = e => {
        e.preventDefault();
        actualizarUsuario(usuario).then(response => {
            console.log('Se actualizo el usuario', usuario)
            window.localStorage.setItem("token_seguridad", response.data.token);
        })
    }

    return (
        <Container component="main" maxWidth="md" justify="center">
            <div style={style.paper}>
                <Typography component="h1" variant="h5">
                    Perfil de Usuario
                </Typography>
            </div>
            <form style={style.form}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <TextField name="nombreCompleto" value={usuario.nombreCompleto} onChange={ingresarValoresMemoria} variant="outlined" fullWidth label="Ingrese nombre y apellidos" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField value={usuario.username} onChange={ingresarValoresMemoria} name="username" variant="outlined" fullWidth label="Username" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField name="email" value={usuario.email} onChange={ingresarValoresMemoria} variant="outlined" fullWidth label="Ingrese email" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField type="password" value={usuario.password} onChange={ingresarValoresMemoria} name="password" variant="outlined" fullWidth label="Ingrese password" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField type="password" value={usuario.confirmPassword} onChange={ingresarValoresMemoria} name="confirmPassword" variant="outlined" fullWidth label="Confirme password" />
                    </Grid>
                </Grid>
                <Grid container justifyContent="center">
                    <Grid item xs={12} md={6}>
                        <Button type="submit" onClick={guardarUsuario} fullWidth variant="contained" size="large" color="primary" style={style.submit}>
                            GUARDAR DATOS
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};
export default PerfilUsuario;