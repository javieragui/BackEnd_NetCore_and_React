import React from 'react';
import { Avatar, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import FotoUsuarioTemp from "../../../logo.svg";

export const MenuDerecha = ({
    classes,
    usuario,
    salirSesion
}) => (
    <div className={classes.list}>
        <List>
            <ListItem button components={Link}>
                <Avatar src={ usuario.foto || FotoUsuarioTemp } />
                <ListItemText classes={{primary : classes.ListItemText}} primary={usuario ? usuario.nombreCompleto : ""} />
            </ListItem>
            <ListItem button onClick={salirSesion}>
                <ListItemText classes={{primary : classes.ListItemText}} primary="Salir" />
            </ListItem>
        </List>
    </div>
);
