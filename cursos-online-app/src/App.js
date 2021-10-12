import React from "react";
import { ThemeProvider } from '@mui/material/styles';
import theme from "./theme/theme";
import RegistrarUsuario from "./componentes/seguridad/RegistrarUsuario";
import Login from "./componentes/seguridad/Login";
import PerfilUsuario from "./componentes/seguridad/PerfilUsuario";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Login />
        </ThemeProvider>
    )
}
export default App;
