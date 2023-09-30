import {
    GET_LIST_PROVEEDORES_SUCCESS,
    GET_LIST_PROVEEDORES_FAIL,
    GET_PROVEEDOR_SUCCESS,
    GET_PROVEEDOR_FAIL,
} from './types'
import axios from 'axios'

export const get_lista_proveedores = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/proveedores/`, config)
        if(res.status === 200){
            dispatch({
                type: GET_LIST_PROVEEDORES_SUCCESS,
                payload: res.data
            })
        }else{
            dispatch({
                type: GET_LIST_PROVEEDORES_FAIL,
                payload: ''
            })
        }
    } catch (error) {
        dispatch({
            type: GET_LIST_PROVEEDORES_FAIL,
            payload: ''
        })
        
    }
}

export const get_lista_proveedores_page = (page) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try{

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/proveedores?p=${page}`, config)

        if(res.status === 200){
            dispatch({
                type: GET_LIST_PROVEEDORES_SUCCESS,
                payload: res.data
            });
        }else{
            dispatch({
                type: GET_LIST_PROVEEDORES_FAIL
            });
        }

    }catch(err){
        dispatch({
            type: GET_LIST_PROVEEDORES_FAIL
        });
    }
}

export const get_proveedor = (id) => async dispatch =>{
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    }

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/proveedores/view/${id}`, config)
        if(res.status === 200){
            dispatch({
                type: GET_PROVEEDOR_SUCCESS,
                payload: res.data
            })
        }else{
            dispatch({
                type: GET_PROVEEDOR_FAIL,
                payload: ''
            })
        }
    } catch (error) {
        dispatch({
            type: GET_PROVEEDOR_FAIL,
            payload: ''
        })
        
    }
}