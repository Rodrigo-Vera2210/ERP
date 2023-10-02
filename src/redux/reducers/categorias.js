import {
    GET_LIST_CATEGORIAS_SUCCESS,
    GET_LIST_CATEGORIAS_FAIL,
} from '../actions/servicios/types'

const initialState = {
    lista_categorias: null,
}

export default function categorias(state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case GET_LIST_CATEGORIAS_SUCCESS:
            console.log(payload);
            return {
                ...state,
                lista_categorias: payload.categories,
            }
        case GET_LIST_CATEGORIAS_FAIL:
            return {
                ...state,
            }
    
        default:
            return state
    }
}