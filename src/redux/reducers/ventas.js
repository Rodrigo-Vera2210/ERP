import {
    GET_LIST_VENTAS_SUCCESS,
    GET_LIST_VENTAS_FAIL,
    GET_VENTA_SUCCESS,
    GET_VENTA_FAIL,
} from '../actions/ventas/types'

const initialState = {
    lista_ventas: null,
    venta: null,
    detalleProducto: null,
    detalleServicio: null,
    count:null,
    next:null,
    previous:null
}

export default function ventas(state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case GET_LIST_VENTAS_SUCCESS:
            return {
                ...state,
                lista_ventas: payload.results.ventas,
                count: payload.count,
                next: payload.next,
                previous: payload.previous,
                venta: null,
                detalleProducto: null,
                detalleServicio: null,
            }
        case GET_LIST_VENTAS_FAIL:
            return {
                ...state,
                lista_ventas: null,
                count: null,
                next: null,
                previous: null,
                venta: null,
                detalleProducto: null,
                detalleServicio: null,
            }
        case GET_VENTA_SUCCESS:
            return {
                ...state,
                venta: payload.venta,
                detalleProducto: payload.detalleP,
                detalleServicio: payload.detalleS,
                lista_ventas: null,
                count: null,
                next: null,
                previous: null,
            }
        case GET_VENTA_FAIL:
            return {
                ...state,
                lista_ventas: null,
                count: null,
                next: null,
                previous: null,
                venta: null,
                detalleProducto: null,
                detalleServicio: null,
            }
    
        default:
            return state
    }
}