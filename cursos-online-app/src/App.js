import React, { useState, useEffect } from "react";
import { ThemeProvider } from '@mui/material/styles';
import theme from "./theme/theme";
import RegistrarUsuario from "./componentes/seguridad/RegistrarUsuario";
import Login from "./componentes/seguridad/Login";
import PerfilUsuario from "./componentes/seguridad/PerfilUsuario";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Grid, Snackbar } from "@mui/material";
import AppNavBar from "./componentes/navegacion/AppNavBar";
import { useStateValue } from "./contexto/store";
import { obtenerUsuarioActual } from "./actions/UsuarioAction";
import RutaSegura from "./componentes/navegacion/RutaSegura";

function App() {
    const [{openSnackBar}, dispatch] = useStateValue();
    const [iniciaApp, setIniciaApp] = useState(false);
    useEffect(() => {
        if(!iniciaApp){
            obtenerUsuarioActual(dispatch).then(response => {
                setIniciaApp(true);
            }).catch(error => {
                console.log(error);
                setIniciaApp(true);
            })
        }
    }, [iniciaApp]);
    return iniciaApp === false ? null : (
        <React.Fragment>
            <Snackbar anchorOrigin={{ vertical:"bottom", horizontal:"center" }}
                open={openSnackBar ? openSnackBar.open : false}
                autoHideDuration={3000} ContentProps={{"aria-describedby" : "message-id"}}
                message = {
                    <span id="message-id">{openSnackBar ? openSnackBar.mensaje : ""}</span>
                }
                onClose = { () => 
                    dispatch({
                        type : "OPEN_SNACKBAR",
                        openMensaje : {
                            open : false,
                            mensaje : ""
                        }
                    })
                }>
            </Snackbar>
            <Router>
                <ThemeProvider theme={theme}>
                    <AppNavBar />
                    <Grid>
                        <Switch>
                            <Route exact path="/auth/login" component={Login} />
                            <Route exact path="/auth/registrar" component={RegistrarUsuario} />
                            <RutaSegura exact path="/auth/perfil" component = {PerfilUsuario} />
                            <RutaSegura exact path="/" component = {PerfilUsuario} />
                        </Switch>
                    </Grid>
                </ThemeProvider>
            </Router>
        </React.Fragment>      
    )
}
export default App;
