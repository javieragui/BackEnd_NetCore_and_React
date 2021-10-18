export const initialState = {
    usuario: {
        nombreCompleto: "",
        email: "",
        username: "",
        foto: "",
    },
    autenticado: false,
};

const sesionUsuarioReducer = (state = initialState, action) => {
    //console.log("ACTION EN SESIONUSUARIOREDUCER ", action, ' Y el STATE' , state);
    switch (action.type) {
        case "INICIAR_SESION":
            console.log(action);
            return {
                ...state,
                usuario: action.sesion,
                autenticado: action.autenticado,
            };
        case "SALIR_SESION":
            return {
                ...state,
                usuario: action.nuevoUsuario,
                autenticado: action.autenticado,
            };
        case "ACTUALIZAR_USUARIO":
            return {
                ...state,
                usuario: action.nuevoUsuario,
                autenticado: action.autenticado,
            };
        default:
            return state;
    }
};

export default sesionUsuarioReducer;