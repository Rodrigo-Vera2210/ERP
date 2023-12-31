import {
    GET_LIST_SERVICIOS_SUCCESS,
    GET_LIST_SERVICIOS_FAIL,
    GET_SERVICIO_SUCCESS,
    GET_SERVICIO_FAIL,
    SEARCH_SERVICIO_SUCCESS,
    SEARCH_SERVICIO_FAIL,
} from '../actions/servicios/types'

const initialState = {
    lista_servicios: null,
    servicios_filtrados: null,
    servicio: null,
    count:null,
    next:null,
    previous:null
}

export default function servicios(state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case GET_LIST_SERVICIOS_SUCCESS:
            return {
                ...state,
                lista_servicios: payload.results.servicios,
                count: payload.count,
                next: payload.next,
                previous: payload.previous,
            }
        case GET_LIST_SERVICIOS_FAIL:
            return {
                ...state,
                count: null,
                next: null,
                previous: null,
            }
        case SEARCH_SERVICIO_SUCCESS:
            console.log(payload.results);
            return {
                ...state,
                lista_servicios: payload.results.servicios,
                servicios_filtrados: payload.results.servicios_filtrados,
                count: payload.count,
                next: payload.next,
                previous: payload.previous,
            }
        case SEARCH_SERVICIO_FAIL:
            return {
                ...state,
                count: null,
                next: null,
                previous: null,
            }
        case GET_SERVICIO_SUCCESS:
            return {
                ...state,
                servicio: payload.servicio,
            }
        case GET_SERVICIO_FAIL:
            return {
                ...state,
            }
    
        default:
            return state
    }
}