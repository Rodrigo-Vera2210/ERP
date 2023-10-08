import {
    GET_LIST_COMPRAS_SUCCESS,
    GET_LIST_COMPRAS_FAIL,
    GET_COMPRA_SUCCESS,
    GET_COMPRA_FAIL,
    SEARCH_COMPRA_SUCCESS,
    SEARCH_COMPRA_FAIL,
} from '../actions/compras/types'

const initialState = {
    lista_compras: null,
    compras_filtradas:null,
    compra: null,
    detalles: null,
    count:null,
    next:null,
    previous:null
}

export default function compras(state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case GET_LIST_COMPRAS_SUCCESS:
            return {
                ...state,
                lista_compras: payload.results.compras,
                compra: null,
                detalles: null,
                count: payload.count,
                next: payload.next,
                previous: payload.previous,
            }
        case GET_LIST_COMPRAS_FAIL:
            return {
                ...state,
                lista_compras: null,
                detalles: null,
                compra: null,
                count: null,
                next: null,
                previous: null,
            }
        case SEARCH_COMPRA_SUCCESS:
            return {
                ...state,
                compras_filtradas: payload.results.compras_filtradas,
                compra: null,
                detalles: null,
                count: payload.count,
                next: payload.next,
                previous: payload.previous,
            }
        case SEARCH_COMPRA_FAIL:
            return {
                ...state,
                compras_filtradas: null,
                detalles: null,
                compra: null,
                count: null,
                next: null,
                previous: null,
            }
        case GET_COMPRA_SUCCESS:
            return {
                ...state,
                compra: payload.compra,
                detalles: payload.detalles,
                lista_compras: null,
                compras: null,
                count: null,
                next: null,
                previous: null,
            }
        case GET_COMPRA_FAIL:
            return {
                ...state,
                lista_compras: null,
                detalles: null,
                compras: null,
                count: null,
                next: null,
                previous: null,
            }
    
        default:
            return state
    }
}