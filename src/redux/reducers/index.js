import { combineReducers } from 'redux';
import auth from './auth';
import empleado from './empleado';
import proveedores from './proveedores';
import productos from './productos';
import compras from './compras';

export default combineReducers({
    auth,
    empleado,
    proveedores,
    productos,
    compras,
})