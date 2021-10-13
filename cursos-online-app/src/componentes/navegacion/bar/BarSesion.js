import React from 'react';
import { Avatar, IconButton,  Toolbar, Typography, Button } from '@mui/material';
import FotoUsuarioTemp from "../../../logo.svg";
import { makeStyles } from '@mui/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';

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
    }
}))

const BarSesion = () => {
    const classes = useStyles();
    return (
        <Toolbar>
            <IconButton color="inherit">
                <i className="material-icons">menu</i>
            </IconButton>
            <Typography variant="h6">Cursos Online</Typography>
            <div className={classes.grow}></div>
            <div className={classes.seccionDesktop}>
                <Button color="inherit">Salir</Button>
                <Button color="inherit">{"Nombre de Usuario"}</Button>
                <Avatar src={FotoUsuarioTemp}></Avatar>
            </div>
            <div className={classes.seccionMovil}>
                <IconButton color="inherit">
                    <i className="material-icons">more_vert</i>
                </IconButton>

            </div>
        </Toolbar>
    );
};

export default BarSesion;