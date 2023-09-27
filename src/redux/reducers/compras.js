import {
    GET_LIST_COMPRAS_SUCCESS,
    GET_LIST_COMPRAS_FAIL,
} from '../actions/compras/types'

const initialState = {
    lista_compras: null,
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
    
        default:
            return state
    }
}