import {
    GET_LIST_COMPRAS_SUCCESS,
    GET_LIST_COMPRAS_FAIL,
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

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/compras?p=${page}`, config)

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