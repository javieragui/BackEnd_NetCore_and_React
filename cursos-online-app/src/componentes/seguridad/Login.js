import { Avatar, Button, Container, TextField, Typography } from '@mui/material';
import React from 'react';
import style from '../Tool/Style'
import LockIcon from '@mui/icons-material/Lock';

const Login = () => {
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
                    <TextField variant="outlined" label="Ingrese username" name="username" fullWidth margin="normal"/>
                    <TextField variant="outlined" type="password" label="password" name="password" fullWidth margin="normal"/>
                    <Button type="submit" fullWidth variant="contained" color="primary" style={style.submit} >
                        Enviar
                    </Button>
                </form>
            </div>
        </Container>
    );
};

export default Login;