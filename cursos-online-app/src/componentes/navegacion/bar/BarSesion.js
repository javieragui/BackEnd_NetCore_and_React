import React, { useState } from 'react';
import { Avatar, IconButton,  Toolbar, Typography, Button, Drawer, List, ListItem, ListItemText } from '@mui/material';
import FotoUsuarioTemp from "../../../logo.svg";
import { makeStyles } from '@mui/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useStateValue } from '../../../contexto/store';
import { MenuIzquierda } from './MenuIzquierda';

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

const BarSesion = () => {
    const classes = useStyles();
    const [{sesionUsuario}, dispatch] = useStateValue();
    const [abrirMenuIzquierda, setAbrirMenuIzquierda] = useState(false);
    const cerrarMenuIzquierda = () => {
        setAbrirMenuIzquierda(false);
    }
    const abrirMenuIzquierdaAction = () => {
        setAbrirMenuIzquierda(true);
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
            <Toolbar>
                <IconButton color="inherit" onClick={abrirMenuIzquierdaAction}>
                    <i className="material-icons">menu</i>
                </IconButton>
                <Typography variant="h6">Cursos Online</Typography>
                <div className={classes.grow}></div>
                <div className={classes.seccionDesktop}>
                    <Button color="inherit">Salir</Button>
                    <Button color="inherit">{sesionUsuario ? sesionUsuario.usuario.nombreCompleto : ''}</Button>
                    <Avatar src={FotoUsuarioTemp}></Avatar>
                </div>
                <div className={classes.seccionMovil}>
                    <IconButton color="inherit">
                        <i className="material-icons">more_vert</i>
                    </IconButton>
                </div>
            </Toolbar>
        </React.Fragment>
    );
};

export default BarSesion;