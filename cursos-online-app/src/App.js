import React from "react";
import { ThemeProvider } from '@mui/material/styles';
import theme from "./theme/theme";
import RegistrarUsuario from "./componentes/seguridad/RegistrarUsuario";
import Login from "./componentes/seguridad/Login";
import PerfilUsuario from "./componentes/seguridad/PerfilUsuario";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Grid } from "@mui/material";
import AppNavBar from "./componentes/navegacion/AppNavBar";

function App() {
    return (
        <Router>
            <ThemeProvider theme={theme}>
                <AppNavBar />
                <Grid>
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route exact path="/auth/login" component={Login} />
                        <Route exact path="/auth/registrar" component={RegistrarUsuario} />
                        <Route exact path="/auth/perfil" component={PerfilUsuario} />
                    </Switch>
                </Grid>
            </ThemeProvider>
        </Router>
    )
}
export default App;
