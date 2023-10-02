import {
    GET_LIST_SERVICIOS_SUCCESS,
    GET_LIST_SERVICIOS_FAIL,
    GET_LIST_CATEGORIAS_SUCCESS,
    GET_LIST_CATEGORIAS_FAIL,
    GET_SERVICIO_SUCCESS,
    GET_SERVICIO_FAIL,
} from './types'
import axios from 'axios'

export const get_lista_servicios = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/servicios/`, config)
        if(res.status === 200){
            dispatch({
                type: GET_LIST_SERVICIOS_SUCCESS,
                payload: res.data
            })
        }else{
            dispatch({
                type: GET_LIST_SERVICIOS_FAIL,
                payload: ''
            })
        }
    } catch (error) {
        dispatch({
            type: GET_LIST_SERVICIOS_FAIL,
            payload: ''
        })
        
    }
}

export const get_lista_servicios_page = (page) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try{

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/proveedores?p=${page}`, config)

        if(res.status === 200){
            dispatch({
                type: GET_LIST_SERVICIOS_SUCCESS,
                payload: res.data
            });
        }else{
            dispatch({
                type: GET_LIST_SERVICIOS_FAIL
            });
        }

    }catch(err){
        dispatch({
            type: GET_LIST_SERVICIOS_FAIL
        });
    }
}

export const get_servicio = (id) => async dispatch =>{
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    }

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/servicios/vista/${id}`, config)
        if(res.status === 200){
            dispatch({
                type: GET_SERVICIO_SUCCESS,
                payload: res.data
            })
        }else{
            dispatch({
                type: GET_SERVICIO_FAIL,
                payload: ''
            })
        }
    } catch (error) {
        dispatch({
            type: GET_SERVICIO_FAIL,
            payload: ''
        })
        
    }
}

export const get_lista_categorias = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/servicios/categorias/`, config)
        if(res.status === 200){
            dispatch({
                type: GET_LIST_CATEGORIAS_SUCCESS,
                payload: res.data
            })
        }else{
            dispatch({
                type: GET_LIST_CATEGORIAS_FAIL,
                payload: ''
            })
        }
    } catch (error) {
        dispatch({
            type: GET_LIST_CATEGORIAS_FAIL,
            payload: ''
        })
        
    }
}