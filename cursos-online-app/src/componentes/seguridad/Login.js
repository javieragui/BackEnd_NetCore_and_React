import { Avatar, Button, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import style from '../Tool/Style'
import LockIcon from '@mui/icons-material/Lock';
import { loginUsuario } from '../../actions/UsuarioAction';

const Login = () => {
    const [usuario, setUsuario] = useState({
        Email : '',
        Password : ''
    });
    const ingresarValoresMemoria = e => {
        const {name, value} = e.target;
        setUsuario(anterior => ({
            ...anterior,
            [name] : value
        }))
    }
    const loginUsuarioBoton = e => {
        e.preventDefault()
        loginUsuario(usuario).then(response => {
            console.log('Login exitoso', response);
            window.localStorage.setItem('token_seguridad', response.data.token);
        })
    }
    return (
        <Container maxWidth="xs" >
            <div style={style.paper}>
                <Avatar style={style.avatar}>
                    <LockIcon style={style.icon} />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login de usuario
                </Typography>
                <form style={style.form}>
                    <TextField name="Email" value={usuario.Email} onChange={ingresarValoresMemoria} variant="outlined" label="Ingrese username" fullWidth margin="normal"/>
                    <TextField name="Password" value={usuario.Password} onChange={ingresarValoresMemoria} variant="outlined" type="password" label="password" fullWidth margin="normal"/>
                    <Button type="submit" onClick={loginUsuarioBoton} fullWidth variant="contained" color="primary" style={style.submit} >
                        Enviar
                    </Button>
                </form>
            </div>
        </Container>
    );
};

export default Login;