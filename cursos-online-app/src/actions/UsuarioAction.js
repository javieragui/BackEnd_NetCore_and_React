import HttpCliente from "../servicios/HttpCliente";
import axios from "axios";

const instancia = axios.create();
instancia.CancelToken = axios.CancelToken;
instancia.isCancel = axios.isCancel;

export const registrarUsuario = (usuario) => {
    return new Promise((resolve, eject) => {
        instancia.post("/usuario/registrar", usuario).then((response) => {
            resolve(response);
        });
    });
};
export const obtenerUsuarioActual = (dispatch) => {
    return new Promise((resolve, eject) => {
        HttpCliente.get("/usuario").then((response) => {
            console.log("response", response);
            dispatch({
                type: "INICIAR_SESION",
                sesion: response.data,
                autenticado: true,
            });
            resolve(response);
        }).catch((error) => {
            console.log("error actualizar", error);

            resolve(error);
        });
    });
};

export const actualizarUsuario = (usuario, dispatch) => {
    return new Promise((resolve, eject) => {
        HttpCliente.put("/usuario", usuario)
            .then((response) => {
                console.log("objeto Action Actualizar " + response);
                dispatch({
                    type : 'INICIAR_SESION',
                    sesion : response.data,
                    autenticado : true,
                  });
                resolve(response);
            }).catch((error) => {
                resolve(error.response);
            });
    });
};

export const loginUsuario = (usuario, dispatch) => {
    return new Promise((resolve, eject) => {
        instancia.post("/usuario/login", usuario).then(response => {
            
            dispatch({
                type: "INICIAR_SESION",
                sesion: response.data,
                autenticado: true,
            });
            resolve(response);
            
        })
        .catch((error) => {
            resolve(error.response);
        });
        resolve(usuario);
    });
};
