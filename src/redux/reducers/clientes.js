import {
    GET_LIST_CLIENTES_SUCCESS,
    GET_LIST_CLIENTES_FAIL,
    GET_CLIENTE_SUCCESS,
    GET_CLIENTE_FAIL,
} from '../actions/clientes/types'

const initialState = {
    lista_clientes: null,
    cliente: null,
    count:null,
    next:null,
    previous:null
}

export default function clientes(state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case GET_LIST_CLIENTES_SUCCESS:
            
            return {
                ...state,
                lista_clientes: payload.results.clientes,
                count: payload.count,
                next: payload.next,
                previous: payload.previous,
            }
        case GET_LIST_CLIENTES_FAIL:
            return {
                ...state,
                count: null,
                next: null,
                previous: null,
            }
        case GET_CLIENTE_SUCCESS:
            console.log(payload);
            return {
                ...state,
                cliente: payload.cliente,
            }
        case GET_CLIENTE_FAIL:
            return {
                ...state,
            }
    
        default:
            return state
    }
}