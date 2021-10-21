import React, { useState, useEffect } from "react";
import { Button, Container, Grid, TextField, Typography, Avatar } from "@mui/material";
import style from "../Tool/Style";
import { actualizarUsuario, obtenerUsuarioActual } from "../../actions/UsuarioAction";
import { useStateValue } from "../../contexto/store";
import reactFoto from "../../logo.svg";
import { v4 as uuidv4 } from "uuid";
import ImageUploader from "react-images-upload";
import { obtenerDataImagen } from "../../actions/ImagenAction";

const PerfilUsuario = () => {
    const [{ sesionUsuario }, dispatch] = useStateValue();
    const [usuario, setUsuario] = useState({
        nombreCompleto: "",
        email: "",
        password: "",
        confirmarPassword: "",
        username: "",
        imagenPerfil: null,
        fotoUrl: "",
    });

    const ingresarValoresMemoria = (e) => {
        const { name, value } = e.target;
        setUsuario((anterior) => ({
            ...anterior,
            [name]: value,
        }));
    };

    useEffect(() => {
        setUsuario(sesionUsuario.usuario);
        setUsuario(anterior => ({
            ...anterior,
            fotoUrl : sesionUsuario.usuario.imagenPerfil,
            imagenPerfil : null
        }));
    }, []);

    const guardarUsuario = (e) => {
        e.preventDefault();
        actualizarUsuario(usuario, dispatch).then((response) => {
            if (response.status === 200) {
                dispatch({
                    type: "OPEN_SNACKBAR",
                    openMensaje: {
                        open: true,
                        mensaje: "Se guardaron con exito los cambios de Perfil Usuario",
                    },
                });
                window.localStorage.setItem("token_seguridad", response.data.token);
            } else {
                dispatch({
                    type: "OPEN_SNACKBAR",
                    openMensaje: {
                        open: true,
                        mensaje:
                            "Errores al intentar guardar en : " +
                            Object.keys(response.data.errors),
                    },
                });
            }
        });
    };

    const subirFoto = (imagenes) => 
    {
        console.log('Respuesta ', foto);
        const foto = imagenes[0];
        const fotoUrl = URL.createObjectURL(foto);
        obtenerDataImagen(foto).then((respuesta) => {
            console.log('Respuesta ', respuesta);
            setUsuario(anterior => 
            ({
                ...anterior,
                imagenPerfil: respuesta, //respuesta es un json que proviene del action obtener imagen
                fotoUrl: fotoUrl, //el archivo en formato URL
            }));
        });
    };
    const fotoKey = uuidv4();
    return (
        <Container component="main" maxWidth="md" justify="center">
            <div style={style.paper}>
                <Avatar
                    style={style.avatar}
                    src={usuario.fotoUrl || reactFoto}
                />
                <Typography component="h1" variant="h5">
                    Perfil de Usuario
                </Typography>

                <form style={style.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <TextField
                                name="nombreCompleto"
                                value={usuario.nombreCompleto}
                                onChange={ingresarValoresMemoria}
                                variant="outlined"
                                fullWidth
                                label="Ingrese nombre y apellidos"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                value={usuario.username}
                                onChange={ingresarValoresMemoria}
                                name="username"
                                variant="outlined"
                                fullWidth
                                label="Username"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="email"
                                value={usuario.email}
                                onChange={ingresarValoresMemoria}
                                variant="outlined"
                                fullWidth
                                label="Ingrese email"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                type="password"
                                value={usuario.password}
                                onChange={ingresarValoresMemoria}
                                name="password"
                                variant="outlined"
                                fullWidth
                                label="Ingrese password"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                type="password"
                                value={usuario.confirmPassword}
                                onChange={ingresarValoresMemoria}
                                name="confirmPassword"
                                variant="outlined"
                                fullWidth
                                label="Confirme password"
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <ImageUploader
                                withIcon={false}
                                key={fotoKey}
                                singleImage={true}
                                buttonText="Seleccione una imagen de Perfil"
                                onChange={subirFoto}
                                imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
                                maxFileSize={5242880}
                            />
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="center">
                        <Grid item xs={12} md={6}>
                            <Button
                                type="submit"
                                onClick={guardarUsuario}
                                fullWidth
                                variant="contained"
                                size="large"
                                color="primary"
                                style={style.submit}
                            >
                                GUARDAR DATOS
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};
export default PerfilUsuario;
