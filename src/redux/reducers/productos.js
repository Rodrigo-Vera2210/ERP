import {
    GET_LIST_PRODUCTOS_SUCCESS,
    GET_LIST_PRODUCTOS_FAIL,
    GET_LIST_PRODUCTOS_PROVEEDOR_SUCCESS,
    GET_LIST_PRODUCTOS_PROVEEDOR_FAIL,
    GET_PRODUCTO_SUCCESS,
    GET_PRODUCTO_FAIL,
} from '../actions/productos/types'

const initialState = {
    lista_productos: null,
    lista_productos_proveedor: null,
    producto: null,
    proveedores: null,
    count:null,
    next:null,
    previous:null
}

export default function productos(state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case GET_LIST_PRODUCTOS_SUCCESS:
            return {
                ...state,
                lista_productos: payload.results.productos,
                count: payload.count,
                next: payload.next,
                previous: payload.previous,
            }
        case GET_LIST_PRODUCTOS_FAIL:
            return {
                ...state,
                count: null,
                next: null,
                previous: null,
            }
        case GET_LIST_PRODUCTOS_PROVEEDOR_SUCCESS:
            return {
                ...state,
                lista_productos_proveedor: payload.results.productos,
            }
        case GET_LIST_PRODUCTOS_PROVEEDOR_FAIL:
            return {
                ...state,
                count: null,
                next: null,
                previous: null,
            }
        case GET_PRODUCTO_SUCCESS:
            return {
                ...state,
                producto: payload.producto,
                count: payload.count,
                next: payload.next,
                previous: payload.previous,
                proveedores: payload.proveedores,
                detalles: payload.detproveedores,
            }
        case GET_PRODUCTO_FAIL:
            return {
                ...state,
                count: null,
                next: null,
                previous: null,
            }
        default:
            return state
    }
}