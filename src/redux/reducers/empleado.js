import {
    GET_EMPLEADO_SUCCESS,
    GET_EMPLEADO_FAIL,
} from '../actions/empleado/types'

const initialState = {
    nombres: null,
    apellidos: null,
    cedula: null,
    email: null,
    rol: null,
}

export default function empleado(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_EMPLEADO_SUCCESS:
            return {
                ...state,
                nombres: payload.nombres,
                apellidos: payload.apellidos,
                cedula: payload.cedula,
                email: payload.email,
                rol: payload.rol,
            }
        case GET_EMPLEADO_FAIL:
            return {
                ...state,
            }
    
        default:
            return state
    }
}