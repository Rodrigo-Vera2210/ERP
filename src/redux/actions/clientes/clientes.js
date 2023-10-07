import {
    GET_LIST_CLIENTES_SUCCESS,
    GET_LIST_CLIENTES_FAIL,
    GET_CLIENTE_SUCCESS,
    GET_CLIENTE_FAIL,
} from './types'
import axios from 'axios'

export const get_lista_clientes = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/clientes/`, config)
        if(res.status === 200){
            dispatch({
                type: GET_LIST_CLIENTES_SUCCESS,
                payload: res.data
            })
        }else{
            dispatch({
                type: GET_LIST_CLIENTES_FAIL,
                payload: ''
            })
        }
    } catch (error) {
        dispatch({
            type: GET_LIST_CLIENTES_FAIL,
            payload: ''
        })
        
    }
}

export const get_lista_clientes_page = (page) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try{

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/clientes/?p=${page}`, config)

        if(res.status === 200){
            dispatch({
                type: GET_LIST_CLIENTES_SUCCESS,
                payload: res.data
            });
        }else{
            dispatch({
                type: GET_LIST_CLIENTES_FAIL
            });
        }

    }catch(err){
        dispatch({
            type: GET_LIST_CLIENTES_FAIL
        });
    }
}

export const get_cliente = (id) => async dispatch =>{
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    }

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/clientes/vista/${id}`, config)
        if(res.status === 200){
            dispatch({
                type: GET_CLIENTE_SUCCESS,
                payload: res.data
            })
        }else{
            dispatch({
                type: GET_CLIENTE_FAIL,
                payload: ''
            })
        }
    } catch (error) {
        dispatch({
            type: GET_CLIENTE_FAIL,
            payload: ''
        })
        
    }
}