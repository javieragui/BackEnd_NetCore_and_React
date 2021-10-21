import { AppBar } from '@mui/material';
import React from 'react';
import BarSesion from './bar/BarSesion';
import { useStateValue } from '../../contexto/store';

const AppNavBar = () => {
    const [{sesionUsuario} , dispatch] = useStateValue();
    return sesionUsuario 
        ? (sesionUsuario.autenticado == true ? <AppBar position="static"><BarSesion /></AppBar> : null )
        : null;
    // return (
    //     <AppBar position="static">
    //         <BarSesion />
    //     </AppBar>
    // );
};

export default AppNavBar;