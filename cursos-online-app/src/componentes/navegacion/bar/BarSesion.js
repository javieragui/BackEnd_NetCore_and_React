import React, { useState } from 'react';
import { Avatar, IconButton,  Toolbar, Typography, Button, Drawer, List, ListItem, ListItemText } from '@mui/material';
import FotoUsuarioTemp from "../../../logo.svg";
import { makeStyles } from '@mui/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useStateValue } from '../../../contexto/store';
import { MenuIzquierda } from './MenuIzquierda';
import { MenuDerecha } from './MenuDerecha';
import { withRouter } from 'react-router';

const useStyles = makeStyles((theme) => ({
    seccionDesktop : {
        display : "none",
        [theme.breakpoints.up("md")] : {
            display : "flex"
        }
    },
    seccionMovil : {
        display : "flex",
        [theme.breakpoints.up("md")] : {
            display : "none"
        }
    },
    grow : {
        flexGrow : 1
    },
    avatarSize : {
        width : 40,
        height : 40
    },
    list : {
        width : 250
    },
    listItemText : {
        fontSize : "14px",
        fontWeight : 600,
        paddingLeft : "15px",
        color : "#212121"
    }
}))

const BarSesion = (props) => {
    const classes = useStyles();
    const [{sesionUsuario}, dispatch] = useStateValue();
    const [abrirMenuIzquierda, setAbrirMenuIzquierda] = useState(false);
    const [abrirMenuDerecha, setAbrirMenuDerecha] = useState(false);
    const cerrarMenuIzquierda = () => {
        setAbrirMenuIzquierda(false);
    }
    const abrirMenuIzquierdaAction = () => {
        setAbrirMenuIzquierda(true);
    }
    const cerrarMenuDerecha = () => {
        setAbrirMenuDerecha(false);
    }
    const salirSesionApp = () => {
        localStorage.removeItem('token_seguridad');
        dispatch({
            type : "SALIR_SESION",
            nuevoUsuario : null,
            autenticado : false
         })
        props.history.push('/auth/login');
    }
    const abrirMenuDerechaAction = () => {
        setAbrirMenuDerecha(true);
    }
    return (
        <React.Fragment>
            <Drawer
                open = {abrirMenuIzquierda}
                onClose = {cerrarMenuIzquierda}
                anchor = "left">
                <div className={classes.list} onKeyDown={cerrarMenuIzquierda} onClick={cerrarMenuIzquierda}>
                    <MenuIzquierda classes={classes} />
                </div>
            </Drawer>
            <Drawer
                open = {abrirMenuDerecha}
                onClose = {cerrarMenuDerecha}
                anchor = "right">
                <div role="button" onKeyDown={cerrarMenuDerecha} onClick={cerrarMenuDerecha}>
                    <MenuDerecha classes={classes} salirSesion={salirSesionApp} 
                        usuario={ sesionUsuario ? sesionUsuario.usuario : null }/>
                </div>
            </Drawer>
            <Toolbar>
                <IconButton color="inherit" onClick={abrirMenuIzquierdaAction}>
                    <i className="material-icons">menu</i>
                </IconButton>
                <Typography variant="h6">Cursos Online</Typography>
                <div className={classes.grow}></div>
                <div className={classes.seccionDesktop}>
                    <Button onClick={salirSesionApp} color="inherit">Salir</Button>
                    <Button color="inherit">{sesionUsuario ? sesionUsuario.usuario.nombreCompleto : ''}</Button>
                    <Avatar src={sesionUsuario.usuario.imagenPerfil || FotoUsuarioTemp}></Avatar>
                </div>
                <div className={classes.seccionMovil}>
                    <IconButton color="inherit" onClick={abrirMenuDerechaAction}>
                        <i className="material-icons">more_vert</i>
                    </IconButton>
                </div>
            </Toolbar>
        </React.Fragment>
    );
};

export default withRouter(BarSesion);