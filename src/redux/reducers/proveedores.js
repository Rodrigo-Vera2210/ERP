import {
    GET_LIST_PROVEEDORES_SUCCESS,
    GET_LIST_PROVEEDORES_FAIL,
    GET_PROVEEDOR_SUCCESS,
    GET_PROVEEDOR_FAIL,
} from '../actions/proveedores/types'

const initialState = {
    lista_proveedores: null,
    proveedor: null,
    count:null,
    next:null,
    previous:null
}

export default function proveedores(state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case GET_LIST_PROVEEDORES_SUCCESS:
            return {
                ...state,
                lista_proveedores: payload.results.proveedores,
                count: payload.count,
                next: payload.next,
                previous: payload.previous,
            }
        case GET_LIST_PROVEEDORES_FAIL:
            return {
                ...state,
                count: null,
                next: null,
                previous: null,
            }
        case GET_PROVEEDOR_SUCCESS:
            return {
                ...state,
                proveedor: payload.proveedor,
            }
        case GET_PROVEEDOR_FAIL:
            return {
                ...state,
            }
    
        default:
            return state
    }
}