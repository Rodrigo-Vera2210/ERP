import {
    GET_LIST_PRODUCTOS_SUCCESS,
    GET_LIST_PRODUCTOS_FAIL,
    GET_LIST_PRODUCTOS_PROVEEDOR_SUCCESS,
    GET_LIST_PRODUCTOS_PROVEEDOR_FAIL,
} from './types'
import axios from 'axios'

export const get_lista_productos = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/productos/`, config)
        if(res.status === 200){
            dispatch({
                type: GET_LIST_PRODUCTOS_SUCCESS,
                payload: res.data
            })
        }else{
            dispatch({
                type: GET_LIST_PRODUCTOS_FAIL,
                payload: ''
            })
        }
    } catch (error) {
        dispatch({
            type: GET_LIST_PRODUCTOS_FAIL,
            payload: ''
        })
        
    }
}

export const get_lista_productos_page = (page) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try{

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/productos?p=${page}`, config)

        if(res.status === 200){
            dispatch({
                type: GET_LIST_PRODUCTOS_SUCCESS,
                payload: res.data
            });
        }else{
            dispatch({
                type: GET_LIST_PRODUCTOS_FAIL
            });
        }

    }catch(err){
        dispatch({
            type: GET_LIST_PRODUCTOS_FAIL
        });
    }
}

export const get_lista_productos_proveedor = (proveedor) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/productos/buscar/${proveedor}`, config)
        console.log(res);
        console.log(res.data);
        if(res.status === 200){
            dispatch({
                type: GET_LIST_PRODUCTOS_PROVEEDOR_SUCCESS,
                payload: res.data
            })
        }else{
            dispatch({
                type: GET_LIST_PRODUCTOS_PROVEEDOR_FAIL,
                payload: ''
            })
        }
    } catch (error) {
        dispatch({
            type: GET_LIST_PRODUCTOS_PROVEEDOR_FAIL,
            payload: ''
        })
        
    }
}