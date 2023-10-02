import {
    GET_LIST_VENTAS_SUCCESS,
    GET_LIST_VENTAS_FAIL,
    GET_VENTA_SUCCESS,
    GET_VENTA_FAIL,
} from './types'
import axios from 'axios'

export const get_lista_ventas = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/ventas/`, config)
        if(res.status === 200){
            dispatch({
                type: GET_LIST_VENTAS_SUCCESS,
                payload: res.data
            })
        }else{
            dispatch({
                type: GET_LIST_VENTAS_FAIL,
                payload: ''
            })
        }
    } catch (error) {
        dispatch({
            type: GET_LIST_VENTAS_FAIL,
            payload: ''
        })
        
    }
}

export const get_lista_ventas_page = (page) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try{

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/ventas?p=${page}`, config)

        if(res.status === 200){
            dispatch({
                type: GET_LIST_VENTAS_SUCCESS,
                payload: res.data
            });
        }else{
            dispatch({
                type: GET_LIST_VENTAS_FAIL
            });
        }

    }catch(err){
        dispatch({
            type: GET_LIST_VENTAS_FAIL
        });
    }
}

export const get_venta = (id) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/ventas/view/${id}`, config)
        if (res.status === 200) {
            dispatch({
                type: GET_VENTA_SUCCESS,
                payload: res.data
            })
        } else {
            dispatch({
                type: GET_VENTA_FAIL,
            })
        }
    } catch (error) {
        dispatch({
            type: GET_VENTA_FAIL,
        })
        
    }
}