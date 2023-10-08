import {
    GET_LIST_COMPRAS_SUCCESS,
    GET_LIST_COMPRAS_FAIL,
    GET_COMPRA_SUCCESS,
    GET_COMPRA_FAIL,
    SEARCH_COMPRA_SUCCESS,
    SEARCH_COMPRA_FAIL,
} from './types'
import axios from 'axios'

export const get_lista_compras = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/compras/`, config)
        if(res.status === 200){
            dispatch({
                type: GET_LIST_COMPRAS_SUCCESS,
                payload: res.data
            })
        }else{
            dispatch({
                type: GET_LIST_COMPRAS_FAIL,
                payload: ''
            })
        }
    } catch (error) {
        dispatch({
            type: GET_LIST_COMPRAS_FAIL,
            payload: ''
        })
        
    }
}

export const get_lista_compras_page = (page) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try{

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/compras/?p=${page}`, config)

        if(res.status === 200){
            dispatch({
                type: GET_LIST_COMPRAS_SUCCESS,
                payload: res.data
            });
        }else{
            dispatch({
                type: GET_LIST_COMPRAS_FAIL
            });
        }

    }catch(err){
        dispatch({
            type: GET_LIST_COMPRAS_FAIL
        });
    }
}

export const search_compras = (term) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/compras/buscar/?s=${term}`, config)
        if(res.status === 200){
            dispatch({
                type: SEARCH_COMPRA_SUCCESS,
                payload: res.data
            })
        }else{
            dispatch({
                type: SEARCH_COMPRA_FAIL,
                payload: ''
            })
        }
    } catch (error) {
        dispatch({
            type: SEARCH_COMPRA_FAIL,
            payload: ''
        })
        
    }
}

export const search_compras_page = (term,page) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try{

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/compras/buscar/?p=${page}&?s=${term}`, config)

        if(res.status === 200){
            dispatch({
                type: SEARCH_COMPRA_SUCCESS,
                payload: res.data
            });
        }else{
            dispatch({
                type: SEARCH_COMPRA_FAIL
            });
        }

    }catch(err){
        dispatch({
            type: SEARCH_COMPRA_FAIL
        });
    }
}

export const get_compra = (id) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/compras/view/${id}`, config)
        if (res.status === 200) {
            dispatch({
                type: GET_COMPRA_SUCCESS,
                payload: res.data
            })
        } else {
            dispatch({
                type: GET_COMPRA_FAIL,
            })
        }
    } catch (error) {
        dispatch({
            type: GET_COMPRA_FAIL,
        })
        
    }
}