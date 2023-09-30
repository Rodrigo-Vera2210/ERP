import {
    GET_LIST_COMPRAS_SUCCESS,
    GET_LIST_COMPRAS_FAIL,
    GET_COMPRA_SUCCESS,
    GET_COMPRA_FAIL,
} from '../actions/compras/types'

const initialState = {
    lista_compras: null,
    compra: null,
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
                count: payload.count,
                next: payload.next,
                previous: payload.previous,
            }
        case GET_LIST_COMPRAS_FAIL:
            return {
                ...state,
                count: null,
                next: null,
                previous: null,
            }
        case GET_COMPRA_SUCCESS:
            return {
                ...state,
                compra: payload.compra,
            }
        case GET_COMPRA_FAIL:
            return {
                ...state,
            }
    
        default:
            return state
    }
}