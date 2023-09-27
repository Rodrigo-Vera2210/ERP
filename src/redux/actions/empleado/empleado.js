import {
    GET_EMPLEADO_SUCCESS,
    GET_EMPLEADO_FAIL,
} from './types'
import axios from 'axios'

export const load_empleado = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/view/`, config)
        if(res.status === 200){
            dispatch({
                type: GET_EMPLEADO_SUCCESS,
                payload: res.data.empleado
            })
        }else{
            dispatch({
                type: GET_EMPLEADO_FAIL,
                payload: ''
            })
        }
    } catch (error) {
        dispatch({
            type: GET_EMPLEADO_FAIL,
            payload: ''
        })
        
    }
}